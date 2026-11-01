// Katalogu Covim. Burimi: covimcaffe.it (përshkrimet dhe intensiteti zyrtar).
// Fusha `off: true` e fsheh produktin nga faqja (p.sh. nëse nuk disponohet në Shqipëri).

export const GROUPS = ['capsule', 'bustine', 'grani', 'macinato', 'speciale'];

export const SYSTEMS = {
  nespresso: 'Nespresso® Original',
  dolcegusto: 'Dolce Gusto®',
  amodomio: 'A Modo Mio®',
  espressopoint: 'Espresso Point®',
  firma: 'Firma®',
  ese: 'ESE 44 mm',
};

// mix: arabica | arabica-robusta | robusta | null (e panjohur)
const c = (id, system, blend, intensity, qty, per, mix) => ({
  id, group: 'capsule', system, blend, intensity, mix,
  pack: { qty, per, unit: 'capsule' },
  slug: `${system}-${blend}`,
});
const b = (id, blend, intensity, mix) => ({
  id, group: 'bustine', system: 'ese', blend, intensity, mix,
  pack: { qty: 200, per: '4×50', unit: 'pod' },
  slug: `bustina-${blend}`,
});
const g = (id, blend, intensity, kg, mix, extra = {}) => ({
  id, group: 'grani', system: null, blend, intensity, mix,
  pack: { weight: kg }, slug: `grani-${blend}`, ...extra,
});
const m = (id, blend, intensity, pack, mix, extra = {}) => ({
  id, group: 'macinato', system: null, blend, intensity, mix,
  pack, slug: `macinato-${blend}`, ...extra,
});
const s = (id, blend) => ({
  id, group: 'speciale', system: 'dolcegusto', blend, intensity: null, mix: null,
  pack: { qty: 48, per: '6×16', unit: 'capsule' }, slug: `dolcegusto-${blend}`,
});

export const products = [
  // Nespresso® Original (alumin)
  c(1900, 'nespresso', 'mistero-nero', 10, 120, '4×30', null),
  c(1902, 'nespresso', 'orocrema', 9, 120, '4×30', 'arabica-robusta'),
  c(1901, 'nespresso', 'granbar', 8, 120, '4×30', 'arabica-robusta'),
  c(62776, 'nespresso', 'honduras', 7, null, null, 'arabica'),
  c(1903, 'nespresso', 'decaf', 6, 120, '4×30', 'arabica-robusta'),
  // Lavazza® A Modo Mio®
  c(25555, 'amodomio', 'mistero-nero', 10, 96, '2×48', null),
  c(1859, 'amodomio', 'orocrema', 9, 96, '2×48', 'arabica-robusta'),
  c(1864, 'amodomio', 'granbar', 8, 96, '2×48', 'arabica-robusta'),
  c(66056, 'amodomio', 'honduras', 7, null, null, 'arabica'),
  c(1874, 'amodomio', 'decaf', 7, 96, '2×48', 'arabica-robusta'),
  // Lavazza® Espresso Point®
  c(1858, 'espressopoint', 'mistero-nero', 10, 100, null, null),
  c(1856, 'espressopoint', 'orocrema', 9, 100, null, 'arabica-robusta'),
  c(1857, 'espressopoint', 'granbar', 8, 100, null, 'arabica-robusta'),
  c(25554, 'espressopoint', 'honduras', 7, 100, null, 'arabica'),
  c(1904, 'espressopoint', 'decaf', 6, 100, null, 'arabica-robusta'),
  // Nescafé® Dolce Gusto®
  c(25536, 'dolcegusto', 'orocrema', 9, 96, '6×16', 'arabica-robusta'),
  c(25537, 'dolcegusto', 'granbar', 8, 96, '6×16', 'arabica-robusta'),
  c(25538, 'dolcegusto', 'decaf', 8, 96, '6×16', 'arabica-robusta'),
  // Lavazza® Firma®
  c(25534, 'firma', 'orocrema', 9, 100, null, 'arabica-robusta'),
  c(25535, 'firma', 'granbar', 8, 100, null, 'arabica-robusta'),
  // Bustina kompostueshme (ESE 44 mm)
  b(1885, 'mistero-nero', 10, 'robusta'),
  b(1882, 'orocrema', 9, 'arabica-robusta'),
  b(1883, 'granbar', 8, 'arabica-robusta'),
  b(1884, 'honduras', 7, 'arabica'),
  b(1886, 'decaf', 6, 'arabica-robusta'),
  // Kafe në kokërr
  g(8531, 'intenso', 10, { kg: 1 }, 'robusta'),
  g(87586, 'prestige', 8, { kg: 1 }, 'arabica-robusta'),
  g(8534, 'miscela-bar', 8, { kg: 1 }, 'arabica-robusta'),
  g(25182, 'honduras', 7, { g: 500 }, 'arabica'),
  g(8547, 'decaf', 7, { g: 500 }, 'arabica-robusta'),
  // Kafe e bluar
  m(25171, 'premium', 9, { g: '2×250', form: 'bipack' }, 'robusta', { grind: 'moka' }),
  m(25165, 'espresso', 7, { g: '2×250', form: 'bipack' }, 'arabica-robusta', { grind: 'espresso' }),
  m(25159, 'oro', 7, { g: '2×250', form: 'bipack' }, 'arabica-robusta', { grind: 'moka' }),
  m(64570, 'honduras-moka', 7, { g: 250, form: 'tin' }, 'arabica', { grind: 'moka', bio: true }),
  m(67683, 'honduras-espresso', 6, { g: 250, form: 'tin' }, 'arabica', { grind: 'espresso', bio: true }),
  m(8551, 'suave', 5, { g: 250, form: 'pack' }, 'arabica-robusta', { grind: 'moka' }),
  // Pije speciale (Dolce Gusto®)
  s(59937, 'ginseng'),
  s(59906, 'nocciolino'),
  s(59875, 'cioccolata'),
  s(59839, 'cortado'),
  s(59777, 'te-limone'),
].map((p) => ({ ...p, img: `assets/img/products/${p.id}.webp`, bio: p.bio || p.blend === 'honduras' }));

// Produkte të zgjedhura për ballinë
export const FEATURED = [
  'nespresso-orocrema', 'nespresso-mistero-nero', 'dolcegusto-granbar', 'amodomio-orocrema',
  'espressopoint-honduras', 'bustina-orocrema', 'grani-miscela-bar', 'grani-prestige',
];

export const visible = () => products.filter((p) => !p.off);
export const bySlug = (slug) => products.find((p) => p.slug === slug);

// Çelësi i përkthimit të përshkrimit (blend.*)
export function noteKey(p) {
  return p.blend === 'honduras-moka' || p.blend === 'honduras-espresso' ? 'honduras-ground' : p.blend;
}

export function related(p, n = 4) {
  const sameBlend = visible().filter((x) => x.blend === p.blend && x.slug !== p.slug);
  const sameGroup = visible().filter((x) => x.group === p.group && x.system === p.system && x.slug !== p.slug);
  const rest = visible().filter((x) => x.group === p.group && x.slug !== p.slug);
  const seen = new Set();
  return [...sameBlend, ...sameGroup, ...rest].filter((x) => !seen.has(x.slug) && seen.add(x.slug)).slice(0, n);
}
