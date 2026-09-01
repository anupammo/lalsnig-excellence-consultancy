# 10 — QA & definition of done

No page ships without passing every gate below. "It looks fine on my laptop" is not a gate.

---

## 1. Functional

- [ ] Every internal link resolves — CI enforces this, see [§7](#7-automated-checks)
- [ ] Every external link opens the intended page and carries `rel="noopener"`
- [ ] `tel:` and `mailto:` links launch the right handler on a phone
- [ ] Mobile menu opens, closes, and closes again after an in-page jump
- [ ] Accordions, if present, open and close by mouse *and* by keyboard
- [ ] Scroll-spy highlights the correct nav item
- [ ] 404 page renders with working navigation back into the site
- [ ] Page works with JavaScript disabled — all content readable, all links functional

## 2. Responsive

Test at **360 · 430 · 768 · 1024 · 1280 · 1600 px**.

- [ ] **No horizontal scroll at any width** — the most common regression on this stack; see [04 §4](04-brand-design-system.md#4-space-radius-elevation)
- [ ] No text clipped or overlapping
- [ ] Tap targets ≥ 44×44 px on touch widths
- [ ] Images fill their frame without distortion
- [ ] Tables and code blocks scroll inside their own container, never the page
- [ ] Verified in Chrome, Firefox and Safari (or WebKit)

### Quick overflow check

Append this to a copy of the page, load it in a headless browser at each width, and read the title:

```js
window.addEventListener('load', function () {
  var d = document.documentElement, over = [];
  document.querySelectorAll('*').forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.right > d.clientWidth + 1 || r.left < -1) over.push(el.tagName + '.' + el.className);
  });
  document.title = 'SW=' + d.scrollWidth + ' CW=' + d.clientWidth + ' || ' + over.slice(0, 12).join(' ;; ');
});
```

`SW === CW` and an empty list means clean. This is exactly how the 12 px `g-5` gutter overflow was
found and fixed in Phase 1.

## 3. Accessibility — WCAG 2.1 AA

- [ ] Every text/background pairing measured at ≥ 4.5:1 (≥ 3:1 for large text)
- [ ] Non-text contrast (focus ring, borders, icons carrying meaning) ≥ 3:1
- [ ] Full keyboard traversal in a logical order; nothing reachable only by mouse
- [ ] Visible focus indicator on every interactive element
- [ ] Skip link present and functional
- [ ] Exactly one `<h1>`; no heading-level skips
- [ ] Landmarks present: `header`, `nav`, `main`, `footer`
- [ ] Every image has `alt` (descriptive) or `alt=""` (decorative)
- [ ] Form fields have associated `<label>`s (Phase 2)
- [ ] Colour is never the only means of conveying information
- [ ] `prefers-reduced-motion` honoured
- [ ] Page usable at 200% browser zoom
- [ ] axe DevTools or Lighthouse accessibility audit: **zero violations**

### Contrast measurement

```js
const hex = h => { h = h.replace('#',''); return [0,2,4].map(i => parseInt(h.substr(i,2),16)); };
const lin = c => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
const L = h => { const [r,g,b] = hex(h); return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b); };
const ratio = (a,b) => { const x = L(a), y = L(b), hi = Math.max(x,y), lo = Math.min(x,y);
                         return (hi + 0.05) / (lo + 0.05); };
```

Every figure in [04 §2](04-brand-design-system.md#2-colour-scheme) came from this function. Any new
pairing gets measured with it before it ships.

## 4. Performance budget

| Metric | Target | How to check |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Lighthouse, mobile preset |
| Lighthouse Accessibility | 100 | Lighthouse |
| Lighthouse Best Practices | ≥ 95 | Lighthouse |
| Lighthouse SEO | 100 | Lighthouse |
| LCP | < 2.5 s | Lighthouse + field data (Phase 4) |
| CLS | < 0.1 | Lighthouse |
| INP | < 200 ms | Field data |
| Total page weight | < 2 MB | Network panel |
| Third-party requests | **1** (Google Analytics only) | Network panel — everything else is self-hosted, and that stays the rule |
| Webfont payload | ≤ 350 KB | Currently 308 KB |
| Render-blocking resources | CSS only | Network panel |

- [x] All budgets met on **the deployed URL**, not on `file://`
- [ ] Tested on a throttled connection (Slow 4G) at least once

### Measured — 24 August 2026

Lighthouse 12, headless Chrome, mobile preset (4× CPU throttle, simulated slow 4G).

| | Mobile | Desktop |
|---|---|---|
| **Performance** | **86 – 98** across 7 runs, median **96** | **99** |
| **Accessibility** | **100** | 100 |
| **Best Practices** | **100** | 100 |
| **SEO** | **100** | 100 |
| FCP | 1.3 – 1.6 s | 0.5 s |
| LCP | 2.2 – 2.6 s | 0.7 s |
| CLS | **0** (every run) | 0 |
| TBT | 30 – 410 ms | 0 ms |
| Page weight | ~330 KB | — |
| Third-party requests | **0** at the time of measurement | 0 |

> **On that Performance spread.** The 86–98 range is entirely Total Blocking Time, which varies with
> CPU contention on the measuring machine — the two low runs happened while other work was running on
> the same laptop. LCP, CLS, FCP and page weight were stable across all seven runs. Do not quote "98"
> as the score; quote the median and the range, and replace both with Search Console field data once
> Phase 4 lands. Lab numbers describe the machine as much as the site.

**Re-measured on `lalsnigconsulting.com`** after the domain move and the repositioning:
mobile **91 / 92 / 92**, all other categories **100**, LCP 2.3–2.8 s, CLS **0**.

**Re-measured again after Google Analytics 4 was added:** mobile **97 / 97 / 98**, Accessibility,
Best Practices and SEO **100** on all three runs, LCP 2.3–2.5 s, TBT 30–110 ms, CLS **0**.

> **GA4 did not measurably cost anything, and the earlier dip was not the domain.** Adding a
> third-party script *raised* the measured score, which only makes sense once you notice the 91/92
> runs were the first requests to a freshly-pointed domain with a cold CDN edge. GA4 loads `async`
> and blocks nothing. The lesson is about measurement, not about GA: **a single run after any
> infrastructure change is measuring the cache, not the site.** Wait, then measure three times.

**What moved the numbers** (first measurement was Performance 84, LCP 4.2 s):

| Fix | Effect |
|---|---|
| `site.js` read `window.scrollY` inside a scroll listener, forcing synchronous layout every frame | 316 ms of forced reflow removed; TBT 320 → ~50 ms |
| Header logo was a 142 KB PNG rendered at 219×63 | 142 → 17 KB |
| Hero shipped at 1920 px to a 412 px viewport | responsive `srcset`; 167 → 40 KB on mobile |
| Hero and band re-encoded at q58/q42 (both sit under a scrim, so it is invisible) | a further ~40% off both |
| Below-the-fold cards, tiles and portraits sized to their slots | ~200 KB |

**Structured data — validated 24 August 2026** at `validator.schema.org` against the live URL:
**0 errors, 0 warnings.** Graph extracted intact — `Organization` + `ProfessionalService` (with
`ContactPoint`, `Country`, 2 × `Person`, `OfferCatalog` → `Offer` → `Service`), `WebSite`,
and `FAQPage` → `Question` → `Answer`. Re-validated after the business-excellence repositioning
(8 offers, 7 Q&As) and after the move to `lalsnigconsulting.com`.

`brand.html` scores SEO 66. That is the `noindex` penalty and is correct — the page is a sign-off
artefact and must stay out of the index.

## 5. SEO

Run the per-page checklist in [07 §8](07-seo-onpage-spec.md#8-per-page-pre-publish-checklist), then:

- [ ] Structured data passes the [Rich Results Test](https://search.google.com/test/rich-results) with zero errors
- [ ] Page added to `sitemap.xml` with an accurate `lastmod`
- [ ] Canonical URL is absolute and correct
- [ ] Title and description render un-truncated in a SERP preview tool
- [ ] Open Graph preview renders correctly (LinkedIn Post Inspector, Facebook Sharing Debugger)
- [ ] No unintended `noindex` — **check this first when a page will not index**
- [ ] After any host or path change: fetch the live pages and confirm the canonical, `og:url` and every root-absolute asset path point at the current origin

## 6. Content

- [ ] SME has reviewed and approved every technical claim
- [ ] No placeholder text anywhere (`Lorem`, `TODO`, `TBD`, `xxx`)
- [ ] Spelling and grammar checked, Indian English (`en-IN`) throughout
- [ ] Contact details match [01 §fast-facts](README.md#fast-facts) exactly — one wrong digit costs every lead on the page
- [ ] Every image is licence-cleared and recorded in [09 §2](09-image-asset-strategy.md#2-image-manifest--phase-1)
- [ ] Every claim is defensible; no invented statistics
- [ ] Experience figures match the client's current record (Ranjit Mondal: 19+ years as of Aug 2026 — this increments annually and appears in 6 places)
- [ ] Dates and experience figures current

## 7. Automated checks

```bash
node scripts/check-links.mjs
```

One script, run both by you and by CI, so local and CI cannot disagree about what "passing" means.
**While Actions is billing-blocked and the site publishes by branch deployment, this is the only gate
there is — run it before every push.** See [11 §0](11-deployment-runbook.md#0-current-deployment-mode--branch-not-actions).

It checks:

1. **Required files present** — `index.html`, `404.html`, `robots.txt`, `sitemap.xml`,
   `site.webmanifest`, `.nojekyll`, the CSS, the JS, the Bootstrap bundle.
2. **Local reference integrity** — every `href` / `src` / `srcset` / `imagesrcset` that is not
   `http(s):`, `mailto:`, `tel:`, `data:` or protocol-relative must resolve to a real file. `srcset`
   candidate lists are split and their `640w` descriptors stripped; root-absolute paths under
   `/lalsnig-excellence-consultancy/` are normalised; bare fragments are skipped. It also follows
   `site.webmanifest` and `url()` in the CSS, so the app icons and webfonts count as referenced.
3. **Exactly one `<h1>` per page** and **no heading-level skips**.
4. **Canonical** on every indexable page (`noindex` pages are exempt).
5. **Every `<img>`** carries `alt` and both `width` and `height`.
6. **Every JSON-LD block parses.**
7. Informational: lists files in `assets/img` that no page references — regeneration sources and the
   Phase 2 library live there too, so this is a report, never a failure.

> The original version of this check was a `grep`/`sed` pipeline. It was line-based, so it silently
> stopped matching the moment `srcset` attributes spanned multiple lines — it would have reported
> success while checking nothing. That is why it is a script now.

### Worth adding in Phase 2

- HTML validation (`html-validate` or the W3C validator action)
- Link checking including external URLs (`lychee`)
- Lighthouse CI with the budgets above as hard thresholds
- `pa11y-ci` for automated accessibility regression

## 8. Phase gate sign-off

A phase closes when **all** of these are true:

- [ ] Every deliverable in [02-project-plan.md](02-project-plan.md) for the phase is complete
- [ ] Every page passes §1–§7
- [ ] The checklist in [03](03-progress-checklist.md) reflects reality
- [ ] Client sign-off recorded, with a date
- [ ] The risk register has been reviewed and updated
- [ ] Known limitations are written down, not carried in someone's head

### Known limitations at Phase 1 close

| # | Limitation | Owner | Cleared by |
|---|---|---|---|
| 1 | Logo files are raster extractions from the deck | Client | Vector originals |
| 2 | Trainer portraits are low-resolution deck extractions | Client | Professional headshots |
| 3 | All photography is stock | Client | Real site photography |
| ~~4~~ | ~~`robots.txt` is inert on a `github.io` project path~~ | — | ✅ **Cleared 24 Aug 2026** — custom domain live |
| 5 | No business address ⇒ no `LocalBusiness` schema, no Google Business Profile | Client | Confirmed address |
| ~~6~~ | ~~No analytics ⇒ no conversion data~~ | — | ✅ **Cleared 24 Aug 2026** — GA4 `G-HFWSCJXX0Y` installed |
| 14 | **No cookie/privacy notice, but GA4 now sets cookies.** India's DPDP Act and GDPR (for any EU visitor) both expect disclosure and, for GDPR, prior consent | Client | A privacy page plus a consent banner, or switching to a cookieless analytics tool |
| 15 | Conversion events not yet configured — GA4 records pageviews only, so phone taps, WhatsApp clicks and email clicks are invisible | Delivery | Phase 4 event tracking |
| 7 | No contact form — enquiries rely on `tel:`/`mailto:` | Delivery | Phase 2 form provider |
| ~~8~~ | ~~Lighthouse and Rich Results not run against a live URL~~ | — | ✅ **Cleared 24 Aug 2026** — see §4 |
| 9 | No pre-deploy gate: Actions is billing-blocked, so branch deployment publishes whatever is pushed | Client | Clearing GitHub billing. Until then `node scripts/check-links.mjs` before every push |
| 10 | Bootstrap CSS is 94% unused (~30 KB of the 32 KB transferred, ~300 ms render-blocking) | Delivery | A custom Bootstrap build in Phase 2, when the full class inventory is known. Purging now would risk silently dropping classes the Phase 2 pages need |
| 11 | `assets/css/brand.css` ships unminified (~2 KB of savings) | Delivery | Deliberate: a build step costs more in maintainability than 2 KB buys in speed |
| 12 | GitHub Pages sets `cache-control: max-age=600`; longer asset caching is not configurable | Platform | Only a move off Pages would change this |
| 13 | Cormorant Garamond costs ~48 KB for a pull-quote and one label | Delivery | Accepted — it is a signed-off brand decision, recorded here so it is a choice and not an oversight |
