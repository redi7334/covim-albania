// Kontrollon lidhjet dhe asetet e brendshme në dist/. Përdorim: BASE_PATH=/ node build.mjs && node check-links.mjs
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const base = process.env.BASE_PATH || '/';
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dist);
let bad = 0, checked = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(u)) continue;
    if (!u.startsWith(base)) { console.log('BASE?', f.replace(dist, ''), u); bad++; continue; }
    u = u.slice(base.length);
    const target = join(dist, u);
    checked++;
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) { console.log('BROKEN', f.replace(dist, ''), '->', m[1]); bad++; }
  }
}
console.log(`${files.length} faqe, ${checked} lidhje të kontrolluara, ${bad} probleme`);
process.exit(bad ? 1 : 0);
