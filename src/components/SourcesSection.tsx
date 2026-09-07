import { useTranslations } from 'next-intl';

/**
 * 资料来源板块（E-E-A-T）：
 * 展示站点数据来自哪些官方 / 权威渠道，增强内容可信度与专业性。
 */
export default function SourcesSection() {
  const t = useTranslations('sources');
  const tFooter = useTranslations('footer');

  const linksObj = tFooter.raw('officialLinks') as Record<
    string,
    { name: string; url: string }
  >;
  const links = Object.values(linksObj);

  return (
    <section id="fuentes" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl p-6 sm:p-8"
          style={{ background: 'var(--bg-tertiary)' }}
        >
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t('lead')}
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            {t('eeat')}
          </p>

          <h3
            className="font-display text-lg font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('linksTitle')}
          </h3>
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
