import { getMessages } from 'next-intl/server';

type Plan = { tag: string; when: string; steps: string[] };

export default async function ItinerariesSection() {
  const m = (await getMessages()) as any;
  const d: any = m?.itineraries;
  if (!d) return null;
  const plans: { key: string; plan: Plan | undefined }[] = [
    { key: 'halfDay', plan: d.halfDay },
    { key: 'fullDay', plan: d.fullDay },
  ];

  return (
    <section id="itineraries" className="section-padding">
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

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map(({ key, plan }) => {
            if (!plan) return null;
            return (
              <div
                key={key}
                className="rounded-2xl p-6 sm:p-8 flex flex-col"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{ background: 'var(--accent)', color: '#ffffff' }}
                >
                  {plan.tag}
                </div>
                <p
                  className="mt-4 text-sm font-medium leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {plan.when}
                </p>
                <ol className="mt-4 space-y-3 flex-1">
                  {plan.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
                        style={{ background: 'var(--bg-primary)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {d.addNote}
        </p>
      </div>
    </section>
  );
}
