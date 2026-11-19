'use client';
import { useLocale } from 'next-intl';
import { explore, exploreSlugs } from '@/lib/explore';

export default function ExploreHub() {
  const locale = useLocale() as keyof typeof explore;
  const title = { es: 'Explora Guachimontones a fondo', en: 'Explore Guachimontones in depth', zh: '深入探索 Guachimontones' }[locale];
  return <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">{exploreSlugs.map(slug => {
        const item = explore[locale][slug];
        return <a key={slug} href={`/${locale}/explore/${slug}`} className="group rounded-xl p-6 hover:-translate-y-1 transition-transform" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-display text-xl font-semibold mb-3 group-hover:underline" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
        </a>;
      })}</div>
    </div>
  </section>;
}
