# 03 — Progress checklist

The status board. Tick boxes here, not in chat.

**Legend:** `[x]` done · `[ ]` open · **⛔** blocked (blocker named) · **👤** needs the client

**Last updated:** 23 August 2026

---

## Summary

| Phase | Items | Done | Open | Blocked |
|---|---|---|---|---|
| 0 — Discovery | 8 | 8 | 0 | 0 |
| 1 — Brand foundation & digital presence | 48 | 42 | 6 | 0 |
| 2 — Content & multi-page expansion | 30 | 0 | 26 | 4 |
| 3 — Authority content | 16 | 0 | 16 | 0 |
| 4 — Conversion & analytics | 13 | 0 | 12 | 1 |
| 5 — Scale & maintain | 8 | 0 | 8 | 0 |

---

## Phase 0 — Discovery & foundation inputs ✅

- [x] Extract all text, headings and structure from the 8-page company deck
- [x] Render every deck page at high resolution for visual analysis
- [x] Sample the brand palette by pixel histogram across all pages
- [x] Identify typefaces and choose licence-clean web substitutes
- [x] Extract the logo with a border-seeded flood-fill (preserves interior white detail)
- [x] Extract both trainer portraits at 5× render scale
- [x] Build the keyword universe and intent map
- [x] Source and licence-verify royalty-free imagery

## Phase 1 — Brand foundation & digital presence

### 1A. Design tokens & colour

- [x] Define navy, gold, orange, service-accent and neutral ramps as CSS custom properties
- [x] Measure WCAG contrast for every text/background pairing used
- [x] Resolve the two failing pairings (gold on white, white on brand orange) with documented alternates
- [x] Define semantic role tokens (`--ls-text`, `--ls-accent-cta`, `--ls-border`, …) so components never reference raw colours
- [x] Bridge tokens into Bootstrap's `--bs-*` variables so Bootstrap components inherit the brand
- [ ] 👤 **Client signs off the colour scheme** on `brand.html`

### 1B. Typography

- [x] Select the three-family system: Barlow Semi Condensed (display), Inter (body), Cormorant Garamond (serif accent)
- [x] Self-host all faces, latin + latin-ext subsets only
- [x] Deduplicate the Inter variable font (4 identical static requests → 1 variable face; saved ~145 KB)
- [x] Define a fluid type scale with `clamp()` — no breakpoint-specific font sizes
- [x] `font-display: swap` on every face; preload the two critical faces
- [ ] 👤 **Client signs off typography** on `brand.html`

### 1C. Logo & icons

- [x] Transparent full lockup at 1000 px and 420 px
- [x] Horizontal lockup for header/footer (the stacked lockup's tagline is illegible under ~150 px)
- [x] Monogram extraction
- [x] Favicons (32 px), app icons (192/512 px), Apple touch icon (180 px) — navy ground, knocked-out mark
- [x] Web app manifest
- [ ] 👤 **Obtain vector logo originals (AI/EPS/SVG)** — current files are raster extractions from the deck

### 1D. Component library

- [x] Buttons: primary, secondary, ghost-on-dark, with hover/active/focus states
- [x] Cards: base, media, service (coloured header band), capability pillar, trainer
- [x] Trust bar, process steps, outcomes strip, industry tiles
- [x] Accordion re-skinned through Bootstrap's own CSS variables
- [x] Sticky header with scroll shadow and scroll-spy
- [x] CTA panel and footer
- [x] Reveal-on-scroll, disabled under `prefers-reduced-motion`
- [x] Print stylesheet

### 1E. Page build

- [x] Hero — deck page 1
- [x] Trust bar — deck page 1
- [x] About + credentials — deck pages 3/4
- [x] Six service cards — deck pages 3/4
- [x] Five capability pillars — deck page 5
- [x] Expertise band — deck page 6
- [x] Six industry tiles — deck page 6
- [x] Five-step process + six outcomes — deck page 7
- [x] Two trainer cards — deck page 2
- [x] Why-us + commitment quote — deck page 8
- [x] FAQ accordion (new, SEO-driven)
- [x] Contact CTA + footer — deck page 8
- [x] Branded 404 page
- [x] Design-system sign-off page (`brand.html`, `noindex`)

### 1F. SEO & technical

- [x] Unique title (61 chars) and meta description (148 chars)
- [x] Canonical, robots directives, `lang="en-IN"`
- [x] Open Graph + Twitter card with a 1920×1080 image
- [x] JSON-LD: `Organization`/`ProfessionalService`, `WebSite`, 2× `Person`, `OfferCatalog`, `FAQPage`
- [x] `sitemap.xml`, `robots.txt`, `.nojekyll`
- [x] One `<h1>`; heading hierarchy verified with no level skips
- [x] Keyword-informed, descriptive alt text on every content image
- [x] Skip link, landmark regions, `aria-label` on both navs
- [x] Visible 3 px focus ring on every interactive element
- [x] All images carry explicit `width`/`height` or an `aspect-ratio` box (CLS protection)
- [x] Below-the-fold images lazy-loaded; hero uses `fetchpriority="high"`
- [x] WebP with JPEG fallback via `<picture>`
- [x] Horizontal-overflow audit at 360/430/768/1024/1280/1600 px — **fixed**: `g-5` row gutters exceeded container padding and overflowed the viewport by 12 px
- [ ] Validate JSON-LD in Google's Rich Results Test *(needs the live URL)*
- [ ] Run Lighthouse against the deployed URL and record the four scores

### 1G. Deployment

- [x] GitHub Actions workflow with a pre-deploy broken-link check
- [x] `.nojekyll` so `_`-prefixed paths are never swallowed
- [x] Pushed to `main` (commit `7fe814c`)
- [ ] 👤 **Enable Pages:** Settings → Pages → Source → **"Deploy from a branch"**, `main` / `(root)`
- [ ] ⛔ Actions-based deploy blocked: *"your account is locked due to a billing issue"*. Clear GitHub billing, then switch the Pages source to "GitHub Actions" to re-enable the pre-deploy link check

### 1H. Documentation

- [x] Charter, plan, checklist, design system, IA, keyword research, SEO spec, content strategy, image strategy, DoD, runbook, risk register
- [x] Repository README

---

## Phase 2 — Content & multi-page expansion

### 2A. Decisions needed before any building

- [ ] **Decide the multi-page approach**: hand-maintained HTML partials vs. a static site generator (11ty). Affects every subsequent page
- [ ] **Choose a form provider**: Formspree / Web3Forms / Google Forms — compare spam handling, DPDP posture, free-tier limits
- [ ] 👤 **Confirm a publishable business address** ⛔ blocks 2.6 and `LocalBusiness` schema
- [ ] 👤 **Confirm the custom domain** (purchase + DNS access)

### 2B. Pages

- [ ] `/services/conveyor-belt-design-review/`
- [ ] `/services/conveyor-troubleshooting-rca/`
- [ ] `/services/conveyor-performance-improvement/`
- [ ] `/services/conveyor-maintenance-support/`
- [ ] `/services/conveyor-safety-compliance/`
- [ ] `/services/training-competency/`
- [ ] `/training/lean-manufacturing/`
- [ ] `/training/lean-six-sigma/`
- [ ] `/training/industrial-engineering/`
- [ ] `/industries/` — hub plus six sector pages
- [ ] `/about/`
- [ ] `/contact/`

### 2C. Technical

- [ ] Shared header/footer without duplication
- [ ] Contact form live and delivering
- [ ] Custom domain + HTTPS + `CNAME` file
- [ ] Root-level `robots.txt` (unblocked by the custom domain)
- [ ] `BreadcrumbList` + per-page `Service` schema
- [ ] Regenerate `sitemap.xml` for all pages
- [ ] Internal-link audit — no orphans, everything ≤ 2 clicks from home

### 2D. Assets & credibility

- [ ] 👤 Real photography for hero, About and both trainer portraits
- [ ] 👤 Vector logo originals integrated as SVG
- [ ] 👤 2–3 case studies or anonymised results ⛔ needs end-client permission
- [ ] 👤 Client testimonials
- [ ] 👤 Certification evidence (ISO 9001 internal auditor, Six Sigma belts) for a credentials block
- [ ] Google Business Profile ⛔ blocked on the address

---

## Phase 3 — Authority content

- [ ] `/insights/` hub with `Article` + `BreadcrumbList` schema
- [ ] Article template component
- [ ] Pillar page: conveyor belt troubleshooting
- [ ] Pillar page: conveyor maintenance strategy
- [ ] Pillar page: Lean Six Sigma in bulk material handling
- [ ] Cluster article: belt mistracking causes and fixes
- [ ] Cluster article: reducing conveyor spillage and carry-back
- [ ] Cluster article: steel cord vs. textile belting — selection guide
- [ ] Cluster article: splice failure modes and prevention
- [ ] Cluster article: building a conveyor preventive-maintenance schedule
- [ ] Cluster article: conveyor safety audit checklist
- [ ] Cluster article: calculating true cost of conveyor downtime
- [ ] Cluster article: 5S on the maintenance floor
- [ ] Lead magnet: conveyor inspection checklist (PDF)
- [ ] Lead magnet: belt-failure diagnostic table
- [ ] LinkedIn syndication cadence established
- [ ] Backlink outreach: 5 target domains contacted

## Phase 4 — Conversion & analytics

- [ ] Google Search Console verified
- [ ] `sitemap.xml` submitted
- [ ] 👤 Analytics platform + consent posture decided ⛔ blocks the rest of 4
- [ ] Analytics installed
- [ ] Event: phone tap
- [ ] Event: email click
- [ ] Event: form submit
- [ ] Event: lead-magnet download
- [ ] Sticky mobile call button
- [ ] Mid-article CTA component
- [ ] Hero CTA wording iteration
- [ ] Core Web Vitals field monitoring
- [ ] First monthly report

## Phase 5 — Scale & maintain

- [ ] Quarterly content refresh — Q1
- [ ] Quarterly technical SEO audit — Q1
- [ ] Bootstrap/font dependency review
- [ ] Performance budget check
- [ ] Training-calendar landing page
- [ ] Broken-link sweep
- [ ] Schema re-validation
- [ ] Decide on Hindi/Bengali localisation

---

## Open items needing the client 👤

| # | Item | Blocks | Phase |
|---|---|---|---|
| 1 | Sign off the colour scheme on `brand.html` | Phase 1 gate | 1 |
| 2 | Sign off typography on `brand.html` | Phase 1 gate | 1 |
| 3 | Confirm all service claims and experience figures are accurate | Phase 1 gate | 1 |
| 4 | Confirm both trainers consent to publication of name, photo and bio | Phase 1 gate | 1 |
| 5 | Enable GitHub Pages (Settings → Pages → Source = **Deploy from a branch**, main/root) | Going live | 1 |
| 5b | Clear the GitHub Actions billing block, then switch Pages back to "GitHub Actions" | Automated pre-deploy link check | 1 |
| 6 | Supply vector logo originals | Crisp logo at all sizes | 1/2 |
| 7 | Confirm a publishable business address | Local SEO, `LocalBusiness` schema | 2 |
| 8 | Confirm and purchase the custom domain | Root `robots.txt`, brand email | 2 |
| 9 | Supply professional photography | Replacing stock + deck-extracted portraits | 2 |
| 10 | Approve case studies / obtain end-client permission | Highest-value credibility asset | 2 |
| 11 | Decide the analytics/consent posture | All of Phase 4 | 4 |
