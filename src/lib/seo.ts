import { SITE } from '@/config';
import type { Metadata } from 'next';

export type AnyMessages = Record<string, any>;

export async function loadMessages(locale: string): Promise<AnyMessages> {
  return (await import(`@/messages/${locale}.json`)).default;
}

/**
 * 为某个语言页面生成 canonical + hreflang 语言互链。
 * x-default 固定指向默认语言（es）。
 */
export function langAlternates(locale: string, path = '') {
  const base = SITE.baseUrl;
  return {
    canonical: `${base}/${locale}${path}`,
    languages: {
      es: `${base}/es${path}`,
      zh: `${base}/zh${path}`,
      en: `${base}/en${path}`,
      'x-default': `${base}/${SITE.defaultLocale}${path}`,
    },
  };
}

export type GuideNs = 'guideVisitor' | 'guideGetting' | 'guideHistory' | 'guideDaytrips';

/** 专题指南页的 Metadata（title/description/canonical/hreflang/OG/Twitter）。 */
export async function guideMetadata(
  locale: string,
  path: string,
  ns: GuideNs
): Promise<Metadata> {
  const messages = await loadMessages(locale);
  const guide = messages?.[ns] || {};
  const title = guide?.metaTitle || messages?.meta?.title || SITE.shortName;
  const description = guide?.metaDescription || messages?.meta?.description || SITE.description;
  const url = `${SITE.baseUrl}/${locale}${path}`;
  const ogLocale = locale === 'es' ? 'es_MX' : locale === 'zh' ? 'zh_CN' : 'en_US';

  return {
    title,
    description,
    alternates: langAlternates(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.officialName,
      locale: ogLocale,
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
