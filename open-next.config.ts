// open-next.config.ts for Cloudflare Workers (OpenNext) deployment.
// 本站所有路由均为构建期静态生成(SSG)，未配置 R2 增量缓存。
// 如需 ISR/on-demand revalidate 缓存，请参考 https://opennext.js.org/cloudflare/caching
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
