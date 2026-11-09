import cfg from './config.mjs';
import { T, LANGS, ROUTES, OG_LOCALE } from './i18n.mjs';
import { SYSTEMS, noteKey } from './products.mjs';
import { icon, sprite } from './art.mjs';

export { cfg };

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const fmt = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

export const routePath = (lang, route, slug = '') => ROUTES[route][lang].replace('{slug}', slug);
export const url = (lang, route, slug = '') => cfg.base + routePath(lang, route, slug);
export const absUrl = (lang, route, slug = '') => `${cfg.siteUrl}/${routePath(lang, route, slug)}`;
export const asset = (p) => cfg.base + p;
const BUILD = Date.now().toString(36); // ndryshon çdo build, që CSS/JS të rifreskohen te vizitorët

// ---------- Produkti: emra, nën-titull, paketimi ----------
export function pName(lang, p) { return T[lang].blendName[p.blend]; }
export function pSub(lang, p) {
  const t = T[lang];
  if (p.group === 'capsule') return p.system === 'opera' ? t.groupSub.opera : fmt(t.groupSub.capsule, { sys: SYSTEMS[p.system] });
  if (p.group === 'macinato') return t.groupSub.macinato[p.grind];
  return t.groupSub[p.group];
}
export const pFull = (lang, p) => `${pName(lang, p)} — ${pSub(lang, p)}`;
export function pPack(lang, p) {
  const t = T[lang];
  const k = p.pack;
  if (k.qty) {
    const base = fmt(t.packText[k.unit], { qty: k.qty });
    return k.per ? `${base} (${k.per})` : base;
  }
  if (k.weight?.kg) return `${k.weight.kg} kg`;
  if (k.weight?.g) return `${k.weight.g} g`;
  if (k.g) {
    const label = { tin: t.units.tin, bipack: 'Bipack', pack: '' }[k.form];
    return `${label ? label + ' ' : ''}${k.g} g`;
  }
  return '';
}
export const pNote = (lang, p) => T[lang].blendNote[noteKey(p)] || '';
export const pTag = (lang, p) => (p.system && p.group !== 'speciale' ? SYSTEMS[p.system] : T[lang].groups[p.group]);

const TONES = {
  'mistero-nero': '#F5CFC9', orocrema: '#FBD9A8', granbar: '#FCEBA0', honduras: '#D3E8CC', decaf: '#CFE3F4',
  intenso: '#F5CFC9', prestige: '#D9DBF0', 'miscela-bar': '#FBD9A8', premium: '#F5CFC9', espresso: '#FCEBA0', oro: '#FCEBA0',
  'honduras-moka': '#D3E8CC', 'honduras-espresso': '#D3E8CC', suave: '#CFE3F4',
};
export const blendFamily = (p) => (p.blend.startsWith('honduras') ? 'honduras' : p.blend === 'suave' ? 'decaf' : p.blend);
export const tone = (p) => TONES[p.blend] || '#F1E8D6';

export function waLink(text) {
  return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;
}
export const telLink = () => `tel:${cfg.phoneIntl}`;

export function meter(n) {
  if (!n) return '';
  let bars = '';
  for (let i = 1; i <= 10; i++) bars += `<i${i <= n ? ' class="on"' : ''}></i>`;
  return `<span class="meter" role="img" aria-label="${n}/10">${bars}</span>`;
}

// ---------- Komponentë të përbashkët ----------
export function productCard(lang, p, { lazy = true } = {}) {
  const t = T[lang];
  const name = pName(lang, p);
  const sub = pSub(lang, p);
  const msg = fmt(t.product.msg, { name: pFull(lang, p) });
  return `<article class="pcard reveal" data-group="${p.group}" data-system="${p.system || ''}" data-blend="${blendFamily(p)}" data-int="${p.intensity || 0}" data-name="${esc((name + ' ' + sub + ' ' + pTag(lang, p)).toLowerCase())}">
  <a class="pcard__media" href="${url(lang, 'product', p.slug)}" style="--tone:${tone(p)}" tabindex="-1" aria-hidden="true">
    <img src="${asset(p.img)}" alt="" width="320" height="320" ${lazy ? 'loading="lazy" decoding="async"' : ''}${p.id === 87586 ? ' class="multiply"' : ''}>
  </a>
  <div class="pcard__body">
    <p class="pcard__tag">${esc(pTag(lang, p))}</p>
    <h3 class="pcard__title"><a href="${url(lang, 'product', p.slug)}">${esc(name)}</a></h3>
    <p class="pcard__sub">${esc(sub)}</p>
    ${p.intensity ? `<p class="pcard__int"><span>${t.common.intensity}</span> ${meter(p.intensity)}</p>` : ''}
    <p class="pcard__pack">${esc(pPack(lang, p))}</p>
    <div class="pcard__actions">
      <a class="btn btn--sm btn--red" href="${waLink(msg)}" target="_blank" rel="noopener">${t.common.askOffer}</a>
      <a class="link-arrow" href="${url(lang, 'product', p.slug)}">${t.common.details}${icon('arrow', 'ic ic--sm')}</a>
    </div>
  </div>
</article>`;
}

export function sectionHead(kicker, title, lead = '', cls = '') {
  return `<header class="sec-head reveal ${cls}">
  ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
  <h2 class="h2">${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</header>`;
}

export function waButton(lang, text, label, cls = 'btn btn--wa') {
  return `<a class="${cls}" href="${waLink(text)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${label}</span></a>`;
}

// ---------- Header, footer, layout ----------
const NAV = [['home', 'home'], ['catalog', 'catalog'], ['business', 'business'], ['about', 'about'], ['contact', 'contact']];

function header(lang, route) {
  const t = T[lang];
  const links = NAV.map(([key, r]) => {
    const current = route === r || (route === 'product' && r === 'catalog');
    return `<a href="${url(lang, r)}"${current ? ' aria-current="page"' : ''}>${t.nav[key]}</a>`;
  }).join('');
  return `<a class="skip" href="#main">${t.nav.skip}</a>
<div class="topbar"><div class="wrap topbar__in">
  <a href="${url(lang, 'business')}" class="topbar__msg"><span class="pill pill--sm">${t.common.free}</span> ${t.offer.title.replace(/<br>/g, ' ')} <span class="u">→</span></a>
  <a href="${telLink()}" class="topbar__tel">${icon('phone', 'ic ic--sm')} ${cfg.phone}</a>
</div></div>
<header class="site-header" id="top">
  <div class="wrap site-header__in">
    <a class="brand" href="${url(lang, 'home')}" aria-label="${t.meta.siteName}">
      <img src="${asset('assets/img/brand/logo.webp')}" alt="Covim" width="132" height="83">
      <span class="brand__loc">${cfg.city}</span>
    </a>
    <nav class="nav" id="nav" aria-label="${t.nav.menu}">${links}</nav>
    <div class="site-header__tools">
      <div class="langs" role="group" aria-label="${t.nav.language}">${LANGS.map((l) => `<a href="${routeUrlFor.current ? routeUrlFor.current(l) : '#'}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('')}</div>
      <a class="btn btn--sm btn--red hide-sm" href="${telLink()}">${icon('phone', 'ic ic--sm')}${t.nav.call}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="${t.nav.menu}">${icon('menu')}${icon('x')}</button>
    </div>
  </div>
</header>`;
}

// Vendoset nga build para renderimit të çdo faqeje: (lang) => url i faqes ekuivalente.
export const routeUrlFor = { current: null };

function footer(lang, waText = '') {
  const t = T[lang];
  const wa = waLink(waText || t.common.waHello);
  const f = t.footer;
  const contactRows = [
    `<li><a href="${telLink()}">${icon('phone', 'ic ic--sm')}${cfg.phone}</a></li>`,
    `<li><a href="${wa}" target="_blank" rel="noopener">${icon('whatsapp', 'ic ic--sm')}WhatsApp</a></li>`,
    `<li><a href="https://instagram.com/${cfg.instagram}" target="_blank" rel="noopener">${icon('instagram', 'ic ic--sm')}@${cfg.instagram}</a></li>`,
    cfg.email ? `<li><a href="mailto:${cfg.email}">${icon('mail', 'ic ic--sm')}${cfg.email}</a></li>` : '',
    `<li><span>${icon('pin', 'ic ic--sm')}${cfg.address ? esc(cfg.address) : cfg.city}</span></li>`,
    cfg.hours ? `<li><span>${icon('clock', 'ic ic--sm')}${esc(cfg.hours)}</span></li>` : '',
  ].join('');
  return `<footer class="site-footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <img src="${asset('assets/img/brand/logo.webp')}" alt="Covim" width="150" height="94" loading="lazy">
      <p class="footer__tag">${f.tagline}</p>
      <p>${f.official}</p>
    </div>
    <div><h3>${f.nav}</h3><ul>${NAV.map(([k, r]) => `<li><a href="${url(lang, r)}">${t.nav[k]}</a></li>`).join('')}</ul></div>
    <div><h3>${f.contact}</h3><ul class="footer__contact">${contactRows}</ul></div>
    <div><h3>${t.catalog.kicker}</h3><ul>
      ${['capsule', 'bustine', 'grani', 'macinato'].map((g) => `<li><a href="${url(lang, 'catalog')}?g=${g}">${t.groups[g]}</a></li>`).join('')}
    </ul></div>
  </div>
  <div class="wrap footer__legal">
    <p>${f.trademarks}</p>
    <p>© ${new Date().getFullYear()} ${t.meta.siteName}. ${f.rights} ${f.noCookies}</p>
  </div>
</footer>
<div class="dock" role="group">
  <a class="dock__call" href="${telLink()}">${icon('phone')}<span>${t.nav.call}</span></a>
  <a class="dock__wa" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')}<span>WhatsApp</span></a>
</div>`;
}

export function layout({ lang, route, slug = '', meta, body, jsonld = [], ogImage = 'assets/img/brand/og.jpg', bodyClass = '', noindex = false, waText = '' }) {
  const t = T[lang];
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${absUrl(l, route, slug)}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${absUrl('sq', route, slug)}">`;
  const canonical = absUrl(lang, route, slug);
  const img = `${cfg.siteUrl}/${ogImage}`;
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<script>document.documentElement.className+=" js"</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}">
<meta name="theme-color" content="#E4231C">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${canonical}">
${alternates}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(t.meta.siteName)}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${OG_LOCALE[lang]}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${asset('assets/img/brand/favicon.png')}" type="image/png">
<link rel="apple-touch-icon" href="${asset('assets/img/brand/apple-touch-icon.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap">
<link rel="stylesheet" href="${asset('assets/css/styles.css')}?v=${BUILD}">
${ld}
</head>
<body class="${bodyClass}" data-lang="${lang}">
${sprite}
${header(lang, route)}
<main id="main">
${body}
</main>
${footer(lang, waText)}
<script src="${asset('assets/js/main.js')}?v=${BUILD}" defer></script>
</body>
</html>`;
}

export function localBusinessLd(lang) {
  const t = T[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: t.meta.siteName,
    description: t.meta.home.desc,
    url: `${cfg.siteUrl}/`,
    telephone: cfg.phoneIntl,
    image: `${cfg.siteUrl}/assets/img/brand/og.jpg`,
    brand: { '@type': 'Brand', name: 'Covim Caffè' },
    address: { '@type': 'PostalAddress', addressLocality: 'Tiranë', addressCountry: 'AL', ...(cfg.address ? { streetAddress: cfg.address } : {}) },
    areaServed: 'Tiranë',
    sameAs: [`https://instagram.com/${cfg.instagram}`],
  };
}
