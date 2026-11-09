import { T } from './i18n.mjs';
import { products, visible, bySlug, related, FEATURED, SYSTEMS, SYSTEM_COMPAT, GROUPS } from './products.mjs';
import { icon, heroArt, frogArt, classyArt, beanPattern } from './art.mjs';
import {
  cfg, esc, fmt, url, absUrl, asset, layout, productCard, sectionHead, waLink, waButton, telLink, meter,
  pName, pSub, pFull, pPack, pNote, pTag, tone, localBusinessLd,
} from './lib.mjs';

const arrow = icon('arrow', 'ic ic--sm');

// ---------------------------------------------------------------- përbërës të ripërdorshëm
function marquee(items) {
  const row = items.map((x) => `<span>${esc(x)}</span><i aria-hidden="true"><svg viewBox="0 0 40 60" width="12" height="18"><use href="#bean"/></svg></i>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee__track">${row}${row}${row}${row}</div></div>`;
}

function contactForm(lang) {
  const t = T[lang].form;
  return `<form class="form" data-wa="${cfg.whatsapp}" data-msg="${esc(t.msg)}" data-required="${esc(t.required)}" novalidate>
  <h3 class="form__title">${t.title}</h3>
  <div class="form__row">
    <label>${t.name}<input name="name" required autocomplete="name"></label>
    <label>${t.phone}<input name="phone" type="tel" required autocomplete="tel" inputmode="tel"></label>
  </div>
  <label>${t.type}<select name="type">${t.types.map((x) => `<option>${esc(x)}</option>`).join('')}</select></label>
  <label>${t.message}<textarea name="message" rows="3"></textarea></label>
  <p class="form__err" role="alert" hidden></p>
  <button class="btn btn--wa btn--lg" type="submit">${icon('whatsapp')}<span>${t.send}</span></button>
  <p class="form__hint">${t.hint}</p>
</form>`;
}

function offerSection(lang, { heading = true } = {}) {
  const t = T[lang].offer;
  const steps = t.steps.map((s, i) => `<li class="step reveal"><span class="step__n">${i + 1}</span><div><h4>${s.t}</h4><p>${s.d}</p></div></li>`).join('');
  return `<section class="offer section" id="falas">
  <div class="wrap offer__grid">
    <div class="offer__text reveal">
      <span class="pill">${t.badge}</span>
      <h2 class="h2 h2--xl">${t.title}</h2>
      <p class="offer__lead">${t.lead}</p>
      ${heading ? `<a class="btn btn--red btn--lg" href="${waLink(T[lang].business.ctaMsg)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t.cta}</span></a>` : ''}
    </div>
    <div class="offer__machines">
      <figure class="machine-card reveal">${frogArt()}<figcaption><strong>${t.machines[0].name}</strong><span>${t.machines[0].for}</span></figcaption></figure>
      <figure class="machine-card machine-card--b reveal">${classyArt()}<figcaption><strong>${t.machines[1].name}</strong><span>${t.machines[1].for}</span></figcaption></figure>
    </div>
  </div>
  <div class="wrap">
    <h3 class="steps__title reveal">${t.stepsTitle}</h3>
    <ol class="steps">${steps}</ol>
    <p class="offer__note">${t.note}</p>
  </div>
</section>`;
}

function segmentCards(lang) {
  return `<div class="seg-grid">${T[lang].segments.list.map((s) => `<article class="seg reveal">${icon(s.i, 'ic ic--lg')}<h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div>`;
}

const imgOf = (slug) => bySlug(slug)?.img;

// ---------------------------------------------------------------- BALLINA
export function home(lang) {
  const t = T[lang];
  const catalogUrl = url(lang, 'catalog');

  const hero = `<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <p class="kicker kicker--ink">${t.hero.kicker}</p>
      <h1 class="display">${t.hero.title}</h1>
      <p class="hero__sub">${t.hero.sub}</p>
      <p class="hero__lead">${t.hero.lead}</p>
      <div class="btn-row">
        <a class="btn btn--ink btn--lg" href="${catalogUrl}">${t.hero.cta1}${arrow}</a>
        <a class="btn btn--white btn--lg" href="${url(lang, 'home')}#falas">${t.hero.cta2}</a>
      </div>
    </div>
    <div class="hero__art">${heroArt()}<div class="stamp"><span>${t.hero.badge}</span></div></div>
  </div>
  ${marquee(t.marquee)}
</section>`;

  const story = `<section class="story section">
  <div class="wrap story__grid">
    <div class="reveal">
      <p class="kicker">${t.story.kicker}</p>
      <h2 class="h2 h2--xl">${t.story.title}</h2>
      <p class="story__text">${t.story.text}</p>
      <a class="btn btn--ink" href="${url(lang, 'about')}">${t.story.cta}${arrow}</a>
    </div>
    <ul class="stats reveal">${t.story.stats.map((s) => `<li><b data-count="${s.n}" data-suffix="${s.s}">${s.n}${s.s}</b><span>${s.l}</span></li>`).join('')}</ul>
  </div>
  ${beanPattern()}
</section>`;

  const offer = offerSection(lang);

  const tiles = [
    ['nespresso', 'nespresso-orocrema', 'Nespresso®', 'Original'],
    ['dolcegusto', 'dolcegusto-granbar', 'Dolce Gusto®', ''],
    ['amodomio', 'amodomio-orocrema', 'A Modo Mio®', ''],
    ['espressopoint', 'espressopoint-orocrema', 'Espresso Point®', ''],
    ['opera', 'opera-orocrema', 'Covim Opera', 'Lavazza Blue®'],
  ].map(([sys, slug, name, sub]) => `<a class="tile reveal" href="${catalogUrl}?s=${sys}"><img src="${asset(imgOf(slug))}" alt="" width="200" height="200" loading="lazy"><strong>${name}</strong>${sub ? `<span>${sub}</span>` : '<span>&nbsp;</span>'}</a>`).join('');
  const compat = `<section class="compat section section--dark">
  <div class="wrap">
    ${sectionHead(t.compat.kicker, t.compat.title, t.compat.lead, 'sec-head--light')}
    <p class="finder-label reveal">${t.compat.finder}</p>
    <div class="tiles">
      ${tiles}
      <a class="tile reveal" href="${catalogUrl}?g=bustine"><img src="${asset(imgOf('bustina-orocrema'))}" alt="" width="200" height="200" loading="lazy"><strong>${t.compat.pods}</strong><span>${t.compat.podsSub}</span></a>
    </div>
  </div>
</section>`;

  const blendColor = { 'mistero-nero': 'ink', orocrema: 'red', granbar: 'yellow', honduras: 'green', decaf: 'blue' };
  const blends = `<section class="blends section">
  <div class="wrap">
    ${sectionHead(t.blends.kicker, t.blends.title, t.blends.lead)}
    <div class="blend-row">
      ${t.blends.list.map((b) => {
        const p = bySlug(`nespresso-${b}`);
        return `<a class="blend blend--${blendColor[b]} reveal" href="${catalogUrl}?b=${b}">
          <div class="blend__txt"><h3>${t.blendName[b]}</h3><p>${t.blendNote[b]}</p><div class="blend__int"><span>${t.common.intensity}</span>${meter(p.intensity)}</div></div>
          <img src="${asset(p.img)}" alt="" width="260" height="260" loading="lazy">
        </a>`;
      }).join('')}
    </div>
  </div>
</section>`;

  const featured = FEATURED.map((s) => bySlug(s)).filter(Boolean);
  const fSection = `<section class="featured section section--cream">
  <div class="wrap">
    <div class="featured__top">
      ${sectionHead(t.featured.kicker, t.featured.title)}
      <div class="carousel-nav"><button type="button" data-car="prev" aria-label="${t.common.prev}">${icon('arrow')}</button><button type="button" data-car="next" aria-label="${t.common.next}">${icon('arrow')}</button></div>
    </div>
  </div>
  <div class="carousel" tabindex="0"><div class="carousel__track">${featured.map((p) => productCard(lang, p)).join('')}</div></div>
  <div class="wrap center"><a class="btn btn--ink btn--lg" href="${catalogUrl}">${t.featured.cta}${arrow}</a></div>
</section>`;

  const bagSlugs = ['grani-intenso', 'grani-prestige', 'grani-miscela-bar', 'grani-honduras', 'grani-decaf'];
  const beans = `<section class="beans section">
  <div class="wrap beans__grid">
    <div class="beans__text reveal">
      <p class="kicker kicker--ink">${t.beans.kicker}</p>
      <h2 class="h2 h2--xl">${t.beans.title}</h2>
      <p>${t.beans.lead}</p>
      <ul class="chips-static">${['Miscela Bar', 'Intenso', 'Prestige', 'Honduras 100% Arabica', 'Decaffeinato'].map((x) => `<li>${x}</li>`).join('')}</ul>
      <a class="btn btn--ink btn--lg" href="${catalogUrl}?g=grani">${t.beans.cta}${arrow}</a>
    </div>
    <div class="shelf reveal">${bagSlugs.map((s, i) => { const p = bySlug(s); return `<a href="${url(lang, 'product', s)}" class="bag bag--${i + 1}"><img src="${asset(p.img)}" alt="${esc(pFull(lang, p))}" width="300" height="300" loading="lazy"${p.id === 87586 ? ' class="multiply"' : ''}></a>`; }).join('')}</div>
  </div>
</section>`;

  const segments = `<section class="segments section">
  <div class="wrap">
    ${sectionHead(t.segments.kicker, t.segments.title)}
    ${segmentCards(lang)}
    <div class="center"><a class="btn btn--red btn--lg" href="${url(lang, 'business')}">${t.segments.cta}${arrow}</a></div>
  </div>
</section>`;

  const social = `<section class="social section section--ink">
  <div class="wrap social__in reveal">
    <div><p class="kicker kicker--yellow">${t.social.kicker}</p><h2 class="h2">${t.social.title}</h2></div>
    <a class="social__handle" href="https://instagram.com/${cfg.instagram}" target="_blank" rel="noopener">${icon('instagram', 'ic ic--lg')}<span>@${cfg.instagram}</span></a>
    <a class="btn btn--yellow btn--lg" href="https://instagram.com/${cfg.instagram}" target="_blank" rel="noopener">${t.social.cta}${arrow}</a>
  </div>
</section>`;

  const band = contactBand(lang);

  return layout({
    lang, route: 'home', meta: t.meta.home,
    jsonld: [localBusinessLd(lang)],
    body: [hero, story, offer, compat, blends, fSection, beans, segments, social, band].join('\n'),
  });
}

export function contactBand(lang) {
  const t = T[lang];
  return `<section class="cband section" id="kontakt">
  <div class="wrap cband__grid">
    <div class="cband__text reveal">
      <p class="kicker kicker--white">${t.contactBand.kicker}</p>
      <a class="cband__phone" href="${telLink()}">${cfg.phone}</a>
      <p class="cband__city">${icon('pin', 'ic ic--sm')} ${t.contactBand.city} · ${icon('instagram', 'ic ic--sm')} @${cfg.instagram}</p>
      <h2 class="h2">${t.contactBand.title}</h2>
      <p class="lead">${t.contactBand.lead}</p>
      <div class="btn-row">
        <a class="btn btn--white btn--lg" href="${telLink()}">${icon('phone')}<span>${t.common.callNow}</span></a>
        ${waButton(lang, t.common.waHello, t.common.whatsapp, 'btn btn--wa btn--lg')}
      </div>
    </div>
    <div class="reveal">${contactForm(lang)}</div>
  </div>
</section>`;
}

// ---------------------------------------------------------------- KATALOGU
export function catalog(lang) {
  const t = T[lang];
  const items = visible();
  const counts = Object.fromEntries(GROUPS.map((g) => [g, items.filter((p) => p.group === g).length]));
  const tabs = [`<button type="button" class="tab is-on" data-g="all">${t.catalog.all} <small>${items.length}</small></button>`]
    .concat(GROUPS.filter((g) => counts[g]).map((g) => `<button type="button" class="tab" data-g="${g}">${t.groups[g]} <small>${counts[g]}</small></button>`)).join('');
  const sysChips = ['nespresso', 'dolcegusto', 'amodomio', 'espressopoint', 'opera'].map((s) => `<button type="button" class="chip" data-s="${s}">${SYSTEMS[s]}</button>`).join('');
  const blendChips = t.blends.list.map((b) => `<button type="button" class="chip" data-b="${b}">${t.blendName[b]}</button>`).join('');

  const body = `<section class="page-hero page-hero--yellow">
  <div class="wrap"><p class="kicker kicker--ink">${t.catalog.kicker}</p><h1 class="display display--md">${t.catalog.title}</h1><p class="page-hero__lead">${t.catalog.lead}</p></div>
  ${beanPattern()}
</section>
<section class="section catalog" data-catalog data-count="${esc(t.catalog.count)}" data-count-one="${esc(t.catalog.countOne)}">
  <div class="wrap">
    <div class="filters">
      <div class="tabs" role="group">${tabs}</div>
      <div class="filters__row">
        <label class="search"><span class="sr">${t.catalog.search}</span>${icon('chevron', 'ic ic--sm search__ic')}<input type="search" placeholder="${esc(t.catalog.search)}" data-q></label>
        <label class="sort"><span class="sr">${t.catalog.sort}</span><select data-sort><option value="">${t.catalog.sortDefault}</option><option value="high">${t.catalog.sortHigh}</option><option value="low">${t.catalog.sortLow}</option></select></label>
      </div>
      <div class="chip-line"><span class="chip-line__label">${t.catalog.system}</span><div class="chips">${sysChips}</div></div>
      <div class="chip-line"><span class="chip-line__label">${t.catalog.blend}</span><div class="chips">${blendChips}</div></div>
      <p class="count" aria-live="polite" data-count-out>${fmt(t.catalog.count, { n: items.length })}</p>
    </div>
    <div class="grid" data-grid>${items.map((p, i) => productCard(lang, p, { lazy: i > 7 })).join('')}</div>
    <div class="empty" data-empty hidden>
      <p>${t.catalog.empty}</p>
      <div class="btn-row center"><button type="button" class="btn btn--ink" data-reset>${t.catalog.reset}</button>${waButton(lang, t.common.waHello, t.catalog.emptyCta)}</div>
    </div>
    <p class="catalog__note">${t.catalog.note}</p>
  </div>
</section>`;

  return layout({
    lang, route: 'catalog', meta: t.meta.catalog, body,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'ItemList', name: t.catalog.title,
      itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(lang, 'product', p.slug), name: pFull(lang, p) })),
    }],
  });
}

// ---------------------------------------------------------------- PRODUKTI
export function product(lang, p) {
  const t = T[lang];
  const pt = t.product;
  const name = pName(lang, p);
  const sub = pSub(lang, p);
  const msg = fmt(pt.msg, { name: pFull(lang, p) + ` (${pPack(lang, p)})` });
  const specs = [
    p.system && p.group !== 'speciale' ? [pt.system, SYSTEM_COMPAT[p.system] ? `${SYSTEMS[p.system]} (${SYSTEM_COMPAT[p.system]})` : SYSTEMS[p.system]] : p.group === 'speciale' ? [pt.system, SYSTEMS.dolcegusto] : null,
    [pt.pack, pPack(lang, p)],
    p.mix ? [pt.mix, t.mixLabel[p.mix]] : null,
    p.grind ? [pt.grind, t.grindLabel[p.grind]] : null,
    p.bio ? [pt.organic, pt.yes] : null,
  ].filter(Boolean);
  const rel = related(p, 4);
  const crumbs = `<nav class="crumbs" aria-label="breadcrumb"><a href="${url(lang, 'home')}">${t.nav.home}</a><span>/</span><a href="${url(lang, 'catalog')}">${pt.back}</a><span>/</span><a href="${url(lang, 'catalog')}?g=${p.group}">${t.groups[p.group]}</a></nav>`;

  const body = `<section class="pdp section">
  <div class="wrap">
    ${crumbs}
    <div class="pdp__grid">
      <div class="pdp__media reveal" style="--tone:${tone(p)}"><img src="${asset(p.img)}" alt="${esc(pFull(lang, p))}" width="640" height="640"${p.id === 87586 ? ' class="multiply"' : ''}></div>
      <div class="pdp__info reveal">
        <p class="kicker">${esc(pTag(lang, p))}</p>
        <h1 class="display display--md">${esc(name)}</h1>
        <p class="pdp__sub">${esc(sub)}</p>
        ${p.intensity ? `<p class="pdp__int"><span>${pt.intensity}</span>${meter(p.intensity)}<b>${p.intensity}/10</b></p>` : ''}
        <h2 class="h4">${pt.notes}</h2>
        <p class="pdp__note">${pNote(lang, p)}</p>
        <dl class="specs">${specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        <p class="pdp__price"><span class="pill pill--ink">${t.common.priceOnRequest}</span> ${pt.priceNote}</p>
        <div class="btn-row">
          <a class="btn btn--wa btn--lg" href="${waLink(msg)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${pt.ask}</span></a>
          <a class="btn btn--ink btn--lg" href="${telLink()}">${icon('phone')}<span>${pt.callUs} ${cfg.phone}</span></a>
        </div>
        ${p.system && p.group !== 'speciale' && p.group !== 'bustine' ? `<p class="pdp__legal">${fmt(pt.compatNote, { sys: SYSTEM_COMPAT[p.system] || SYSTEMS[p.system] })}</p>` : ''}
      </div>
    </div>
  </div>
</section>
<section class="section section--cream">
  <div class="wrap">
    ${sectionHead('', pt.related)}
    <div class="grid grid--4">${rel.map((r) => productCard(lang, r)).join('')}</div>
  </div>
</section>`;

  return layout({
    lang, route: 'product', slug: p.slug,
    meta: { title: `${name} · ${sub} | ${t.meta.siteName}`, desc: `${pFull(lang, p)}. ${pNote(lang, p)} ${pt.priceNote}` },
    ogImage: p.img, body, waText: msg,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'Product', name: pFull(lang, p), sku: String(p.id),
      image: `${cfg.siteUrl}/${p.img}`, description: pNote(lang, p), brand: { '@type': 'Brand', name: 'Covim' },
      category: t.groups[p.group],
    }],
  });
}

// ---------------------------------------------------------------- PËR BIZNESE
export function business(lang) {
  const t = T[lang];
  const b = t.business;
  const hero = `<section class="page-hero page-hero--ink">
  <div class="wrap page-hero__grid">
    <div><p class="kicker kicker--yellow">${b.kicker}</p><h1 class="display display--md">${b.title}</h1><p class="page-hero__lead">${b.lead}</p>
      <div class="btn-row"><a class="btn btn--yellow btn--lg" href="${waLink(b.ctaMsg)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${b.cta}</span></a><a class="btn btn--white btn--lg" href="${telLink()}">${icon('phone')}<span>${cfg.phone}</span></a></div></div>
    <div class="page-hero__art">${frogArt()}</div>
  </div>
</section>`;
  const segs = `<section class="section"><div class="wrap">${sectionHead('', b.segTitle)}${segmentCards(lang)}</div></section>`;
  const benefits = `<section class="section section--cream"><div class="wrap">${sectionHead('', b.benefitsTitle)}
    <ul class="benefits">${b.benefits.map((x) => `<li class="reveal">${icon('check', 'ic ic--lg ic--red')}<div><h3>${x.t}</h3><p>${x.d}</p></div></li>`).join('')}</ul></div></section>`;
  const faq = `<section class="section"><div class="wrap wrap--narrow">${sectionHead('', b.faqTitle)}
    <div class="faq">${b.faq.map((f) => `<details class="reveal"><summary>${f.q}${icon('chevron')}</summary><p>${f.a}</p></details>`).join('')}</div></div></section>`;
  return layout({
    lang, route: 'business', meta: t.meta.business, waText: b.ctaMsg,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: b.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }],
    body: [hero, segs, offerSection(lang, { heading: false }), benefits, faq, contactBand(lang)].join('\n'),
  });
}

// ---------------------------------------------------------------- RREth NESH
export function about(lang) {
  const t = T[lang];
  const a = t.about;
  const hero = `<section class="page-hero page-hero--red"><div class="wrap"><p class="kicker kicker--white">${a.kicker}</p><h1 class="display">${a.title}</h1><p class="page-hero__lead">${a.lead}</p></div>${beanPattern()}</section>`;
  const blocks = `<section class="section"><div class="wrap about__blocks">${a.blocks.map((b, i) => `<article class="about__block reveal"><span class="about__n">0${i + 1}</span><h2 class="h3">${b.t}</h2><p>${b.d}</p></article>`).join('')}</div></section>`;
  const hon = bySlug('grani-honduras');
  const honduras = `<section class="section section--green"><div class="wrap about__hon">
    <div class="reveal"><p class="kicker kicker--white">100% Arabica · Bio</p><h2 class="h2 h2--xl">${a.honduras.t}</h2><p class="lead">${a.honduras.d}</p><a class="btn btn--white btn--lg" href="${url(lang, 'catalog')}?b=honduras">${t.common.viewCatalog}${arrow}</a></div>
    <img class="reveal" src="${asset(hon.img)}" alt="${esc(pFull(lang, hon))}" width="420" height="420" loading="lazy"></div></section>`;
  const voice = `<section class="section"><div class="wrap center">${sectionHead('', a.voiceTitle)}<ul class="voice reveal">${a.voice.map((v) => `<li>${v}</li>`).join('')}</ul></div></section>`;
  const tirana = `<section class="section section--ink"><div class="wrap about__tirana reveal"><span class="pill">${t.common.official}</span><h2 class="h2 h2--xl">${a.tirana.t}</h2><p class="lead">${a.tirana.d}</p><a class="btn btn--yellow btn--lg" href="${url(lang, 'contact')}">${a.tirana.cta}${arrow}</a></div></section>`;
  return layout({ lang, route: 'about', meta: t.meta.about, body: [hero, blocks, honduras, voice, tirana].join('\n') });
}

// ---------------------------------------------------------------- KONTAKT
export function contact(lang) {
  const t = T[lang];
  const c = t.contact;
  const rows = [
    [icon('phone'), c.phone, `<a href="${telLink()}">${cfg.phone}</a>`],
    [icon('whatsapp'), c.whatsapp, `<a href="${waLink(t.common.waHello)}" target="_blank" rel="noopener">${cfg.phone}</a>`],
    [icon('instagram'), c.instagram, `<a href="https://instagram.com/${cfg.instagram}" target="_blank" rel="noopener">@${cfg.instagram}</a>`],
    [icon('pin'), cfg.address ? c.address : c.city, esc(cfg.address || cfg.city)],
    cfg.email ? [icon('mail'), c.email, `<a href="mailto:${cfg.email}">${cfg.email}</a>`] : null,
    cfg.hours ? [icon('clock'), c.hours, esc(cfg.hours)] : null,
  ].filter(Boolean);
  const body = `<section class="page-hero page-hero--yellow"><div class="wrap"><p class="kicker kicker--ink">${c.kicker}</p><h1 class="display display--md">${c.title}</h1><p class="page-hero__lead">${c.lead}</p></div>${beanPattern()}</section>
<section class="section"><div class="wrap contact__grid">
  <div class="reveal">
    <ul class="contact__list">${rows.map(([ic, k, v]) => `<li><span class="contact__ic">${ic}</span><div><small>${k}</small><b>${v}</b></div></li>`).join('')}</ul>
    <h2 class="h4">${c.help}</h2>
    <ul class="ticks">${c.helpList.map((x) => `<li>${icon('check', 'ic ic--sm ic--red')}${x}</li>`).join('')}</ul>
  </div>
  <div class="reveal">${contactForm(lang)}</div>
</div></section>`;
  return layout({ lang, route: 'contact', meta: t.meta.contact, body, jsonld: [localBusinessLd(lang)] });
}

// ---------------------------------------------------------------- 404
export function notFound(lang) {
  const t = T[lang];
  const body = `<section class="section nf"><div class="wrap center"><p class="display">404</p><h1 class="h2">${t.notFound.title}</h1><p class="lead">${t.notFound.text}</p><a class="btn btn--red btn--lg" href="${url(lang, 'home')}">${t.notFound.cta}</a></div></section>`;
  return layout({ lang, route: 'home', meta: t.meta.notFound, body, noindex: true });
}
