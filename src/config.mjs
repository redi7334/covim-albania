// Të dhënat e biznesit. Ndrysho këtu dhe rindërto (npm run build).
// Fushat bosh ('') fshihen automatikisht nga faqja.
export default {
  brand: 'Covim Tiranë',
  phone: '069 330 3656',
  phoneIntl: '+355693303656',
  whatsapp: '355693303656', // pa +, për wa.me
  instagram: 'dyqanikafes',
  email: '',
  address: '', // p.sh. 'Rruga ..., Tiranë'
  hours: '', // p.sh. 'E hënë - E shtunë, 08:00 - 18:00'
  city: 'Tiranë',
  // URL publike e faqes (pa / në fund). Në Netlify merret nga URL; pas blerjes së domain-it vendose SITE_URL.
  siteUrl: (process.env.SITE_URL || process.env.URL || 'https://covim-albania.netlify.app').replace(/\/$/, ''),
  // Prefiksi i shtegut: '/' për Netlify ose domain të vet.
  base: process.env.BASE_PATH || '/',
};
