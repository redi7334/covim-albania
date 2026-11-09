(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- header + menu mobile ----------
  const header = $('.site-header');
  const nav = $('#nav');
  const burger = $('.burger');
  const setHdr = () => {
    const top = $('.topbar');
    const h = header.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty('--hdr', Math.max(h, header.offsetHeight) + 'px');
    void top;
  };
  setHdr();
  addEventListener('resize', setHdr, { passive: true });
  addEventListener('scroll', setHdr, { passive: true });
  const closeMenu = () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    setHdr();
  });
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ---------- reveal ----------
  let pending = $$('.reveal');
  // pas animacionit klasa reveal hiqet, që efektet hover të kartave të punojnë normalisht
  const settle = (el) => {
    let done = false;
    const end = () => { if (done) return; done = true; el.classList.remove('reveal', 'is-in'); el.style.transitionDelay = ''; };
    el.addEventListener('transitionend', (e) => { if (e.target === el && e.propertyName === 'opacity') end(); });
    setTimeout(end, 3000);
  };
  const revealCheck = () => {
    const limit = innerHeight * 0.92;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('is-in'); settle(el); return false; }
      return true;
    });
    if (!pending.length) { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); }
  };
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; setTimeout(() => { ticking = false; revealCheck(); }, 40); } };
  if (reduce) pending.forEach((el) => el.classList.add('is-in'));
  else {
    pending.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    revealCheck();
    setTimeout(revealCheck, 400);
  }

  // ---------- numëruesit ----------
  const counters = $$('[data-count]').filter((el) => el.tagName === 'B');
  if (counters.length && 'IntersectionObserver' in window && !reduce) {
    const co = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        co.unobserve(en.target);
        const el = en.target; const end = +el.dataset.count; const suf = el.dataset.suffix || '';
        const t0 = performance.now(); const dur = 1400;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  // ---------- karusel ----------
  const car = $('.carousel');
  if (car) {
    $$('[data-car]').forEach((b) => b.addEventListener('click', () => {
      const w = (car.querySelector('.pcard')?.offsetWidth || 280) + 18;
      car.scrollBy({ left: (b.dataset.car === 'next' ? 1 : -1) * w * 2, behavior: 'smooth' });
    }));
  }

  // ---------- katalogu: filtra ----------
  const cat = $('[data-catalog]');
  if (cat) {
    const cards = $$('.pcard', cat);
    const grid = $('[data-grid]', cat);
    const out = $('[data-count-out]', cat);
    const empty = $('[data-empty]', cat);
    const q = $('[data-q]', cat);
    const sort = $('[data-sort]', cat);
    const state = { g: 'all', s: '', b: '', q: '', sort: '' };
    const orig = cards.slice();
    const params = new URLSearchParams(location.search);
    state.g = params.get('g') || 'all'; state.s = params.get('s') || ''; state.b = params.get('b') || ''; state.q = params.get('q') || ''; state.sort = params.get('o') || '';
    q.value = state.q; sort.value = state.sort;

    const apply = () => {
      const term = state.q.trim().toLowerCase();
      let n = 0;
      cards.forEach((c) => {
        const ok = (state.g === 'all' || c.dataset.group === state.g)
          && (!state.s || c.dataset.system === state.s)
          && (!state.b || c.dataset.blend === state.b)
          && (!term || c.dataset.name.includes(term));
        c.hidden = !ok;
        if (ok) { n++; c.classList.add('is-in'); }
      });
      const order = state.sort === 'high' ? (a, b) => b.dataset.int - a.dataset.int : state.sort === 'low' ? (a, b) => (a.dataset.int || 99) - (b.dataset.int || 99) : null;
      const list = order ? orig.slice().sort(order) : orig;
      list.forEach((c) => grid.appendChild(c));
      $$('.tab', cat).forEach((t) => t.classList.toggle('is-on', t.dataset.g === state.g));
      $$('[data-s]', cat).forEach((t) => t.classList.toggle('is-on', t.dataset.s === state.s));
      $$('[data-b]', cat).forEach((t) => t.classList.toggle('is-on', t.dataset.b === state.b));
      out.textContent = (n === 1 ? cat.dataset.countOne : cat.dataset.count).replace('{n}', n);
      empty.hidden = n > 0; grid.hidden = n === 0;
      const p = new URLSearchParams();
      if (state.g !== 'all') p.set('g', state.g);
      if (state.s) p.set('s', state.s);
      if (state.b) p.set('b', state.b);
      if (state.q) p.set('q', state.q);
      if (state.sort) p.set('o', state.sort);
      history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
    };
    cat.addEventListener('click', (e) => {
      const t = e.target.closest('button'); if (!t) return;
      if (t.dataset.g) state.g = t.dataset.g;
      else if (t.dataset.s !== undefined) state.s = state.s === t.dataset.s ? '' : t.dataset.s;
      else if (t.dataset.b !== undefined) state.b = state.b === t.dataset.b ? '' : t.dataset.b;
      else if (t.hasAttribute('data-reset')) { state.g = 'all'; state.s = ''; state.b = ''; state.q = ''; state.sort = ''; q.value = ''; sort.value = ''; }
      else return;
      apply();
    });
    q.addEventListener('input', () => { state.q = q.value; apply(); });
    sort.addEventListener('change', () => { state.sort = sort.value; apply(); });
    apply();
  }

  // ---------- formulari -> WhatsApp ----------
  $$('.form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const name = (f.get('name') || '').toString().trim();
      const phone = (f.get('phone') || '').toString().trim();
      const err = $('.form__err', form);
      if (!name || !phone) { err.textContent = form.dataset.required; err.hidden = false; return; }
      err.hidden = true;
      const text = form.dataset.msg
        .replace('{name}', name).replace('{phone}', phone)
        .replace('{type}', (f.get('type') || '').toString())
        .replace('{message}', (f.get('message') || '').toString().trim()).trim();
      window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  });
})();
