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
| Third-party requests | **0** | Network panel — this is a design property, not an aspiration |
| Webfont payload | ≤ 350 KB | Currently 308 KB |
| Render-blocking resources | CSS only | Network panel |

- [ ] All budgets met on **the deployed URL**, not on `file://`
- [ ] Tested on a throttled connection (Slow 4G) at least once

## 5. SEO

Run the per-page checklist in [07 §8](07-seo-onpage-spec.md#8-per-page-pre-publish-checklist), then:

- [ ] Structured data passes the [Rich Results Test](https://search.google.com/test/rich-results) with zero errors
- [ ] Page added to `sitemap.xml` with an accurate `lastmod`
- [ ] Canonical URL is absolute and correct
- [ ] Title and description render un-truncated in a SERP preview tool
- [ ] Open Graph preview renders correctly (LinkedIn Post Inspector, Facebook Sharing Debugger)
- [ ] No unintended `noindex` — **check this first when a page will not index**

## 6. Content

- [ ] SME has reviewed and approved every technical claim
- [ ] No placeholder text anywhere (`Lorem`, `TODO`, `TBD`, `xxx`)
- [ ] Spelling and grammar checked, Indian English (`en-IN`) throughout
- [ ] Contact details match [01 §fast-facts](README.md#fast-facts) exactly — one wrong digit costs every lead on the page
- [ ] Every image is licence-cleared and recorded in [09 §2](09-image-asset-strategy.md#2-image-manifest--phase-1)
- [ ] Every claim is defensible; no invented statistics
- [ ] Dates and experience figures current

## 7. Automated checks

`.github/workflows/deploy-pages.yml` runs on every push to `main` and blocks the deploy on failure:

1. **Required files present** — `index.html`, `404.html`, `robots.txt`, `sitemap.xml`,
   `site.webmanifest`, the CSS, the JS, the Bootstrap bundle.
2. **Local reference integrity** — every `href`/`src`/`srcset` on `index.html`, `brand.html` and
   `404.html` that is not `http(s):`, `mailto:`, `tel:`, `data:` or protocol-relative must resolve to
   a real file. Root-absolute paths under `/lalsnig-excellence-consultancy/` are normalised first;
   pure fragments are skipped.

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
| 4 | `robots.txt` is inert on a `github.io` project path | Delivery | Custom domain |
| 5 | No business address ⇒ no `LocalBusiness` schema, no Google Business Profile | Client | Confirmed address |
| 6 | No analytics ⇒ no conversion data | Client | Phase 4 consent decision |
| 7 | No contact form — enquiries rely on `tel:`/`mailto:` | Delivery | Phase 2 form provider |
| 8 | Lighthouse and Rich Results not yet run against a live URL | Delivery | First deploy |
| 9 | CI link check cannot run — GitHub Actions is billing-blocked on this account | Client | Clearing GitHub billing; run the checks locally until then |
