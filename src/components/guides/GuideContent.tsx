'use client';

import { useMessages, useLocale } from 'next-intl';
import { SITE } from '@/config';

type Block = { h?: string; p?: string; items?: string[] };
type Card = { slug: string; title: string; desc: string };

/**
 * 专题指南页通用渲染：
 * - 深色页眉（面包屑 + H1 + 导语）
 * - 信息块（H2 + 段落 + 列表）
 * - 可选官方联系卡（游客指南）
 * - 其它指南互链 + 返回首页/地图 CTA
 */
export default function GuideContent({ ns, slug }: { ns: string; slug: string }) {
  const messages = useMessages() as any;
  const locale = useLocale();

  const g = messages?.[ns] || {};
  const common = messages?.guideCommon || {};
  const homeLabel = messages?.header?.home || '';
  const blocks: Block[] = g?.blocks || [];
  const contact = g?.contact;
  const cards: Card[] = messages?.clusters?.cards || [];
  const related = cards.filter((c) => c.slug !== slug);
  const backHref = `/${locale}`;

  return (
    <>
      {/* Page header */}
      <section
        className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6"
        style={{ background: 'var(--color-nature-900)' }}
      >
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs sm:text-sm mb-6 flex items-center gap-2 text-white/70">
            <a href={backHref} className="hover:underline">
              {homeLabel}
            </a>
            <span aria-hidden="true">/</span>
            <span>{g?.nav}</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {g?.h1}
          </h1>
          {g?.lede && <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">{g.lede}</p>}
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="space-y-12">
            {blocks.map((block, i) => (
              <div key={i}>
                {block.h && (
                  <h2
                    className="font-display text-2xl sm:text-3xl font-semibold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {block.h}
                  </h2>
                )}
                {block.p && (
                  <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {block.p}
                  </p>
                )}
                {block.items && block.items.length > 0 && (
                  <ul className="space-y-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                        <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Optional official contact box */}
          {contact && (
            <div
              className="mt-12 p-6 sm:p-8 rounded-xl"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <h2 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {contact.h}
              </h2>
              <p className="text-base mb-3" style={{ color: 'var(--text-secondary)' }}>
                {contact.note}
              </p>
              <a
                href={`tel:${contact.phone?.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center gap-2 text-lg font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                {contact.phone}
              </a>
            </div>
          )}

          {/* Bottom CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={backHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {common?.backHome}
            </a>
            <a
              href={SITE.mapsShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
            >
              {common?.openMap}
            </a>
          </div>
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="section-padding pt-0" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              {common?.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((card) => (
                <a
                  key={card.slug}
                  href={`/${locale}/${card.slug}`}
                  className="rounded-xl p-5 transition-transform hover:-translate-y-1"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'block' }}
                >
                  <h3 className="font-semibold mb-1 leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {card.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
