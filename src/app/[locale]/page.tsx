import { setRequestLocale } from 'next-intl/server';
import { SITE } from '@/config';
import { loadMessages, langAlternates } from '@/lib/seo';
import { buildHomeSchemas } from '@/lib/schema';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import GuidesHub from '@/components/GuidesHub';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import WeatherSection from '@/components/WeatherSection';
import SeasonsSection from '@/components/SeasonsSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import RouteSection from '@/components/RouteSection';
import ItinerariesSection from '@/components/ItinerariesSection';
import AudienceSection from '@/components/AudienceSection';
import ScienceSection from '@/components/ScienceSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import JsonLd from '@/components/JsonLd';
import Footer from '@/components/Footer';

/* The home page renders a live weather module, so it is server-rendered on
   each request instead of being pre-rendered as a static snapshot. */
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessages(locale);
  const title = messages.meta?.title || '';
  const description = messages.meta?.description || SITE.description;
  const url = `${SITE.baseUrl}/${locale}`;

  return {
    title,
    description,
    alternates: langAlternates(locale),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.officialName,
      locale: locale === 'es' ? 'es_MX' : locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: SITE.ogImage, alt: SITE.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE.ogImage],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await loadMessages(locale);
  const schemas = buildHomeSchemas(messages, locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <GuidesHub />
        <BasicInfo />
        <HoursSection />
        <WeatherSection />
        <SeasonsSection />
        <TicketsSection />
        <TransportSection />
        <FacilitiesSection />
        <RouteSection />
        <ItinerariesSection />
        <AudienceSection />
        <ScienceSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <JsonLd data={schemas} />
      <Footer />
    </>
  );
}
