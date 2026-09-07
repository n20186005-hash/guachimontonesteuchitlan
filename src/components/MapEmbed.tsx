import { useTranslations, useMessages, useLocale } from 'next-intl';
import { SITE } from '@/config';

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const messages = useMessages() as any;
  const locale = useLocale();
  const getThere = messages?.clusters?.cards?.find(
    (c: { slug: string }) => c.slug === 'getting-there'
  );

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          {/* 
            NOTE: Google Maps attribution is hidden via CSS (.gm-style-cc, .gmnoprint).
            This is for visual cleanliness only. Google's Terms of Service apply.
          */}
          <iframe
            src={SITE.mapsEmbedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`Google Maps – ${SITE.officialName}, ${SITE.address.addressLocality}, ${SITE.address.addressRegion}, México`}
          />
        </div>

        {/* Getting here at a glance */}
        <div
          className="mt-6 rounded-2xl p-5 sm:p-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('quickHeading')}
            </h3>
            {getThere && (
              <a
                href={`/${locale}/getting-there`}
                className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('allOptions')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['qCar', 'qBus', 'qTour', 'qTaxi'] as const).map((k) => (
              <a
                key={k}
                href={`/${locale}/getting-there`}
                className="rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-colors hover:opacity-80"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
              >
                {t(k)}
              </a>
            ))}
          </div>
        </div>

        {/* Open in Google Maps */}
        <div className="mt-5 flex flex-col items-center gap-4">
          <a
            href="https://maps.app.goo.gl/1WnrfR8J7z6EPdd17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* 权威出站链接 */}
        <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('officialTourism')}:{' '}
          <a
            href={SITE.officialLinks.secturJal}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 hover:opacity-80"
            style={{ color: 'var(--accent)' }}
          >
            secturjal.jalisco.gob.mx
          </a>
        </p>
      </div>
    </section>
  );
}
