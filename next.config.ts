import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Cloudflare Workers (OpenNext) 部署：使用服务端渲染模式。
// output: 'standalone' 让 next build 产出 .next/standalone，供
// opennextjs-cloudflare build --skipNextBuild 打包 Worker。
const nextConfig: NextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
