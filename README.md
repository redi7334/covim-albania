# Covim Tiranë: website

Faqja e distributorit zyrtar të Covim Caffè në Tiranë. Katalog, detaje produktesh, pajisje falas për biznese dhe kontakt, në **shqip, italisht dhe anglisht**. Pa porosi online: klientët telefonojnë ose shkruajnë në WhatsApp.

Faqe statike, pa varësi (vetëm Node.js 20+). Gjenerohen 138 faqe nga të dhënat dhe përkthimet.

## Komandat

```bash
npm run dev      # ndërton me base "/" dhe e hap në http://localhost:8080
npm run build    # ndërton në dist/ (base nga BASE_PATH, default /covim-albania/)
node check-links.mjs   # kontrollon lidhjet dhe fotot e brendshme
```

## Ku ndryshohen gjërat

| Çfarë | Ku |
|---|---|
| Telefoni, WhatsApp, Instagram, email, adresa, orari | `src/config.mjs` (fushat bosh fshihen vetë) |
| Tekstet në 3 gjuhë | `src/i18n.mjs` |
| Produktet (shto, fshi, intensitet, paketim) | `src/products.mjs` (`off: true` e fsheh një produkt) |
| Dizajni (ngjyra, fonte) | `assets/css/styles.css` (variablat në krye) |
| Ilustrimet (filxhani, makinat) | `src/art.mjs` |
| Fotot e produkteve | `assets/img/products/<id>.webp` |

Pas çdo ndryshimi bëj `git commit` dhe `git push`: GitHub ndërton dhe publikon automatikisht.

## Deploy

**GitHub Pages (falas):** Settings > Pages > Source: *GitHub Actions*. Adresa: `https://redi7334.github.io/covim-albania/`.

**Domain i vet:** në Settings > Secrets and variables > Actions > Variables vendos:

- `SITE_URL` = `https://domaini-yt.al`
- `BASE_PATH` = `/`
- `CNAME` = `domaini-yt.al`

pastaj tek Settings > Pages shto domain-in e personalizuar dhe vendos DNS sipas udhëzimeve të GitHub.

## Materiale

Fotot e produkteve dhe logoja janë materiale zyrtare të Covim (covimcaffe.it), përdorur me lejen e Covim për distributorin në Tiranë. Markat Nespresso®, Dolce Gusto®, A Modo Mio®, Espresso Point®, Firma® dhe Lavazza Blue® janë të pronarëve përkatës (shënim në footer).
