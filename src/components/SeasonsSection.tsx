import { getMessages } from 'next-intl/server';

type SeasonRow = {
  season: string;
  months: string;
  weather: string;
  highlights: string;
  tips: string;
};

export default async function SeasonsSection() {
  const m = (await getMessages()) as any;
  const d: any = m?.seasons;
  if (!d) return null;
  const rows: SeasonRow[] = Array.isArray(d.rows) ? d.rows : [];
  const cols: any = d.cols || {};

  return (
    <section id="seasons" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {d.title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {d.subtitle}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)' }}
        >
          <div className="overflow-x-auto">
            <table
              className="w-full text-left text-sm border-collapse"
              style={{ minWidth: 760 }}
            >
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  <th className="px-5 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    {cols.colSeason}
                  </th>
                  <th className="px-5 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    {cols.colWeather}
                  </th>
                  <th className="px-5 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    {cols.colHighlights}
                  </th>
                  <th className="px-5 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    {cols.colTips}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className="align-top"
                    style={{ borderTop: '1px solid var(--border-color)' }}
                  >
                    <td className="px-5 py-4">
                      <div
                        className="font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {r.season}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {r.months}
                      </div>
                    </td>
                    <td
                      className="px-5 py-4 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {r.weather}
                    </td>
                    <td
                      className="px-5 py-4 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {r.highlights}
                    </td>
                    <td
                      className="px-5 py-4 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {r.tips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {d.note}
        </p>
      </div>
    </section>
  );
}
