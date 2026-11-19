import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/config';
import { explore, exploreSlugs, type ExploreSlug } from '@/lib/explore';

type Props = { params: Promise<{ locale: string; slug: string }> };
const validLocales = ['es', 'en', 'zh'] as const;
function resolve(locale: string, slug: string) {
  if (!validLocales.includes(locale as (typeof validLocales)[number]) || !exploreSlugs.includes(slug as ExploreSlug)) return null;
  return explore[locale as keyof typeof explore][slug as ExploreSlug];
}

export function generateStaticParams() {
  return validLocales.flatMap(locale => exploreSlugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = resolve(locale, slug);
  if (!entry) return {};
  const url = `${SITE.baseUrl}/${locale}/explore/${slug}`;
  return {
    title: `${entry.title} | Guachimontones`,
    description: entry.description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([...validLocales.map(l => [l, `${SITE.baseUrl}/${l}/explore/${slug}`]), ['x-default', `${SITE.baseUrl}/es/explore/${slug}`]]),
    },
    openGraph: { title: entry.title, description: entry.description, url, type: 'article' },
  };
}

export default async function ExplorePage({ params }: Props) {
  const { locale, slug } = await params;
  const entry = resolve(locale, slug);
  if (!entry) notFound();
  setRequestLocale(locale);
  const labels = {
    es: { home: 'Inicio', related: 'Más guías', map: 'Abrir ubicación en Google Maps', source: 'Información oficial del INAH' },
    en: { home: 'Home', related: 'More guides', map: 'Open location in Google Maps', source: 'Official INAH site information' },
    zh: { home: '首页', related: '更多指南', map: '在 Google 地图查看地点', source: 'INAH 官方遗址信息' },
  }[locale as keyof typeof explore];
  return <>
    <Header />
    <main>
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6" style={{ background: 'var(--color-nature-900)' }}>
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-6 text-white/70"><a href={`/${locale}`} className="hover:underline">{labels.home}</a> / {entry.title}</nav>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">{entry.title}</h1>
          <p className="text-lg text-white/80 leading-relaxed">{entry.intro}</p>
        </div>
      </section>
      <section className="section-padding"><div className="max-w-4xl mx-auto space-y-12">
        {entry.sections.map((section, i) => <section key={i}>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{section.heading}</h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.text}</p>
          {section.points && <ul className="list-disc pl-6 mt-4 space-y-2" style={{ color: 'var(--text-secondary)' }}>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
        </section>)}
        <div className="flex flex-wrap gap-4">
          <a className="underline font-semibold" style={{ color: 'var(--accent)' }} href={SITE.mapsShortUrl} target="_blank" rel="noopener noreferrer">{labels.map}</a>
          <a className="underline font-semibold" style={{ color: 'var(--accent)' }} href={SITE.officialLinks.inahCatalogo} target="_blank" rel="noopener noreferrer">{labels.source}</a>
        </div>
      </div></section>
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>{labels.related}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{exploreSlugs.filter(s => s !== slug).map(s => <a key={s} href={`/${locale}/explore/${s}`} className="p-5 rounded-xl hover:underline" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{explore[locale as keyof typeof explore][s].title}</a>)}</div>
      </div></section>
    </main>
    <Footer />
  </>;
}
