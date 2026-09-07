import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { guideMetadata, loadMessages, type GuideNs } from '@/lib/seo';
import { buildGuideSchemas } from '@/lib/schema';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import GuideContent from '@/components/guides/GuideContent';
import SourcesSection from '@/components/SourcesSection';

const NS: GuideNs = 'guideVisitor';
const PATH = '/visitor-guide';
const SLUG = 'visitor-guide';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return guideMetadata(locale, PATH, NS);
}

export default async function VisitorGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await loadMessages(locale);
  const schemas = buildGuideSchemas(messages, locale, PATH, NS);

  return (
    <>
      <Header />
      <main>
        <GuideContent ns={NS} slug={SLUG} />
        <SourcesSection />
      </main>
      <JsonLd data={schemas} />
      <Footer />
    </>
  );
}
