/**
 * 站点全局配置（SEO 相关常量）。
 * 单一数据源：供 Metadata、JSON-LD、地图/联系方式等复用。
 */
export const SITE = {
  baseUrl: 'https://guachimontonesteuchitlan.com',
  officialName: 'Zona Arqueológica Teuchitlán o Guachimontones',
  shortName: 'Guachimontones',
  description:
    'Pirámides circulares de Guachimontones en Teuchitlán, Jalisco: guía de visita, transporte desde Guadalajara, historia de la cultura Teuchitlán y excursiones.',
  // 实体绑定：短名与全名等位，地址/电话/坐标单一来源
  address: {
    streetAddress: 'Carretera Estatal 604 Guadalajara-San Marcos Gral. Lucio Blanco',
    addressLocality: 'Teuchitlán',
    addressRegion: 'Jalisco',
    postalCode: '46762',
    addressCountry: 'MX',
  },
  telephone: '+52-384-109-0388',
  geo: {
    latitude: 20.6954172,
    longitude: -103.8363279,
  },
  mapsShortUrl: 'https://maps.app.goo.gl/1WnrfR8J7z6EPdd17',
  // 官方 Google Maps 嵌入（来自 Google 商户卡片 <iframe> src）
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.364522727926!2d-103.8363279!3d20.695417199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84260dc27af7e84f%3A0x78f4a7f5526a5a9e!2sZona%20Arqueol%C3%B3gica%20Teuchitl%C3%A1n%20o%20Guachimontones!5e0!3m2!1sen!2s!4v1788744190696!5m2!1sen!2s',
  // 语言默认 es（目标受众为西语游客）
  defaultLocale: 'es',
  locales: ['es', 'zh', 'en'] as const,
  // Google Analytics 4（阶段一需求指定）
  gaId: 'G-HXM22WWPKP',
  // 结构化数据可用的正式资源
  officialLinks: {
    inahCatalogo:
      'https://lugares.inah.gob.mx/es/zonas-arqueologicas/zonas/1715-teuchitl%C3%A1n-o-guachimontones.html',
    secturJal: 'https://secturjal.jalisco.gob.mx/inicio',
    ayuntamiento: 'https://teuchitlan.jalisco.gob.mx/inicio',
  },
  ogImage: '/og-guachimontones.jpg',
  ogImageAlt: 'Zona Arqueológica Teuchitlán o Guachimontones, Jalisco, México',
} as const;

export type Locale = (typeof SITE.locales)[number];

/** 每个语言页面在 SITE.baseUrl 下的完整 URL */
export function localeUrl(locale: string, path = ''): string {
  return `${SITE.baseUrl}/${locale}${path}`;
}
