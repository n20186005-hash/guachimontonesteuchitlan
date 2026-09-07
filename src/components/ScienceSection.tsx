import { getMessages } from 'next-intl/server';

export default async function ScienceSection() {
  const m = (await getMessages()) as any;
  const d: any = m?.science;
  if (!d) return null;
  const science: string[] = Array.isArray(d.science) ? d.science : [];
  const respect: string[] = Array.isArray(d.respect) ? d.respect : [];

  const list = (title: string, items: string[]) => (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <h3
        className="font-display text-lg font-semibold mb-5"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <ul className="space-y-3.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed">
            <span
              className="shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="science" className="section-padding">
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

        <div className="grid gap-6 lg:grid-cols-2">
          {list(d.scienceTitle, science)}
          {list(d.respectTitle, respect)}
        </div>
      </div>
    </section>
  );
}
