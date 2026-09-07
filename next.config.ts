import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Cloudflare Workers (OpenNext) 部署：使用服务端渲染模式。
// 不再使用 output: 'export' 静态导出（与 OpenNext 运行时冲突）。
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
