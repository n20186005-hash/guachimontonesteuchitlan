const fs = require('fs');
const f = fs.readFileSync('out/es.html', 'utf8');
const v = fs.readFileSync('out/es/visitor-guide.html', 'utf8');
console.log('ldjson type count (home):', (f.match(/type="application\/ld\+json"/g) || []).length);
console.log('ldjson type count (guide):', (v.match(/type="application\/ld\+json"/g) || []).length);
console.log('hreflang es:', f.includes('hreflang="es"'));
console.log('hreflang zh:', f.includes('hreflang="zh"'));
console.log('hreflang en:', f.includes('hreflang="en"'));
console.log('hreflang x-default:', f.includes('hreflang="x-default"'));
const m = f.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (m) {
  try {
    const arr = JSON.parse(m[1]);
    console.log('home schema count:', arr.length);
    console.log(
      'home schema types:',
      arr.map((x) => (Array.isArray(x['@type']) ? x['@type'].join('+') : x['@type'])).join(' | ')
    );
    const faq = arr.find((x) => x['@type'] === 'FAQPage');
    console.log('faq items:', faq ? faq.mainEntity.length : 0);
  } catch (e) {
    console.log('parse err', e.message);
  }
}
const v2 = v.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (v2) {
  try {
    const arr = JSON.parse(v2[1]);
    console.log('guide schema count:', arr.length);
    console.log(
      'guide schema types:',
      arr.map((x) => (Array.isArray(x['@type']) ? x['@type'].join('+') : x['@type'])).join(' | ')
    );
  } catch (e) {
    console.log('guide parse err', e.message);
  }
}
