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
  const facts = {
    es: { title: 'Datos prácticos y gestión del sitio', location: 'Zona Arqueológica Guachimontones, Teuchitlán, Jalisco 46762, México', owner: 'La zona arqueológica se encuentra bajo la competencia del Instituto Nacional de Antropología e Historia (INAH); las condiciones de visita deben consultarse en su información oficial.', hours: 'Confirma el horario y los días de acceso en el INAH antes de viajar.', fee: 'Consulta las tarifas y posibles exenciones vigentes en el INAH.', transport: 'Desde Guadalajara toma la ruta hacia Teuchitlán y verifica el último tramo hasta la entrada arqueológica; el transporte regional puede requerir traslado adicional.', reviews: 'Las valoraciones y el número de reseñas cambian. Consulta la ficha de Google Maps para ver las cifras actuales.', map: 'Ubicación y reseñas en Google Maps', source: 'Datos oficiales del INAH' },
    en: { title: 'Essential details and site management', location: 'Guachimontones archaeological area, Teuchitlán, Jalisco 46762, Mexico', owner: 'The archaeological area falls under the authority of the National Institute of Anthropology and History (INAH). Refer to its official visitor guidance.', hours: 'Check current opening days and hours with INAH before visiting.', fee: 'Check current admission prices and exemptions with INAH.', transport: 'From Guadalajara travel toward Teuchitlán and confirm the final transfer to the archaeological entrance; regional transport may not stop at the gate.', reviews: 'Ratings and review counts change. Open Google Maps for the current figures.', map: 'Location and visitor reviews on Google Maps', source: 'Official INAH information' },
    zh: { title: '基本信息与管理主体', location: 'Guachimontones 考古区，Teuchitlán, Jalisco 46762, México', owner: '考古遗址属于墨西哥国家人类学与历史研究所（INAH）管辖范围，参观规则以官方说明为准。', hours: '出发前通过 INAH 核对开放日及开放时间。', fee: '通过 INAH 核对门票及优惠规定。', transport: '从瓜达拉哈拉前往特乌奇特兰后，确认前往考古区入口的最后一段交通；区域交通不一定直达入口。', reviews: '评分与评价数量会变化，请在 Google 地图查看实时数据。', map: '在 Google 地图查看位置及评价', source: 'INAH 官方信息' },
  }[locale as 'es' | 'en' | 'zh'];

  return (
    <>
      {/* Page header */}
      <section
        className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6"
        style={{ background: 'var(--color-nature-900)' }}
      >
        <div className="max-w-4xl mx-auto">
          <nav aria-label={messages.ui.breadcrumb} className="text-xs sm:text-sm mb-6 flex items-center gap-2 text-white/70">
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

          {facts && <section className="mt-12 p-6 sm:p-8 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{facts.title}</h2>
            <dl className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <div><dt className="font-semibold">{facts.location}</dt><dd>{facts.owner}</dd></div>
              <div><dt className="font-semibold">{locale === 'zh' ? '开放时间' : locale === 'es' ? 'Horarios' : 'Opening hours'}</dt><dd>{facts.hours}</dd></div>
              <div><dt className="font-semibold">{locale === 'zh' ? '门票' : locale === 'es' ? 'Boletos' : 'Admission'}</dt><dd>{facts.fee}</dd></div>
              <div><dt className="font-semibold">{locale === 'zh' ? '交通' : locale === 'es' ? 'Transporte' : 'Transport'}</dt><dd>{facts.transport}</dd></div>
              <div><dt className="font-semibold">{locale === 'zh' ? '游客评价' : locale === 'es' ? 'Reseñas' : 'Visitor reviews'}</dt><dd>{facts.reviews}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-5 mt-6 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              <a className="underline" href={SITE.mapsShortUrl} target="_blank" rel="noopener noreferrer">{facts.map}</a>
              <a className="underline" href={SITE.officialLinks.inahCatalogo} target="_blank" rel="noopener noreferrer">{facts.source}</a>
            </div>
          </section>}

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
