'use client';
import valleyPlaces from '@/lib/valles/index.json';
import { useLocale } from 'next-intl';
import { nearbyContent, nearbyFacts, nearbySlugs } from '@/lib/nearby';

export default function NearbyHub() {
  const locale = useLocale() as keyof typeof nearbyContent;
  const title = { es: 'Lugares cercanos a Guachimontones', en: 'Places near Guachimontones', zh: 'Guachimontones 周边景点' }[locale];
  return <section className="section-padding" style={{ background: 'var(--bg-secondary)' }} id="nearby"><div className="max-w-6xl mx-auto">
    <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{nearbySlugs.map(slug => <a href={`/${locale}/nearby/${slug}`} key={slug} className="rounded-xl overflow-hidden transition-transform hover:-translate-y-1" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
      <img src={nearbyFacts[slug].image} alt={nearbyContent[locale][slug].name} className="w-full h-56 object-cover"/>
      <div className="p-6"><h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{nearbyContent[locale][slug].name}</h3><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{nearbyContent[locale][slug].tagline}</p></div>
    </a>)}{valleyPlaces.map(place => <a key={place.slug} href={`/${locale}/nearby/${place.slug}`} className="rounded-xl overflow-hidden transition-transform hover:-translate-y-1" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
      <img loading="lazy" src={`/valles/${place.slug}.webp`} alt={place.names[locale]} className="w-full h-56 object-cover"/>
      <div className="p-6"><h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{place.names[locale]}</h3><p className="text-sm">{place.town}, Jalisco</p></div>
    </a>)}</div>
  </div></section>;
}
