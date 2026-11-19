import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/config';
import { nearbyContent, nearbyFacts, nearbySlugs, type NearbySlug } from '@/lib/nearby';

type Props = { params: Promise<{ locale: string; slug: string }> };
const locales = ['es', 'en', 'zh'] as const;
const labels = {
  es: { home: 'Inicio', near: 'Lugares cercanos', info: 'Información básica', about: 'Sobre el lugar', admin: 'Gestión y mantenimiento', hours: 'Horarios', tickets: 'Entradas', discover: 'Qué observar', route: 'Recorrido sugerido', tips: 'Consejos de visita y fotografía', stay: 'Alojamiento', faq: 'Preguntas frecuentes', transport: 'Cómo llegar', reviews: 'Opiniones de visitantes', reviewsText: 'Consulta las puntuaciones y el número de reseñas actuales directamente en la ficha de Google Maps; no se muestra aquí una cifra sin verificar.', map: 'Ver ubicación y reseñas en Google Maps', source: 'Fuente de información', photo: 'Fuente de la fotografía', more: 'Más lugares cercanos' },
  en: { home: 'Home', near: 'Nearby places', info: 'Essential information', about: 'About the place', admin: 'Management and upkeep', hours: 'Opening hours', tickets: 'Admission', discover: 'What to see', route: 'Suggested visit route', tips: 'Visitor and photography tips', stay: 'Where to stay', faq: 'Frequently asked questions', transport: 'Getting there', reviews: 'Visitor reviews', reviewsText: 'Check the current rating and review count directly on Google Maps. No unverified rating is reproduced here.', map: 'Location and reviews on Google Maps', source: 'Information source', photo: 'Photograph source', more: 'More nearby places' },
  zh: { home: '首页', near: '周边景点', info: '基本信息', about: '关于景点', admin: '管理主体', hours: '开放时间', tickets: '门票', discover: '观察重点', route: '建议游览路线', tips: '游览与拍照建议', stay: '住宿建议', faq: '常见问题', transport: '交通方式', reviews: '游客评价', reviewsText: '请在 Google 地图地点页面查看最新评分与评价数量；本站不展示无法核实的数字。', map: '查看 Google 地图位置及评价', source: '信息来源', photo: '照片来源', more: '更多周边景点' },
};
function entry(locale: string, slug: string) {
  if (!locales.includes(locale as typeof locales[number]) || !nearbySlugs.includes(slug as NearbySlug)) return null;
  return nearbyContent[locale as keyof typeof nearbyContent][slug as NearbySlug];
}
export function generateStaticParams() { return locales.flatMap(locale => nearbySlugs.map(slug => ({ locale, slug }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = entry(locale, slug);
  if (!item) return {};
  const url = `${SITE.baseUrl}/${locale}/nearby/${slug}`;
  return { title: `${item.name} | Guachimontones`, description: item.intro, alternates: { canonical: url, languages: Object.fromEntries([...locales.map(l => [l, `${SITE.baseUrl}/${l}/nearby/${slug}`]), ['x-default', `${SITE.baseUrl}/es/nearby/${slug}`]]) }, openGraph: { title: item.name, description: item.intro, url, images: [nearbyFacts[slug as NearbySlug].image] } };
}
export default async function NearbyPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = entry(locale, slug);
  if (!item) notFound();
  setRequestLocale(locale);
  const facts = nearbyFacts[slug as NearbySlug];
  const t = labels[locale as keyof typeof labels];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facts.mapQuery)}`;
  const section = (title: string, body: string) => <section className="mb-10"><h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2><p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p></section>;
  return <><Header /><main>
    <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6" style={{ background: 'var(--color-nature-900)' }}><div className="max-w-5xl mx-auto">
      <nav className="text-sm text-white/70 mb-6"><a href={`/${locale}`} className="hover:underline">{t.home}</a> / {t.near}</nav>
      <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">{item.name}</h1>
      <p className="text-lg text-white/85 mb-4">{item.tagline}</p>
      <p className="text-sm text-white/75 mb-5">{item.address} · {item.time}</p>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex px-5 py-3 rounded-full font-semibold text-white" style={{ background: 'var(--accent)' }}>{t.map}</a>
    </div></section>
    <section className="section-padding"><div className="max-w-5xl mx-auto">
      <figure className="mb-10"><img src={facts.image} alt={item.name} className="w-full max-h-[530px] object-cover rounded-xl"/><figcaption className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}><a href={facts.photoSource} target="_blank" rel="noopener noreferrer" className="underline">{t.photo}</a></figcaption></figure>
      <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>{item.intro}</p>
      {section(t.admin, item.management)}
      {section(t.about, item.about)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.info}</h2><dl className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ color: 'var(--text-secondary)' }}><div><dt className="font-semibold">{t.transport}</dt><dd>{item.address}</dd></div><div><dt className="font-semibold">{t.hours}</dt><dd>{item.time}</dd></div><div><dt className="font-semibold">{t.tickets}</dt><dd>{item.price}</dd></div></dl></section>
      {section(t.transport, item.transport)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.discover}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{item.features.map(x => <li key={x}>{x}</li>)}</ul></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.route}</h2><ol className="list-decimal pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{item.route.map(x => <li key={x}>{x}</li>)}</ol></section>
      {section(t.tips, item.photoTip)}{section(t.stay, item.stay)}{section(t.faq, item.faq)}{section(t.reviews, t.reviewsText)}
      <div className="flex flex-wrap gap-5 text-sm font-semibold" style={{ color: 'var(--accent)' }}><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="underline">{t.map}</a><a href={facts.official} target="_blank" rel="noopener noreferrer" className="underline">{t.source}</a></div>
    </div></section>
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto"><h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{t.more}</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{nearbySlugs.filter(s => s !== slug).map(s => <a className="p-5 rounded-xl hover:underline" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} key={s} href={`/${locale}/nearby/${s}`}>{nearbyContent[locale as keyof typeof nearbyContent][s].name}</a>)}</div></div></section>
  </main><Footer /></>;
}
