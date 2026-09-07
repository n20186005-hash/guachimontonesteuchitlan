import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE } from '@/config';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import type { Metadata, Viewport } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const langMap: Record<string, string> = {
  es: 'es',
  en: 'en',
  zh: 'zh-CN',
};

const localeMap: Record<string, string> = {
  es: 'es_MX',
  en: 'en_US',
  zh: 'zh_CN',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const desc = messages.meta?.description || SITE.description;

  return {
    metadataBase: new URL(SITE.baseUrl),
    title: messages.meta.title,
    description: desc,
    applicationName: SITE.officialName,
    // PWA: 应用清单与图标（manifest.webmanifest 位于 public/，静态导出后置于站点根）
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: SITE.shortName,
    },
    formatDetection: { telephone: false },
    openGraph: {
      title: messages.meta.title,
      description: desc,
      siteName: SITE.officialName,
      locale: localeMap[locale] || 'es_MX',
      type: 'website',
      images: [{ url: SITE.ogImage, alt: SITE.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: desc,
      images: [SITE.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/** 移动端浏览器主题色（PWA 外观） */
export const viewport: Viewport = {
  themeColor: '#3a7a8d',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={langMap[locale] || 'es'} suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SITE.gaId}', { anonymize_ip: true });
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
