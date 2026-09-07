import { getMessages } from 'next-intl/server';

type FacilityItem = { t: string; d: string };
type FacilityGroup = { title: string; items: FacilityItem[] };

export default async function FacilitiesSection() {
  const m = (await getMessages()) as any;
  const d: any = m?.facilities;
  if (!d) return null;
  const groups: FacilityGroup[] = Array.isArray(d.groups) ? d.groups : [];

  return (
    <section id="facilities" className="section-padding">
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
          {groups.map((g, gi) => (
            <div
              key={gi}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-lg font-semibold mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                {g.title}
              </h3>
              <ul className="space-y-5">
                {g.items.map((it, ii) => (
                  <li key={ii}>
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {it.t}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {it.d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {d.note}
        </p>
      </div>
    </section>
  );
}
