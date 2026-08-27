# 07 — On-page SEO specification

The rules every page on this site must satisfy. Treat it as a build checklist, not as advice.
Keyword assignments live in [06-keyword-research.md](06-keyword-research.md); this document is
*how* each page is constructed.

---

## 1. `<head>` requirements

| Element | Rule | Live example (`index.html`) |
|---|---|---|
| `<title>` | 50–65 chars. Primary keyword first, brand last, separated by a pipe | `Business Excellence Consultants & Lean Six Sigma Training \| LALSNIG` — 68 chars |
| `<meta name="description">` | 140–160 chars. Written to earn the click, not to rank. Include the primary keyword and a concrete benefit | 147 chars |
| `<link rel="canonical">` | **Absolute URL, on every page, always** — including the page's own canonical | ✅ |
| `<meta name="robots">` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` on public pages; `noindex, follow` on `brand.html` and `404.html` | ✅ |
| `<html lang>` | `en-IN` | ✅ |
| `<meta name="viewport">` | `width=device-width, initial-scale=1` | ✅ |
| `<meta name="theme-color">` | `#0B1F35` | ✅ |
| Open Graph | `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image` (1200×630 min; ours is 1920×1080), `og:image:width/height/alt` | ✅ |
| Twitter | `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` | ✅ |
| Icons | 32 px favicon, 192 px, 180 px Apple touch, `site.webmanifest` | ✅ |

`max-image-preview:large` is not decoration — it is what allows a large thumbnail in mobile results,
and on an image-led site that is a measurable click-through difference.

## 2. Content structure

| Rule | Why |
|---|---|
| **Exactly one `<h1>`** containing the primary keyword | Ambiguous topic signal otherwise |
| **No heading-level skips** (`h1 → h2 → h3`, never `h1 → h3`) | Screen-reader navigation and outline parsing |
| Primary keyword in the **first 100 words** | Above-the-fold relevance |
| Primary keyword in at least one `<h2>` | Section-level relevance |
| **300 words minimum**, 700–1,200 for service and article pages | Below 300 a page rarely has enough to say to rank |
| Semantic landmarks: `<header> <nav> <main> <article> <section> <footer>` | Structure without ARIA gymnastics |
| Every `<section>` carries `aria-labelledby` pointing at its heading | Named regions for assistive tech |
| Lists as real `<ul>`/`<ol>`, tables as real `<table>` | Eligible for rich results; scannable |
| Descriptive link text | "lean manufacturing consultant", never "click here" |
| **3–5 internal links minimum**, all descriptive | Distributes authority; no orphan pages |
| External links to authorities where they add credibility (ISO, CEMA, DIN), `rel="noopener"` | Corroboration signal |

## 3. URLs

```
✅  /services/lean-manufacturing/
✅  /specialism/conveyor-bulk-handling/
❌  /services/page2.html
❌  /services/Lean_Manufacturing_Consulting_Services_India/
```

Lowercase · hyphens not underscores · no stop-word padding · trailing slash on directory-style paths ·
three levels deep maximum · **never change a live URL without a redirect**, and GitHub Pages cannot
issue 301s, so on a static host a URL change means a client-side redirect page and a Search Console
change-of-address. Get slugs right the first time.

## 4. Images

| Rule | Implementation |
|---|---|
| Descriptive alt text on every content image | "Aerial view of a stacker-reclaimer feeding a coal stockyard conveyor system" — describes what is actually shown, includes relevant terms naturally, never keyword-stuffed |
| `alt=""` on decorative images | The expertise-band background carries `alt=""` |
| Explicit `width` and `height` on every `<img>` | Zero CLS |
| Modern format with fallback | `<picture>` → WebP `<source>` + JPEG `<img>` |
| Lazy-load below the fold | `loading="lazy"` |
| Never lazy-load the LCP image | Hero has `fetchpriority="high"`, no `loading` attribute |
| Descriptive filenames | `industry-power-plant.webp`, never `IMG_2049.jpg` |
| Compressed | See [09 §4](09-image-asset-strategy.md#4-optimisation-pipeline) |

## 5. Structured data (JSON-LD)

Currently on the home page, as a single `@graph`:

| Type | Purpose |
|---|---|
| `Organization` + `ProfessionalService` | Entity identity, logo, contact, `areaServed`, `knowsAbout`, `sameAs` → LinkedIn |
| `WebSite` | Site-level entity, `publisher` reference |
| `Person` × 2 | Both trainers, with `jobTitle` and `sameAs` — feeds E-E-A-T |
| `OfferCatalog` (8 × `Service`) | Machine-readable service list — six business-excellence lines, the conveyor specialism, and web/digital |
| `FAQPage` (7 Q&As) | Rich-result eligible. The answers on the page and in the schema are **identical**, which Google requires — both are generated from one array in the FAQ build script, so they cannot drift |

To add in Phase 2:

- `BreadcrumbList` on every non-home page
- One `Service` per service page, `provider` → the `Organization` `@id`
- `LocalBusiness` with `PostalAddress` and `openingHours` ⛔ blocked on the address
- `Article` + `author` → the `Person` `@id`, on every insight
- `Course` on training pages, if scheduled dates and delivery mode exist

**Validate every change** at [Rich Results Test](https://search.google.com/test/rich-results) and
[Schema Markup Validator](https://validator.schema.org/). Schema that contradicts the visible page is
a manual-action risk, not just a wasted opportunity.

## 6. Technical SEO

| Item | Status |
|---|---|
| `sitemap.xml` — every indexable URL, accurate `lastmod` | ✅ 1 URL; regenerate each phase |
| `robots.txt` | ✅ present — **but see the caveat below** |
| `.nojekyll` | ✅ so GitHub Pages does not swallow `_`-prefixed paths |
| HTTPS | ✅ enforced by GitHub Pages |
| Mobile-friendly | ✅ verified at 360 / 430 / 768 / 1024 / 1280 / 1600 px |
| No horizontal scroll at any width | ✅ audited and fixed |
| Custom 404 | ✅ `404.html` |
| Canonical on every page | ✅ |
| No duplicate content | ✅ one page today; Phase 2 enforces one-keyword-per-page |
| Crawl depth ≤ 3 | ✅ |
| Core Web Vitals | Lab: strong by construction. **Field data pending** — needs Phase 4 |

> ### `robots.txt` caveat
> Crawlers only read `robots.txt` at the **domain root**. On a project Pages site the file resolves to
> `anupammo.github.io/lalsnig-excellence-consultancy/robots.txt`, which crawlers ignore in favour of
> `anupammo.github.io/robots.txt` — a file this repository does not control. Ours is therefore
> effectively inert until a custom domain is attached (Phase 2), at which point it becomes live
> unchanged. **Until then, indexing control relies entirely on per-page `<meta name="robots">`,** which
> is why `brand.html` and `404.html` carry `noindex` in the markup rather than relying on a `Disallow`.
> The sitemap can still be submitted directly in Search Console — that path does not involve `robots.txt`.

## 7. Performance

| Practice | Implementation |
|---|---|
| Zero third-party requests | Bootstrap and all fonts self-hosted. No CDN, no font API, no tracker |
| Critical fonts preloaded | Inter variable + Barlow 700, latin subsets |
| `font-display: swap` | Every face |
| Deferred JS | Both scripts carry `defer`; nothing blocks parsing |
| No render-blocking third-party CSS | — |
| Modern image formats | WebP with JPEG fallback |
| Subset fonts | latin + latin-ext only; 308 KB for three families |
| Variable font deduplication | Inter shipped once at 100–900 rather than four identical statics (−145 KB) |
| No layout shift | Explicit dimensions everywhere |

## 8. Per-page pre-publish checklist

Copy this into the PR description for every new page.

```
[ ] Title 50-65 chars, primary keyword first, brand last
[ ] Meta description 140-160 chars, written for the click
[ ] Absolute canonical URL
[ ] Robots directive correct for this page's purpose
[ ] Exactly one h1, containing the primary keyword
[ ] No heading-level skips
[ ] Primary keyword in first 100 words and in one h2
[ ] 300+ words (700+ for service/article pages)
[ ] Every image: descriptive alt (or alt=""), width+height, WebP+fallback, lazy below fold
[ ] 3+ descriptive internal links out; page is linked to from somewhere
[ ] Every same-page #fragment resolves to a real id (scripts/check-links.mjs enforces this)
[ ] URL slug: lowercase, hyphens, no stop-word padding
[ ] JSON-LD added and validated in Rich Results Test
[ ] Open Graph + Twitter tags with a correct image
[ ] Added to sitemap.xml with today's lastmod
[ ] No horizontal scroll at 360 / 768 / 1280 px
[ ] Keyboard-navigable, visible focus, skip link works
[ ] Lighthouse >= 90 on all four categories
```

## 9. Never do these

- Keyword stuffing, hidden text, or white-on-white
- Doorway pages: near-identical pages differing only by city or sector name
- Buying links, or link exchanges with unrelated sites
- Auto-generated content published without SME review
- Schema describing things the page does not show
- Fake reviews, fabricated testimonials, invented certifications
- `noindex` left on a page after launch (check this first when a page will not index)
- Changing a live URL without a redirect
