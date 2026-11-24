import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/config';
import places from '@/lib/valles/index.json';
import en from '@/lib/valles/en.json';
import es from '@/lib/valles/es.json';
import zh from '@/lib/valles/zh.json';

type Locale = 'en' | 'es' | 'zh';
type Slug = keyof typeof es;
const content = { en, es, zh };
const labels = {
  en: { nearby: 'Nearby places', management: 'Who manages access', route: 'Walking route', source: 'Visitor information source', photo: 'Photograph · La Ruta del Tequila', faq: 'Questions about visiting', map: 'Find this place on Google Maps', related: 'Explore the Jalisco valleys' },
  es: { nearby: 'Lugares cercanos', management: 'Gestión y acceso', route: 'Recorrido a pie', source: 'Fuente de información para la visita', photo: 'Fotografía · La Ruta del Tequila', faq: 'Preguntas sobre la visita', map: 'Ubicación en Google Maps', related: 'Recorre los valles de Jalisco' },
  zh: { nearby: '周边景点', management: '管理与参观条件', route: '步行游线', source: '游览信息来源', photo: '实景照片来源 · La Ruta del Tequila', faq: '游览常见问题', map: '在 Google 地图中查看此地点', related: '探索哈利斯科山谷' },
};

export function valleyMetadata(locale: Locale, slug: string): Metadata | undefined {
  const place = places.find(p => p.slug === slug);
  if (!place) return;
  const url = (lang: string) => `${SITE.baseUrl}/${lang}/nearby/${slug}`;
  const name = place.names[locale];
  const description = content[locale][slug as Slug].body;
  return {
    title: `${name} | Guachimontones`, description,
    alternates: { canonical: url(locale), languages: { en: url('en'), es: url('es'), zh: url('zh'), 'x-default': url('es') } },
    openGraph: { title: name, description, url: url(locale), images: [`/valles/${slug}.webp`] },
  };
}

export default function ValleyPlace({ locale, place }: { locale: Locale; place: typeof places[number] }) {
  const copy = content[locale][place.slug as Slug];
  const t = labels[locale];
  const name = place.names[locale];
  const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.query);
  const heading = 'font-display text-2xl sm:text-3xl font-semibold mb-4';
  return <><Header /><main>
    <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6" style={{ background: 'var(--color-nature-900)' }}>
      <div className="max-w-5xl mx-auto text-white">
        <a className="text-sm underline text-white/80" href={`/${locale}#nearby`}>{t.nearby}</a>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-4 mb-4">{name}</h1>
        <p>{place.town}, Jalisco, México</p>
        <a className="inline-block mt-4 underline" href={map}>{t.map}</a>
      </div>
    </section>
    <section className="section-padding" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <article className="max-w-5xl mx-auto space-y-9 text-base sm:text-lg leading-relaxed">
        <p>{copy.body}</p>
        <section className="p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <h2 className={heading}>{t.management}</h2><p>{copy.management}</p>
        </section>
        <figure><img src={`/valles/${place.slug}.webp`} alt={name} className="w-full max-h-[530px] object-contain rounded-xl" />
          <figcaption className="text-sm mt-2"><a className="underline" href={place.photoSource}>{t.photo}</a></figcaption>
        </figure>
        <section><h2 className={heading}>{t.route}</h2><p>{copy.route}</p><a className="inline-block mt-3 underline" href={map}>{t.map}</a></section>
        <section><h2 className={heading}>{t.faq}</h2>
          <div className="space-y-4">{copy.faq.map(({q,a}) => <div key={q} className="p-5 rounded-xl" style={{background:'var(--bg-tertiary)'}}><h3 className="text-lg font-semibold">{q}</h3><p>{a}</p></div>)}</div>
        </section>
        <a className="underline" href={place.source}>{t.source}</a>
        <nav><h2 className={heading}>{t.related}</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {places.filter(p => p.slug !== place.slug && p.town === place.town).map(p => <a className="underline" key={p.slug} href={`/${locale}/nearby/${p.slug}`}>{p.names[locale]}</a>)}
          <a className="underline" href={`/${locale}#nearby`}>{t.nearby}</a>
        </div></nav>
      </article>
    </section>
  </main><Footer /></>;
}
