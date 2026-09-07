'use client';

import { useTranslations, useMessages, useLocale } from 'next-intl';

type Card = { slug: string; title: string; desc: string };

export default function GuidesHub() {
  const t = useTranslations('clusters');
  const messages = useMessages() as any;
  const locale = useLocale();
  const cards: Card[] = messages?.clusters?.cards || [];

  return (
    <section id="guias" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card) => (
            <a
              key={card.slug}
              href={`/${locale}/${card.slug}`}
              className="group rounded-xl p-6 sm:p-7 transition-transform hover:-translate-y-1"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                display: 'block',
              }}
            >
              <h3
                className="font-display text-lg sm:text-xl font-semibold mb-2 group-hover:underline"
                style={{ color: 'var(--text-primary)' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {card.desc}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: 'var(--accent)' }}
              >
                {t('cta')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
