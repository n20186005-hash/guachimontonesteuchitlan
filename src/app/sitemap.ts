import { MetadataRoute } from 'next';
import { SITE } from '@/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.baseUrl;
  // 语言顺序：默认语言 es 优先
  const locales = ['es', 'zh', 'en'];
  const guideRoutes = ['/visitor-guide', '/getting-there', '/history', '/day-trips'];
  const legalRoutes = ['/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // 首页
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
    // 四大专题指南（核心流量词）
    for (const route of guideRoutes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
    // 法律页
    for (const route of legalRoutes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      });
    }
  }

  return sitemap;
}
