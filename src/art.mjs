// Ilustrimet SVG (stil flat, si te reklama) dhe ikonat.

const I = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  whatsapp: '<path d="M3 21l1.6-4.8A8.7 8.7 0 1 1 8 19.6L3 21z"/><path d="M9 8.5c.3 2.800 2.700 5.600 5.700 6.500l1.300-1.300-2-1-.9.8c-1-.4-2-1.400-2.400-2.400l.8-.9-1-2L9 8.500z" fill="currentColor" stroke="none"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.200" cy="6.800" r=".9" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s7-6.200 7-11a7 7 0 1 0-14 0c0 4.800 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cup: '<path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4z"/><path d="M17 11h1.500a2.500 2.500 0 0 1 0 5H16.500M8 3c-1 1.500 1 2.500 0 4M12 3c-1 1.500 1 2.500 0 4"/>',
  bell: '<path d="M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6M9.500 6h5"/>',
  office: '<rect x="5" y="3" width="14" height="18" rx="1.500"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  home: '<path d="M3 11l9-8 9 8M5 9.500V20h14V9.500M10 20v-6h4v6"/>',
  star: '<path d="M12 3l2.700 5.600 6.100.8-4.500 4.200 1.100 6-5.400-3-5.400 3 1.100-6L3.200 9.400l6.100-.8L12 3z"/>',
};

export function icon(name, cls = 'ic') {
  return `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${I[name] || ''}</svg>`;
}

// Sprite i fshehur: kokërr kafeje e ripërdorshme.
export const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<symbol id="bean" viewBox="0 0 40 60"><ellipse cx="20" cy="30" rx="17" ry="27" fill="currentColor"/><path d="M22 5C9 18 31 38 17 55" fill="none" stroke="#1D1D1B" stroke-opacity=".38" stroke-width="3.500" stroke-linecap="round"/></symbol>
</defs></svg>`;

const bean = (x, y, s, rot, delay = 0, color = 'var(--bean)') =>
  `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="float" style="animation-delay:${delay}s"><use href="#bean" x="${-s / 2}" y="${-s * 0.75}" width="${s}" height="${s * 1.5}" style="color:${color}"/></g></g>`;

// Tasa e espresso-s me avull dhe kokrra që "bien" në hark (si në video).
export function heroArt() {
  const beans = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const t = (160 - (140 * i) / (n - 1)) * (Math.PI / 180);
    const x = 270 + 205 * Math.cos(t);
    const y = 255 - 215 * Math.sin(t);
    const rot = 90 - (t * 180) / Math.PI + (i % 2 ? 14 : -10);
    const size = 36 - Math.abs(i - 3) * 1.200;
    const shade = ['#6b3b1f', '#8a5230', '#5a2f18', '#a4683d'][i % 4];
    beans.push(bean(x.toFixed(1), y.toFixed(1), size.toFixed(1), rot.toFixed(1), (i * 0.35).toFixed(2), shade));
  }
  return `<svg class="hero-art" viewBox="0 0 540 520" role="img" aria-label="Filxhan espresso me kokrra kafeje">
  <circle cx="270" cy="300" r="225" fill="var(--sky)"/>
  <circle cx="270" cy="300" r="225" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round" class="spin"/>
  ${beans.join('')}
  <g class="steam" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85">
    <path d="M225 262c-18-22 18-34 0-58" style="animation-delay:0s"/>
    <path d="M270 262c-18-24 18-38 0-66" style="animation-delay:.6s"/>
    <path d="M315 262c-18-22 18-34 0-58" style="animation-delay:1.2s"/>
  </g>
  <ellipse cx="270" cy="470" rx="190" ry="26" fill="#1D1D1B" opacity=".14"/>
  <ellipse cx="270" cy="448" rx="170" ry="30" fill="#EDEFF3"/>
  <ellipse cx="270" cy="440" rx="170" ry="28" fill="#fff"/>
  <ellipse cx="270" cy="440" rx="88" ry="14" fill="#E3E6EC"/>
  <path d="M370 328c52-6 62 62-4 62" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round"/>
  <path d="M370 328c52-6 62 62-4 62" fill="none" stroke="#E9ECF1" stroke-width="6" stroke-linecap="round" opacity=".7" transform="translate(0 6)"/>
  <path d="M158 300h224c0 74-40 140-112 140S158 374 158 300z" fill="#fff"/>
  <path d="M158 300h224c0 74-40 140-112 140" fill="none"/>
  <path d="M312 322c-6 60-28 98-62 112 40 2 100-30 112-112z" fill="#E3E6EC" opacity=".8"/>
  <ellipse cx="270" cy="300" rx="112" ry="24" fill="#fff"/>
  <ellipse cx="270" cy="303" rx="98" ry="19" fill="#6b3b1f"/>
  <ellipse cx="270" cy="305" rx="74" ry="12" fill="#a8683c"/>
  <ellipse cx="258" cy="302" rx="34" ry="5" fill="#c58954" opacity=".7"/>
  <circle cx="270" cy="372" r="24" fill="var(--red)"/>
  <circle cx="270" cy="372" r="9" fill="#fff"/>
</svg>`;
}

// Frog Revolution (bustina)
export function frogArt() {
  return `<svg class="machine" viewBox="0 -50 310 420" role="img" aria-label="Didiesse Frog Revolution">
  <ellipse cx="155" cy="352" rx="130" ry="13" fill="#1D1D1B" opacity=".1"/>
  <path d="M80 296V120C80 66 112 38 155 38s75 28 75 82v176z" fill="#E4231C"/>
  <path d="M80 296V120C80 78 98 50 124 42c-18 20-26 46-26 80v174z" fill="#F04A3E"/>
  <path d="M206 296V120c0-34-8-62-26-82 28 8 50 34 50 82v176z" fill="#C21A14"/>
  <g class="lever"><path d="M155 38L250 -20" stroke="#C9CCD2" stroke-width="13" stroke-linecap="round"/><circle cx="252" cy="-22" r="15" fill="#1D1D1B"/></g>
  <circle cx="155" cy="38" r="22" fill="#C9CCD2"/><circle cx="155" cy="38" r="10" fill="#9EA2AA"/>
  <circle cx="155" cy="98" r="14" fill="#fff"/><circle cx="155" cy="98" r="6" fill="#E4231C"/>
  <circle cx="122" cy="136" r="5" fill="#7BD389"/><circle cx="188" cy="136" r="5" fill="#F9B104"/>
  <rect x="105" y="170" width="100" height="30" rx="7" fill="#C9CCD2"/>
  <rect x="123" y="202" width="64" height="18" rx="6" fill="#B4B8BF"/>
  <rect x="146" y="220" width="18" height="10" rx="3" fill="#8A8E96"/>
  <rect class="pour" x="153" y="230" width="4" height="52" rx="2" fill="#6b3b1f"/>
  <rect x="80" y="296" width="150" height="14" fill="#C9CCD2"/>
  <rect x="48" y="304" width="214" height="40" rx="16" fill="#C9CCD2"/>
  <rect x="76" y="318" width="158" height="5" rx="2.500" fill="#9EA2AA"/>
  <path d="M120 270h70c0 28-14 40-35 40s-35-12-35-40z" fill="#fff"/>
  <path d="M188 276c18-2 20 22 0 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="155" cy="271" rx="35" ry="7" fill="#6b3b1f"/>
</svg>`;
}

// Lavazza Blue Classy Compact (kapsula Covim Opera)
export function classyArt() {
  return `<svg class="machine" viewBox="0 0 280 420" role="img" aria-label="Lavazza Blue Classy Compact">
  <ellipse cx="140" cy="388" rx="120" ry="13" fill="#1D1D1B" opacity=".1"/>
  <rect x="40" y="52" width="200" height="320" rx="26" fill="#242422"/>
  <rect x="40" y="52" width="46" height="320" rx="22" fill="#2F2F2C"/>
  <rect x="198" y="52" width="42" height="320" rx="22" fill="#171715"/>
  <path d="M40 78a26 26 0 0 1 26-26h148a26 26 0 0 1 26 26v38H40z" fill="#EEF0F4"/>
  <rect x="40" y="104" width="200" height="12" fill="#C9CCD2"/>
  <rect x="100" y="24" width="80" height="26" rx="12" fill="#C9CCD2"/>
  <circle cx="92" cy="150" r="13" fill="#3A3A37"/><path d="M85 148h14a7 7 0 0 1-14 0z" fill="#fff"/>
  <circle cx="188" cy="150" r="13" fill="#3A3A37"/><path d="M181 148h14a7 7 0 0 1-14 0z" fill="#fff"/>
  <rect x="82" y="198" width="116" height="48" rx="12" fill="#333330"/>
  <rect x="130" y="250" width="20" height="12" rx="3" fill="#8A8E96"/>
  <rect class="pour" x="138" y="262" width="4" height="60" rx="2" fill="#6b3b1f"/>
  <rect x="82" y="338" width="116" height="38" rx="14" fill="#C9CCD2"/>
  <rect x="96" y="349" width="88" height="5" rx="2.500" fill="#9EA2AA"/>
  <path d="M104 300h72c0 30-14 42-36 42s-36-12-36-42z" fill="#fff"/>
  <path d="M174 306c18-2 20 22 0 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="140" cy="301" rx="36" ry="7" fill="#6b3b1f"/>
</svg>`;
}

// Pakoja e kafes (për fonde dekorative)
export function beanPattern() {
  const rows = [];
  const pos = [[8, 14, 24, 20], [30, 60, 20, -30], [58, 18, 28, 50], [84, 64, 22, -10], [16, 86, 20, 70], [48, 92, 26, 15], [92, 24, 18, 120]];
  for (const [x, y, s, r] of pos) {
    rows.push(`<use href="#bean" x="${x}" y="${y}" width="${s}" height="${s * 1.5}" transform="rotate(${r} ${x + s / 2} ${y + s * 0.75})"/>`);
  }
  return `<svg class="bean-pattern" viewBox="0 0 120 130" aria-hidden="true">${rows.join('')}</svg>`;
}
