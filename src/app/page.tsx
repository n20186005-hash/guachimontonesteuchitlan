import { redirect } from 'next/navigation';

// 兜底路由：正常情况下 middleware 会拦截 `/` 并重定向到默认语言（如 /es）。
// 若 middleware 未命中，此页面保证仍能跳到默认语言，避免空白。
export default function RootPage() {
  redirect('/es');
}