const fs = require('fs');
const f = fs.readFileSync('out/es.html', 'utf8');
const g = fs.readFileSync('out/es/visitor-guide.html', 'utf8');
const h = fs.readFileSync('out/es/history.html', 'utf8');
const d = fs.readFileSync('out/en/getting-there.html', 'utf8');
const out = {
  esTitle: (f.match(/<title>([^<]*)</) || [])[1],
  ldCountHome: (f.match(/application\/ld\+json/g) || []).length,
  hasFAQ: f.includes('FAQPage'),
  hasTourist: f.includes('"ArchaeologicalSite"'),
  hubSection: f.includes('id="guias"'),
  faqVisible: f.includes('id="faq"'),
  ogImage: (f.match(/property="og:image" content="([^"]*)"/) || [])[1],
  canonical: (f.match(/rel="canonical" href="([^"]*)"/) || [])[1],
  gaTag: (f.match(/gtag\/js\?id=([^"&]*)"/) || [])[1],
  hreflangXDefault: (f.match(/rel="alternate" hreflang="x-default" href="([^"]*)"/) || [])[1],
  homeLinkToVisitor: f.includes('/es/visitor-guide'),
  mapCtaGettingThere: f.includes('href="/es/getting-there"'),
  guideTitle: (g.match(/<title>([^<]*)</) || [])[1],
  guideLd: (g.match(/application\/ld\+json/g) || []).length,
  guideBreadcrumb: g.includes('BreadcrumbList'),
  guideWebPage: g.includes('"WebPage"'),
  historyTitle: (h.match(/<title>([^<]*)</) || [])[1],
  enGettingTitle: (d.match(/<title>([^<]*)</) || [])[1],
  enGettingMetaDesc: (d.match(/name="description" content="([^"]*)"/) || [])[1],
  homeH1: ((f.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim().slice(0, 80),
};
console.log(JSON.stringify(out, null, 2));
