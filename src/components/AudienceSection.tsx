import { getMessages } from 'next-intl/server';

type AudiencePlan = { tag: string; who: string; points: string[] };

export default async function AudienceSection() {
  const m = (await getMessages()) as any;
  const d: any = m?.audience;
  if (!d) return null;
  const plans: AudiencePlan[] = Array.isArray(d.plans) ? d.plans : [];

  return (
    <section id="audience" className="section-padding">
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

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {p.tag}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                {p.who}
              </p>
              <ul className="space-y-2.5 flex-1">
                {p.points.map((pt, pi) => (
                  <li key={pi} className="flex gap-2.5 text-sm leading-relaxed">
                    <span
                      className="shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                    <span style={{ color: 'var(--text-secondary)' }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
