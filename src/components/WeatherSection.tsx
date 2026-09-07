import { getLocale, getMessages, getTranslations } from 'next-intl/server';

/* Live weather module for the archaeological zone.
   Data is fetched on the server and cached in memory for a short window so
   repeat visitors do not trigger a request on every page load. The module
   turns raw numbers into plain-language advice for a daytime outdoor visit. */

const LAT = 20.6954;
const LON = -103.8363;
const TTL_MS = 30 * 60 * 1000;

const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=' +
  `${LAT}&longitude=${LON}` +
  '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,uv_index' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max,wind_speed_10m_max' +
  '&timezone=America%2FMexico_City&forecast_days=8&alerts=true';

type Current = {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
  uv_index: number;
};

type Daily = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: (number | null)[];
  temperature_2m_min: (number | null)[];
  precipitation_probability_max: (number | null)[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: (number | null)[];
  wind_speed_10m_max: (number | null)[];
};

type Alert = {
  event?: string;
  headline?: string;
  instruction?: string;
  severity?: string;
  areas?: string;
};

type WeatherData = { current: Current; daily: Daily; alerts?: Alert[] };

let cache: { ts: number; data: WeatherData | null } = { ts: 0, data: null };

async function fetchWeather(): Promise<WeatherData | null> {
  const now = Date.now();
  if (cache.data && now - cache.ts < TTL_MS) return cache.data;
  try {
    const res = await fetch(API_URL, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error('weather request failed');
    const data = (await res.json()) as WeatherData;
    if (!data || !data.current || !data.daily) throw new Error('unexpected payload');
    cache = { ts: Date.now(), data };
    return data;
  } catch {
    return cache.data;
  }
}

/* WMO interpretation codes → icon + readable label key */
function groupOf(code: number): { icon: string; key: string } {
  if (code === 0) return { icon: 'clear', key: 'clear' };
  if (code <= 2) return { icon: 'partly', key: code === 1 ? 'mainlyClear' : 'partly' };
  if (code === 3) return { icon: 'overcast', key: 'overcast' };
  if (code === 45 || code === 48) return { icon: 'fog', key: 'fog' };
  if (code <= 57) return { icon: 'drizzle', key: code < 56 ? 'drizzle' : 'freezingRain' };
  if (code === 61 || code === 63 || code === 65) return { icon: 'rain', key: 'rain' };
  if (code === 66 || code === 67) return { icon: 'rain', key: 'freezingRain' };
  if (code <= 77) return { icon: 'snow', key: 'snow' };
  if (code <= 82) return { icon: 'rain', key: 'showers' };
  if (code <= 86) return { icon: 'snow', key: 'snowShowers' };
  return { icon: 'storm', key: 'thunder' };
}

const inRange = (c: number, lo: number, hi: number) => c >= lo && c <= hi;

type Kind = 'risk' | 'out' | 'play' | 'gear';
type AdvItem = { id: string; kind: Kind; text: string };
type Buckets = { risk: string[]; out: string[]; play: string[]; gear: string[] };

function activeRuleIds(data: WeatherData): string[] {
  const ids: string[] = [];
  const add = (id: string) => {
    if (!ids.includes(id)) ids.push(id);
  };

  const cur = data.current;
  const day = data.daily;
  const codeNow = cur.weather_code;
  const codeDay = day.weather_code?.[0] ?? codeNow;
  const codes = [codeNow, codeDay];

  const lightRain = codes.some((c) => inRange(c, 51, 57) || c === 61 || c === 80);
  const heavyRain = codes.some((c) =>
    [63, 65, 66, 67, 81, 82].includes(c)
  );
  const thunder = codes.some((c) => inRange(c, 95, 99));
  const fog = codes.some((c) => c === 45 || c === 48);

  const prob = typeof day.precipitation_probability_max?.[0] === 'number'
    ? (day.precipitation_probability_max[0] as number)
    : 0;
  const tNow = cur.temperature_2m;
  const tMax = day.temperature_2m_max?.[0] ?? null;
  const tMin = day.temperature_2m_min?.[0] ?? null;
  const hot = (tMax ?? tNow) >= 32 || tNow >= 32;
  const cold = tNow <= 8 || (tMax ?? 99) <= 10;
  const bigDiff = tMax != null && tMin != null && tMax - tMin > 8;

  const wind = Math.max(cur.wind_speed_10m, day.wind_speed_10m_max?.[0] ?? 0);
  const uv = Math.max(cur.uv_index ?? 0, day.uv_index_max?.[0] ?? 0);

  // main sky message for the day (clear wins over cloudy)
  if (codeDay === 0) add('clearPlay');
  else if (inRange(codeDay, 1, 3)) add('cloudyPlay');

  if (lightRain && !heavyRain) add('mildRainPlay');
  if (heavyRain) add('rHeavy');
  if (thunder) add('rThunder');
  if (fog) add('rFog');

  if (prob >= 60) add('rainProb');
  if (hot) add('heat');
  if (hot) add('heatPlay');
  if (uv >= 5) add('uv');
  if (cold) add('cold');
  if (bigDiff) add('bigDiff');

  if (wind >= 50) add('rWind');
  else if (wind >= 29) add('windMidPlay');

  // what to bring (only relevant items)
  const anyRain = lightRain || heavyRain || thunder || prob >= 60;
  if (heavyRain || thunder) add('gRaincoat');
  else if (anyRain) add('gRain');
  if (uv >= 5) add('gUV');
  if (hot) add('gWater');
  if (cold || bigDiff) add('gLayer');

  return ids;
}

function buildBuckets(data: WeatherData, items: AdvItem[]): Buckets {
  const buckets: Buckets = { risk: [], out: [], play: [], gear: [] };
  const active = new Set(activeRuleIds(data));

  if (Array.isArray(data.alerts)) {
    for (const a of data.alerts) {
      const text = a.instruction || a.headline || a.event;
      if (text) buckets.risk.push(text);
    }
  }
  for (const it of items) {
    if (active.has(it.id) && it.kind in buckets) buckets[it.kind].push(it.text);
  }
  return buckets;
}

function WeatherIcon({ icon, isDay }: { icon: string; isDay?: boolean }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { color: 'var(--accent)' },
  };
  switch (icon) {
    case 'clear':
      return (
        <svg {...common}>
          {isDay ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          ) : (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          )}
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          {isDay ? (
            <>
              <path d="M12 2v2M4.9 4.9l1.4 1.4M2 12h2M4.9 19.1l1.4-1.4" />
              <path d="M17.5 18a4.5 4.5 0 1 0-4.2-6.2A4 4 0 0 0 17.5 18z" />
            </>
          ) : (
            <path d="M17.5 19a4.5 4.5 0 1 0-1.1-8.9A5 5 0 0 0 8 11.5a3.5 3.5 0 0 0 .3 7h9.2z" />
          )}
        </svg>
      );
    case 'overcast':
    case 'fog':
      return (
        <svg {...common}>
          <path d="M17.5 19a4.5 4.5 0 1 0-1.1-8.9A5 5 0 0 0 8 11.5a3.5 3.5 0 0 0 .3 7h9.2z" />
          {icon === 'fog' && <path d="M5 20h11M5 22h7" />}
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path d="M17.5 18a4.5 4.5 0 1 0-1.1-8.9A5 5 0 0 0 8 11.5a3.5 3.5 0 0 0 .3 7h9.2z" />
          <path d="M8.5 16.5l-1 2.2M12 16.5l-1 2.2M15.5 16.5l-1 2.2" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M17.5 18a4.5 4.5 0 1 0-1.1-8.9A5 5 0 0 0 8 11.5a3.5 3.5 0 0 0 .3 7h9.2z" />
          <path d="M9 17l-1 1M13 17l-1 1M11 15.5V20M15 19l-1 1" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...common}>
          <path d="M17.5 17a4.5 4.5 0 1 0-1.1-8.9A5 5 0 0 0 8 10.5a3.5 3.5 0 0 0 .3 7h9.2z" />
          <path d="M12.5 15L10.5 18.5h2.5l-1.5 3.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M17.5 18a4.5 4.5 0 1 0-1.1-8.9A5 5 0 0 0 8 11.5a3.5 3.5 0 0 0 .3 7h9.2z" />
          <path d="M11 16l-.6 1.4M14 16l-.6 1.4" />
        </svg>
      );
  }
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const messages = (await getMessages()) as any;
  const ns: any = messages?.weather;

  const data = await fetchWeather();

  const locale = await getLocale();
  const intlLocale = locale === 'es' ? 'es-MX' : locale === 'zh' ? 'zh-CN' : 'en-US';
  const weekdayFmt = new Intl.DateTimeFormat(intlLocale, {
    weekday: 'short',
    timeZone: 'America/Mexico_City',
  });
  const dateToLabel = (day: string, i: number) =>
    i === 0 ? t('today') : weekdayFmt.format(new Date(`${day}T12:00:00Z`));

  const uvWordKey = (v: number) =>
    v >= 11 ? 'uvExtreme' : v >= 8 ? 'uvVeryHigh' : v >= 6 ? 'uvHigh' : v >= 3 ? 'uvModerate' : 'uvLow';

  const metric = (label: string, value: string, strong?: boolean) => (
    <div className="rounded-xl px-3 py-2.5" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
      <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
      <div
        className="text-sm font-semibold mt-0.5"
        style={{ color: strong ? '#b91c1c' : 'var(--text-primary)' }}
      >
        {value}
      </div>
    </div>
  );

  const block = (title: string, lines: string[], accent: string) =>
    lines.length ? (
      <div className="rounded-2xl px-5 py-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
          {title}
        </h3>
        <ul className="space-y-2">
          {lines.map((l, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
              <span className="shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <span style={{ color: 'var(--text-secondary)' }}>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <section id="weather" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {!data ? (
          <div
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('unavailableTitle')}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t('unavailableText')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-5">
              {/* current conditions */}
              <div
                className="lg:col-span-2 rounded-2xl p-6 sm:p-7 flex flex-col"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('currentTitle')}
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <WeatherIcon icon={groupOf(data.current.weather_code).icon} isDay={data.current.is_day === 1} />
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-6xl font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
                        {Math.round(data.current.temperature_2m)}
                      </span>
                      <span className="text-2xl font-medium" style={{ color: 'var(--text-secondary)' }}>°C</span>
                    </div>
                    <div className="mt-1.5 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                      {t(`cond.${groupOf(data.current.weather_code).key}` as never)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span
                    className="rounded-full px-3 py-1 font-medium"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                  >
                    {t('uvLabel')}: {t(uvWordKey(Math.max(data.current.uv_index ?? 0, data.daily.uv_index_max?.[0] ?? 0)) as never)}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 font-medium"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                  >
                    {Math.round(data.current.wind_speed_10m)} km/h
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {metric(t('feelsLike'), `${Math.round(data.current.apparent_temperature)}°`)}
                  {metric(t('humidity'), `${Math.round(data.current.relative_humidity_2m)}%`)}
                  {metric(t('rainChance'), data.daily.precipitation_probability_max?.[0] != null ? `${data.daily.precipitation_probability_max[0]}%` : '–', (data.daily.precipitation_probability_max?.[0] ?? 0) >= 60)}
                  {metric(t('sunrise'), (data.daily.sunrise?.[0] ?? '').slice(11, 16) || '–')}
                  {metric(t('sunset'), (data.daily.sunset?.[0] ?? '').slice(11, 16) || '–')}
                  {metric(
                    t('today'),
                    `${Math.round(data.daily.temperature_2m_min?.[0] ?? 0)}° / ${Math.round(data.daily.temperature_2m_max?.[0] ?? 0)}°`
                  )}
                </div>
              </div>

              {/* plain-language advice for a daytime outdoor visit */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                {(() => {
                  const items: AdvItem[] = Array.isArray(ns?.advItems) ? ns.advItems : [];
                  const b = buildBuckets(data, items);
                  const hasRisk = b.risk.length > 0;
                  return (
                    <>
                      {hasRisk && (
                        <div
                          className="rounded-2xl px-5 py-4"
                          style={{ background: 'rgba(185, 28, 28, 0.07)', border: '1px solid rgba(185, 28, 28, 0.35)' }}
                        >
                          <h3
                            className="text-xs font-bold uppercase tracking-wider mb-2.5"
                            style={{ color: '#b91c1c' }}
                          >
                            {t('advRisk')}
                          </h3>
                          <ul className="space-y-2">
                            {b.risk.map((l, i) => (
                              <li key={i} className="flex gap-2.5 text-sm font-medium leading-relaxed" style={{ color: '#b91c1c' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                  <path d="M12 9v4M12 17h.01" />
                                </svg>
                                <span>{l}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {block(t('advOut'), b.out, 'var(--accent)')}
                      {block(t('advPlay'), b.play, 'var(--accent)')}
                      {b.gear.length > 0 && (
                        <div className="rounded-2xl px-5 py-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                            {t('advWhatToBring')}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {b.gear.map((l, i) => (
                              <span
                                key={i}
                                className="rounded-full px-3 py-1.5 text-sm font-medium"
                                style={{ background: 'var(--bg-primary)', border: '1px solid var(--accent)', color: 'var(--text-secondary)' }}
                              >
                                {l}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* multi-day forecast */}
            <div className="mt-6 rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
                {t('forecastTitle')}
              </h3>
              <div className="overflow-x-auto pb-1">
                <div className="flex gap-3 min-w-[640px]">
                  {data.daily.time.map((day, i) => {
                    const g = groupOf(data.daily.weather_code[i]);
                    const rain = data.daily.precipitation_probability_max[i];
                    const uv = data.daily.uv_index_max?.[i] ?? null;
                    return (
                      <div
                        key={day}
                        className="flex-1 rounded-xl px-3 py-4 flex flex-col items-center gap-2 text-center"
                        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                      >
                        <span className="text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>
                          {dateToLabel(day, i)}
                        </span>
                        <WeatherIcon icon={g.icon} isDay />
                        <span className="text-xs leading-snug min-h-[2.2em]" style={{ color: 'var(--text-secondary)' }}>
                          {t(`cond.${g.key}` as never)}
                        </span>
                        <div>
                          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                            {Math.round(data.daily.temperature_2m_max[i] ?? 0)}°
                          </span>
                          <span className="text-xs font-medium ml-1.5" style={{ color: 'var(--text-muted)' }}>
                            {Math.round(data.daily.temperature_2m_min[i] ?? 0)}°
                          </span>
                        </div>
                        <div className="text-xs" style={{ color: rain != null && rain >= 60 ? '#b91c1c' : 'var(--text-muted)' }}>
                          {rain != null ? `${rain}%` : '–'}
                        </div>
                        {uv != null && uv >= 6 && (
                          <div className="text-[11px] font-medium" style={{ color: 'var(--accent)' }}>
                            {t('uvLabel')} {t(uvWordKey(uv) as never)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('note')}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
