import ValleyPlace, { valleyMetadata } from '@/components/ValleyPlace';
import valleyPlaces from '@/lib/valles/index.json';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/config';
import { nearbyContent, nearbyFacts, nearbySlugs, type NearbySlug } from '@/lib/nearby';
import { nearbyDetails } from '@/lib/nearby-details';
import { nearbyPlaceIds, nearbyVerifiedAddresses } from '@/lib/nearby';
import NearbyRating from '@/components/NearbyRating';

type Props = { params: Promise<{ locale: string; slug: string }> };
const locales = ['es', 'en', 'zh'] as const;
const labels = {
  es: { home: 'Inicio', near: 'Lugares cercanos', info: 'Información básica', about: 'Sobre el lugar', admin: 'Sobre este lugar y quién lo gestiona', history: 'Historia y contexto', architecture: 'Paisaje y rasgos distintivos', planning: 'Consejos para preparar la visita', hours: 'Horarios', tickets: 'Entradas', discover: 'Qué observar', route: 'Recorrido sugerido', tips: 'Consejos de visita y fotografía', stay: 'Alojamiento', faq: 'Preguntas frecuentes', transport: 'Cómo llegar', reviews: 'Opiniones de visitantes', reviewsText: 'Las puntuaciones y los recuentos de reseñas se actualizan en Google Maps. Consulta allí las cifras recientes.', map: 'Ver ubicación y reseñas en Google Maps', source: 'Fuente de información', photo: 'Fuente de la fotografía', more: 'Más lugares cercanos' },
  en: { home: 'Home', near: 'Nearby places', info: 'Essential information', about: 'About the place', admin: 'About this place and its management', history: 'History and context', architecture: 'Landscape and architecture', planning: 'Plan your visit', hours: 'Opening hours', tickets: 'Admission', discover: 'What to see', route: 'Suggested visit route', tips: 'Visitor and photography tips', stay: 'Where to stay', faq: 'Frequently asked questions', transport: 'Getting there', reviews: 'Visitor reviews', reviewsText: 'Google Maps updates ratings and review totals. Open its place listing for the latest figures.', map: 'Location and reviews on Google Maps', source: 'Information source', photo: 'Photograph source', more: 'More nearby places' },
  zh: { home: '首页', near: '周边景点', info: '基本信息', about: '关于景点', admin: '关于景点与管理主体', history: '历史背景', architecture: '建筑与地景特色', planning: '出发前游览建议', hours: '开放时间', tickets: '门票', discover: '观察重点', route: '建议游览路线', tips: '游览与拍照建议', stay: '住宿建议', faq: '常见问题', transport: '交通方式', reviews: '游客评价', reviewsText: 'Google 地图会更新评分及评价总数，请通过景点专属地点页面查看最近数据。', map: '查看 Google 地图位置及评价', source: '信息来源', photo: '照片来源', more: '更多周边景点' },
};
const attractionTypes = {
  es: { 'phil-weigand-center': 'Museo de interpretación arqueológica', 'teuchitlan-main-plaza': 'Plaza municipal', 'presa-la-vega': 'Embalse y paisaje natural', 'tequila-main-plaza': 'Plaza cívica e histórica', 'tequila-santiago-church': 'Templo histórico en uso', 'tequila-national-museum': 'Museo de historia y cultura', 'tequila-lavaderos': 'Lavaderos históricos comunitarios', 'tequila-volcano': 'Volcán y área natural', 'amatitan-parish': 'Templo histórico en uso', 'ahualulco-landmark': 'Monumento urbano y letras' },
  en: { 'phil-weigand-center': 'Archaeological interpretation museum', 'teuchitlan-main-plaza': 'Municipal square', 'presa-la-vega': 'Reservoir and natural landscape', 'tequila-main-plaza': 'Historic town square', 'tequila-santiago-church': 'Active historic church', 'tequila-national-museum': 'History and culture museum', 'tequila-lavaderos': 'Historic communal washhouses', 'tequila-volcano': 'Volcano and natural landscape', 'amatitan-parish': 'Active historic church', 'ahualulco-landmark': 'Painted town-name monument' },
  zh: { 'phil-weigand-center': '考古解说博物馆', 'teuchitlan-main-plaza': '市镇公共广场', 'presa-la-vega': '水库与自然地景', 'tequila-main-plaza': '历史市民广场', 'tequila-santiago-church': '仍在使用的历史教堂', 'tequila-national-museum': '历史文化博物馆', 'tequila-lavaderos': '历史公共洗衣设施', 'tequila-volcano': '火山与自然地景', 'amatitan-parish': '仍在使用的历史教堂', 'ahualulco-landmark': '彩绘地名城市地标' },
} satisfies Record<(typeof locales)[number], Record<NearbySlug, string>>;
function entry(locale: string, slug: string) {
  if (!locales.includes(locale as typeof locales[number]) || !nearbySlugs.includes(slug as NearbySlug)) return null;
  return nearbyContent[locale as keyof typeof nearbyContent][slug as NearbySlug];
}
export function generateStaticParams() { return locales.flatMap(locale => [...nearbySlugs, ...valleyPlaces.map(p => p.slug)].map(slug => ({ locale, slug }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = entry(locale, slug);
  if (!locales.includes(locale as typeof locales[number])) return {};
  if (!item) return valleyMetadata(locale as typeof locales[number], slug) ?? {};
  const url = `${SITE.baseUrl}/${locale}/nearby/${slug}`;
  return { title: `${item.name} | Guachimontones`, description: item.intro, alternates: { canonical: url, languages: Object.fromEntries([...locales.map(l => [l, `${SITE.baseUrl}/${l}/nearby/${slug}`]), ['x-default', `${SITE.baseUrl}/es/nearby/${slug}`]]) }, openGraph: { title: item.name, description: item.intro, url, images: [nearbyFacts[slug as NearbySlug].image] } };
}
export default async function NearbyPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = entry(locale, slug);
  if (!locales.includes(locale as typeof locales[number])) notFound();
  setRequestLocale(locale);
  if (!item) {
    const place = valleyPlaces.find(p => p.slug === slug);
    if (!place) notFound();
    return <ValleyPlace locale={locale as typeof locales[number]} place={place} />;
  }
  const facts = nearbyFacts[slug as NearbySlug];
  const address = nearbyVerifiedAddresses[slug as NearbySlug] ?? item.address;
  const t = labels[locale as keyof typeof labels];
  const detail = nearbyDetails[locale as keyof typeof nearbyDetails][slug as NearbySlug];
  const placeId = nearbyPlaceIds[slug as NearbySlug];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facts.mapQuery)}${placeId ? `&query_place_id=${encodeURIComponent(placeId)}` : ''}`;
  const section = (title: string, body: string) => <section className="mb-10"><h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2><p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p></section>;
  return <><Header /><main>
    <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6" style={{ background: 'var(--color-nature-900)' }}><div className="max-w-5xl mx-auto">
      <nav className="text-sm text-white/70 mb-6"><a href={`/${locale}`} className="hover:underline">{t.home}</a> / {t.near}</nav>
      <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">{item.name}</h1>
      <p className="text-lg text-white/85 mb-4">{item.tagline}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85 mb-5">
        <span>{address}</span><span>{item.time}</span>
        <NearbyRating slug={slug} locale={locale} mapUrl={mapUrl} />
      </div>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex px-5 py-3 rounded-full font-semibold text-white" style={{ background: 'var(--accent)' }}>{t.map}</a>
    </div></section>
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto">
      <div className="max-w-4xl p-6 sm:p-9 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{item.name} · {t.admin}</h2>
        <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{item.about}</p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.management}</p>
      </div>
    </div></section>
    <section className="section-padding"><div className="max-w-5xl mx-auto">
      <figure className="mb-10"><img src={facts.image} alt={item.name} className="w-full max-h-[530px] object-cover rounded-xl"/><figcaption className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}><a href={facts.photoSource} target="_blank" rel="noopener noreferrer" className="underline">{t.photo}</a></figcaption></figure>
      {section(locale === 'zh' ? '探索与景点介绍' : locale === 'es' ? 'Descubre este lugar' : 'Discover this place', item.intro)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.planning}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{item.visitTips.map(x => <li key={x}>{x}</li>)}</ul></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.discover}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{item.features.map(x => <li key={x}>{x}</li>)}</ul></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t.info}</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ color: 'var(--text-secondary)' }}>
          {[
            [locale === 'zh' ? '景点名称' : locale === 'es' ? 'Nombre' : 'Name', item.name],
            [locale === 'zh' ? '类型' : locale === 'es' ? 'Tipo' : 'Type', attractionTypes[locale as keyof typeof attractionTypes][slug as NearbySlug]],
            [locale === 'zh' ? '详细地点' : locale === 'es' ? 'Ubicación' : 'Location', address],
            [t.hours, item.time], [t.tickets, item.price],
          ].map(([key, value]) => <div key={key} className="p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><dt className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{key}</dt><dd className="text-base leading-relaxed">{value}</dd></div>)}
        </dl>
      </section>
      {section(t.hours, item.time)}
      {section(t.tickets, item.price)}
      {section(t.transport, item.transport)}
      {section(t.history, item.history)}
      {section(t.architecture, item.architecture)}
      {section(locale === 'zh' ? '文化特色' : locale === 'es' ? 'Cultura local' : 'Local culture', detail.culture)}
      {section(locale === 'zh' ? '核心体验' : locale === 'es' ? 'Experiencia principal' : 'Main experience', detail.experience)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.route}</h2><ol className="list-decimal pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{item.route.map(x => <li key={x}>{x}</li>)}</ol></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{locale === 'zh' ? '游览须知' : locale === 'es' ? 'Antes de recorrer' : 'Before you explore'}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{detail.checklist.map(x => <li key={x}>{x}</li>)}</ul></section>
      {section(t.tips, item.photoTip)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{locale === 'zh' ? '推荐拍摄机位' : locale === 'es' ? 'Puntos para fotografiar' : 'Photography viewpoints'}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{detail.photoSpots.map(x => <li key={x}>{x}</li>)}</ul></section>
      {section(t.stay, item.stay)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.reviews}</h2><p className="mb-3" style={{ color: 'var(--text-secondary)' }}>{t.reviewsText}</p><NearbyRating slug={slug} locale={locale} mapUrl={mapUrl} /></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t.faq}</h2><div className="space-y-5">{detail.questions.map(({ q, a }) => <div key={q} className="p-5 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}><h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{q}</h3><p style={{ color: 'var(--text-secondary)' }}>{a}</p></div>)}</div><p className="mt-5" style={{ color: 'var(--text-secondary)' }}>{item.faq}</p></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{locale === 'zh' ? '交通指南与地图' : locale === 'es' ? 'Guía de transporte y mapa' : 'Transport guide and map'}</h2><p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{item.address}</p><p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{item.transport}</p><a className="underline font-semibold" style={{ color: 'var(--accent)' }} href={mapUrl} target="_blank" rel="noopener noreferrer">{t.map}</a></section>
      <div className="flex flex-wrap gap-5 text-sm font-semibold" style={{ color: 'var(--accent)' }}><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="underline">{t.map}</a><a href={facts.official} target="_blank" rel="noopener noreferrer" className="underline">{t.source}</a></div>
    </div></section>
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto"><h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{t.more}</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{nearbySlugs.filter(s => s !== slug).map(s => <a className="p-5 rounded-xl hover:underline" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} key={s} href={`/${locale}/nearby/${s}`}>{nearbyContent[locale as keyof typeof nearbyContent][s].name}</a>)}</div></div></section>
  </main><Footer /></>;
}
