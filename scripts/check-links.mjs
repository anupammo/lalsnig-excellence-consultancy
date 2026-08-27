#!/usr/bin/env node
/**
 * Static reference check for the LALSNIG Consulting site.
 *
 * Every href/src/srcset/imagesrcset on every HTML page must either be external
 * (http, mailto, tel, data, protocol-relative), a bare fragment, or resolve to a
 * real file on disk. A broken asset path is the failure mode this stack produces
 * most often and it is invisible until someone loads the page.
 *
 * Run locally before every push:   node scripts/check-links.mjs
 * CI runs the same script, so local and CI cannot disagree.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index.html', 'brand.html', '404.html'];
const REQUIRED = [
  'index.html', '404.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', '.nojekyll',
  'assets/css/brand.css', 'assets/css/fonts.css', 'assets/js/site.js',
  'assets/vendor/bootstrap/bootstrap.min.css', 'assets/vendor/bootstrap/bootstrap.bundle.min.js',
];
// The site is served from the root of lalsnigconsulting.com, so root-absolute
// links resolve directly. The old GitHub Pages project prefix is still stripped
// so any straggler from before the domain move is caught rather than reported.
const BASE_PATH = '/lalsnig-excellence-consultancy/';
const EXTERNAL = /^(https?:|mailto:|tel:|data:|\/\/)/i;

const errors = [];
const ci = process.env.GITHUB_ACTIONS === 'true';
const fail = (file, msg) => {
  errors.push(`${file}: ${msg}`);
  console.log(ci ? `::error file=${file}::${msg}` : `  ✗ ${file}: ${msg}`);
};

/* --- 1. Required files ---------------------------------------------------- */
for (const f of REQUIRED) {
  if (!existsSync(join(ROOT, f))) fail(f, 'required file is missing');
}

/* --- 2. Reference integrity ---------------------------------------------- */
// `s` flag so an attribute value may span lines, which srcset lists do.
const ATTR = /(?:href|src|srcset|imagesrcset)\s*=\s*"([^"]*)"/gis;

/** srcset holds a comma-separated candidate list, each optionally suffixed "640w" / "2x". */
const candidates = (value, attr) =>
  (attr ? value.split(',') : [value])
    .map(part => part.trim().replace(/\s+[\d.]+[wx]$/, '').trim())
    .filter(Boolean);

const referenced = new Set();

for (const page of PAGES) {
  const abs = join(ROOT, page);
  if (!existsSync(abs)) continue;
  const html = readFileSync(abs, 'utf8');

  // Every id/name this page defines, so same-page fragments can be checked.
  const anchors = new Set([
    ...[...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]),
    ...[...html.matchAll(/<a\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]),
  ]);

  for (const m of html.matchAll(ATTR)) {
    const raw = m[0];
    const isSet = /^(?:srcset|imagesrcset)/i.test(raw);
    for (const ref of candidates(m[1], isSet)) {
      if (EXTERNAL.test(ref) || ref === '') continue;

      // Same-page fragment: the target id must exist. A renamed section leaves
      // dead nav and footer links that resolve to nothing and fail silently.
      if (ref.startsWith('#')) {
        const id = decodeURIComponent(ref.slice(1));
        if (id && !anchors.has(id)) fail(page, `fragment has no target on this page -> ${ref}`);
        continue;
      }

      const clean = ref.split(/[?#]/)[0];
      const frag = ref.includes('#') ? ref.slice(ref.indexOf('#') + 1) : '';
      if (clean === '') {
        // "/base/#services" - a fragment on this same page, written absolutely.
        if (frag && !anchors.has(decodeURIComponent(frag))) {
          fail(page, `fragment has no target on this page -> ${ref}`);
        }
        continue;
      }
      const rel = clean.startsWith(BASE_PATH) ? clean.slice(BASE_PATH.length)
                : clean.startsWith('/') ? clean.slice(1)
                : clean;
      if (rel === '') continue;                          // the site root itself
      if (!existsSync(join(ROOT, rel))) fail(page, `broken reference -> ${ref}`);
      else referenced.add(rel);
    }
  }

  /* --- 3. Cheap structural guards --------------------------------------- */
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) fail(page, `expected exactly one <h1>, found ${h1}`);

  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map(m => Number(m[1]));
  levels.reduce((prev, lvl) => {
    if (prev && lvl > prev + 1) fail(page, `heading level skips h${prev} -> h${lvl}`);
    return lvl;
  }, 0);

  // Indexable pages must declare a canonical. A noindex page (brand.html, 404.html)
  // does not need one - a canonical on an error page points nowhere useful.
  const noindex = /<meta\s[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html);
  if (!noindex && !/<link\s[^>]*rel="canonical"/i.test(html)) {
    fail(page, 'missing <link rel="canonical">');
  }

  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    if (!/\balt\s*=/i.test(img)) fail(page, `<img> without alt: ${img.slice(0, 90)}`);
    if (!/\bwidth\s*=/i.test(img) || !/\bheight\s*=/i.test(img)) {
      fail(page, `<img> without width/height (causes layout shift): ${img.slice(0, 90)}`);
    }
  }

  for (const json of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || []) {
    const body = json.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    try { JSON.parse(body); } catch (e) { fail(page, `invalid JSON-LD: ${e.message}`); }
  }
}

/* --- 3b. Non-HTML referrers, so the orphan report below is trustworthy ---- */
// The manifest points at the app icons and the CSS points at the webfonts;
// neither is reachable from an HTML attribute.
for (const file of ['site.webmanifest', 'assets/css/fonts.css', 'assets/css/brand.css']) {
  const abs = join(ROOT, file);
  if (!existsSync(abs)) continue;
  const text = readFileSync(abs, 'utf8');
  const found = file.endsWith('.css')
    ? [...text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map(m => m[1])
    : [...text.matchAll(/"(?:src)"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
  for (const ref of found) {
    if (EXTERNAL.test(ref)) continue;
    const rel = relative(ROOT, resolve(join(ROOT, dirname(file)), ref.replace(/^\.\//, '')))
      .split('\\').join('/');
    if (!existsSync(join(ROOT, rel))) fail(file, `broken reference -> ${ref}`);
    else referenced.add(rel);
  }
}

/* --- 4. Report unreferenced images (informational, never fatal) ---------- */
const walk = dir => readdirSync(join(ROOT, dir)).flatMap(name => {
  const rel = `${dir}/${name}`;
  return statSync(join(ROOT, rel)).isDirectory() ? walk(rel) : [rel];
});
const orphans = walk('assets/img').filter(f => !referenced.has(f));
if (orphans.length) {
  console.log(`\n  note: ${orphans.length} file(s) in assets/img are not referenced by any page`);
  console.log('        (regeneration sources and the Phase 2 library live here too — see docs/09)');
  orphans.forEach(f => console.log(`          · ${f}`));
}

/* --- Result --------------------------------------------------------------- */
console.log('');
if (errors.length) {
  console.log(`FAILED — ${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`OK — ${PAGES.length} pages checked, ${referenced.size} local references all resolve`);
