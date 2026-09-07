import { SITE } from '@/config';
import type { AnyMessages } from '@/lib/seo';

const inLanguage: Record<string, string> = { es: 'es', en: 'en', zh: 'zh' };

/**
 * TouristAttraction + ArchaeologicalSite：景点实体（全站统一引用）。
 */
export function touristAttractionLd(messages: AnyMessages, locale: string, url: string) {
  const hero = messages?.hero || {};
  // 语义图片列表（绝对地址，供知识图谱 / 搜索卡片使用）
  const imageList = [
    `${SITE.baseUrl}${SITE.ogImage}`,
    `${SITE.baseUrl}/gallery/${encodeURIComponent('zona-arqueologica-teuchitlan-o-guachimontones (1).jpg')}`,
    `${SITE.baseUrl}/gallery/${encodeURIComponent('zona-arqueologica-teuchitlan-o-guachimontones (6).jpg')}`,
  ];
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'ArchaeologicalSite'],
    '@id': `${url}#guachimontones`,
    name: SITE.officialName,
    alternateName: [
      SITE.shortName,
      'Zona Arqueológica de Guachimontones',
      'Pirámides circulares de Guachimontones',
      'Circular pyramids of Guachimontones (Guadalajara)',
      'Zona Arqueológica Teuchitlán o Guachimontones, Teuchitlán, Jalisco',
    ],
    url,
    description: messages?.meta?.description || SITE.description,
    image: imageList,
    isAccessibleForFree: false,
    publicAccess: true,
    touristType: ['Archaeological site', 'Open-air museum'],
    telephone: SITE.telephone,
    address: { '@type': 'PostalAddress', ...SITE.address },
    geo: { '@type': 'GeoCoordinates', ...SITE.geo },
    hasMap: SITE.mapsShortUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hero?.rating || '4.7',
      reviewCount: String(hero?.reviewCount || '6707').replace(/,/g, ''),
      bestRating: 5,
    },
    sameAs: [
      SITE.mapsShortUrl,
      SITE.officialLinks.inahCatalogo,
      SITE.officialLinks.secturJal,
      SITE.officialLinks.ayuntamiento,
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'plusCode',
        value: 'M5W7+5F Guachimontones, Jalisco, Mexico',
      },
      {
        '@type': 'PropertyValue',
        name: 'category',
        value: 'Archaeological museum',
      },
    ],
  };
}

export function webSiteLd(messages: AnyMessages, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.baseUrl}/#website`,
    url: `${SITE.baseUrl}/${locale}`,
    name: SITE.shortName,
    description: messages?.meta?.description || SITE.description,
    inLanguage: inLanguage[locale] || 'es',
    publisher: {
      '@type': 'Organization',
      name: SITE.officialName,
      url: SITE.baseUrl,
    },
  };
}

export function breadcrumbLd(items: { name: string; item?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.item ? { item: it.item } : {}),
    })),
  };
}

export function faqPageLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** 首页完整 JSON-LD 集合 */
export function buildHomeSchemas(messages: AnyMessages, locale: string): object[] {
  const homeUrl = `${SITE.baseUrl}/${locale}`;
  return [
    webSiteLd(messages, locale),
    touristAttractionLd(messages, locale, homeUrl),
    faqPageLd(messages?.faq?.items || []),
    breadcrumbLd([
      { name: messages?.header?.home || 'Home', item: homeUrl },
      {
        name: messages?.guideVisitor?.h1 || SITE.shortName,
        item: `${homeUrl}#informacion`,
      },
    ]),
  ];
}

/** 专题子页面 JSON-LD 集合 */
export function buildGuideSchemas(
  messages: AnyMessages,
  locale: string,
  path: string,
  guideNs: 'guideVisitor' | 'guideGetting' | 'guideHistory' | 'guideDaytrips'
): object[] {
  const pageUrl = `${SITE.baseUrl}/${locale}${path}`;
  const guide = messages?.[guideNs] || {};
  return [
    touristAttractionLd(messages, locale, `${SITE.baseUrl}/${locale}`),
    breadcrumbLd([
      { name: messages?.header?.home || 'Home', item: `${SITE.baseUrl}/${locale}` },
      { name: guide?.h1 || guide?.nav || SITE.shortName, item: pageUrl },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: guide?.metaTitle || guide?.h1 || SITE.shortName,
      description: guide?.metaDescription || messages?.meta?.description || '',
      inLanguage: inLanguage[locale] || 'es',
      isPartOf: { '@id': `${SITE.baseUrl}/#website` },
      about: { '@id': `${SITE.baseUrl}/${locale}#guachimontones` },
    },
  ];
}
