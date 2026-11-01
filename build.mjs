// Ndërton faqen statike në dist/. Pa varësi: node build.mjs
import { rmSync, mkdirSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, ROUTES } from './src/i18n.mjs';
import { visible } from './src/products.mjs';
import { routeUrlFor, url, absUrl, routePath, cfg } from './src/lib.mjs';
import * as pages from './src/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
if (existsSync(join(root, 'public'))) cpSync(join(root, 'public'), dist, { recursive: true });

const entries = []; // për sitemap: { route, slug }
let count = 0;

function emit(lang, route, slug, html) {
  const rel = routePath(lang, route, slug);
  const file = join(dist, rel, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  count++;
}

for (const lang of LANGS) {
  const render = (route, slug, fn) => {
    routeUrlFor.current = (l) => url(l, route, slug);
    emit(lang, route, slug, fn());
  };
  render('home', '', () => pages.home(lang));
  render('catalog', '', () => pages.catalog(lang));
  render('business', '', () => pages.business(lang));
  render('about', '', () => pages.about(lang));
  render('contact', '', () => pages.contact(lang));
  for (const p of visible()) render('product', p.slug, () => pages.product(lang, p));
}

entries.push(...['home', 'catalog', 'business', 'about', 'contact'].map((route) => ({ route, slug: '' })));
entries.push(...visible().map((p) => ({ route: 'product', slug: p.slug })));

// 404 (sq) në rrënjë
routeUrlFor.current = (l) => url(l, 'home');
writeFileSync(join(dist, '404.html'), pages.notFound('sq'));

// sitemap me hreflang
const urlsXml = entries.flatMap(({ route, slug }) => LANGS.map((lang) => {
  const alts = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(l, route, slug)}"/>`).join('')
    + `<xhtml:link rel="alternate" hreflang="x-default" href="${absUrl('sq', route, slug)}"/>`;
  const prio = route === 'home' ? '1.0' : route === 'product' ? '0.6' : '0.8';
  return `<url><loc>${absUrl(lang, route, slug)}</loc>${alts}<priority>${prio}</priority></url>`;
})).join('\n');
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlsXml}\n</urlset>\n`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);
writeFileSync(join(dist, '.nojekyll'), '');
if (process.env.CNAME) writeFileSync(join(dist, 'CNAME'), process.env.CNAME + '\n');

console.log(`OK: ${count} faqe + 404 + sitemap (${entries.length * LANGS.length} URL) -> dist/  [base=${cfg.base}, site=${cfg.siteUrl}]`);
