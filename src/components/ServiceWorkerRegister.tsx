'use client';

import { useEffect } from 'react';

/**
 * 在页面加载后注册 PWA Service Worker。
 * 仅在正式构建（生产环境）与受支持浏览器中启用，避免干扰开发调试。
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    if (typeof window === 'undefined') return;

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // 静默失败：SW 仅是渐进增强，不影响正常浏览
      });
    };

    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register);
    }
  }, []);

  return null;
}
