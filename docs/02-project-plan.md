# 02 — Project plan

Six phases. Each one ends at a gate: a demonstrable deliverable plus a sign-off. Nothing in a later
phase starts before its stated dependency clears, because every one of those dependencies is a place
where rework would otherwise be guaranteed.

Effort is given in **working days of delivery time**, excluding client review turnaround.

---

## Phase map

```
Phase 0  Discovery ─────────┐
                            ▼
Phase 1  Brand foundation & digital presence  ◄── LIVE, awaiting client sign-off
                            │
                            ▼
Phase 2  Content & multi-page expansion
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
Phase 3  Authority content        Phase 4  Conversion & analytics
              └─────────────┬─────────────┘
                            ▼
Phase 5  Scale & maintain (continuous)
```

Phases 3 and 4 can run in parallel once Phase 2 closes — they touch different parts of the site
(content pages vs. instrumentation and CTAs) and have no shared blocking dependency.

---

## Phase 0 — Discovery & foundation inputs

**Status:** ✅ Complete (23 Aug 2026) · **Effort:** 1 day

| Deliverable | Where it landed |
|---|---|
| Full extraction of the 8-page company deck: every heading, service, bullet, name and contact string | Feeds all content in `index.html` |
| Brand colour sampling — pixel-level histogram of all 8 rendered pages | [04-brand-design-system.md](04-brand-design-system.md#2-colour-scheme) |
| Typography analysis and web-font substitution | [04-brand-design-system.md](04-brand-design-system.md#3-typography) |
| Logo, monogram, favicon and trainer portraits extracted from the deck at 5× render scale | `assets/img/` |
| Keyword universe and intent map | [06-keyword-research.md](06-keyword-research.md) |
| Royalty-free image sourcing and licence verification | [09-image-asset-strategy.md](09-image-asset-strategy.md) |

**Gate:** the deck's content is fully accounted for — nothing in it is lost, and every claim on the
site traces back to a line in it.

---

## Phase 1 — Brand foundation & digital presence

**Status:** ✅ **Live** (24 Aug 2026), awaiting client sign-off · **Effort:** 5 days

The phase the client asked for first: lock the colour scheme, typography and design language, and put
a real, credible presence on the public web so brand decisions are made against something live rather
than against a mock-up.

### Deliverables

| # | Deliverable | Artefact |
|---|---|---|
| 1.1 | Design token layer — colour, type, space, radius, shadow, motion | `assets/css/brand.css` §1 |
| 1.2 | Accessible colour scheme with measured WCAG ratios for every pairing | [04 §2](04-brand-design-system.md#2-colour-scheme) |
| 1.3 | Three-family typographic system, self-hosted, subset, 308 KB total | `assets/css/fonts.css`, `assets/fonts/` |
| 1.4 | Logo asset set: full lockup (transparent), horizontal lockup, monogram, favicons, app icons | `assets/img/logo-*.png`, `icon-*.png` |
| 1.5 | Component library: buttons, cards, service cards, pillars, trainer cards, process steps, trust bar, industry tiles, accordion, CTA, footer | `assets/css/brand.css` §5–12 |
| 1.6 | One-page brand site covering all eight deck pages | `index.html` |
| 1.7 | Design-system sign-off page rendered from the *live* production CSS | `brand.html` |
| 1.8 | Branded 404 page | `404.html` |
| 1.9 | On-page SEO base: title, description, canonical, OG/Twitter, `sitemap.xml`, `robots.txt`, manifest | root files + `<head>` |
| 1.10 | Structured data: `Organization` + `ProfessionalService`, `WebSite`, two `Person`, `OfferCatalog` (6 services), `FAQPage` (6 Q&As) | `index.html` JSON-LD |
| 1.11 | Optimised, self-hosted, licensed imagery — WebP + JPEG, explicit dimensions, lazy below the fold | `assets/img/` |
| 1.12 | Deployment to GitHub Pages + a validation gate run by both CI and the developer | `.github/workflows/deploy-pages.yml`, `scripts/check-links.mjs` |
| 1.14 | Performance pass on the live URL: responsive images, scrim-aware compression, forced-reflow fix | mobile 86–98 (median 96) / 100 / 100 / 100, CLS 0 |
| 1.13 | This documentation set | `docs/` |

### Deliberate technical decisions

| Decision | Reason |
|---|---|
| **Self-host Bootstrap and all webfonts** | Removes two cross-origin connections from the critical path, improves LCP, and nothing breaks if a CDN does. The site had zero third-party requests until GA4 was added on 24 Aug 2026; that is now the single exception, and the rule still holds for everything else. |
| **Single page, anchor-navigated** | Phase 1's job is brand sign-off and a credible presence, not topical coverage. Splitting into thin pages before the content exists would create pages with nothing to rank on. Phase 2 splits them once each has real depth. |
| **Design tokens before components** | A colour or type change in Phase 3 must be a one-line edit, not a find-and-replace across pages. |
| **Orange `#B4540A` for CTA fills, `#E46C0A` for accents** | The deck's signature orange only reaches 3.3:1 behind white text. Splitting the role keeps the brand colour visible *and* the buttons AA-compliant. Full reasoning in [04 §2](04-brand-design-system.md#the-one-rule-that-keeps-this-palette-accessible). |
| **FAQ section with `FAQPage` schema** | The cheapest available route to long-tail visibility and rich results, and it answers the questions a plant engineer actually types. |

### Gate — Phase 1 exit criteria

- [ ] Client signs off colour scheme on `brand.html`
- [ ] Client signs off typography on `brand.html`
- [ ] Client confirms every service description and claim on `index.html` is accurate
- [ ] Client confirms both trainers consent to their photograph and biography being published
- [x] Site is live on GitHub Pages and reachable
- [x] Definition of Done gate passed ([10](10-qa-definition-of-done.md)) — Lighthouse and structured data measured on the live URL
- [ ] Site verified in Google Search Console and `sitemap.xml` submitted

---

## Phase 2 — Content & multi-page expansion

**Status:** ⏳ Next · **Effort:** 8–10 days · **Depends on:** Phase 1 sign-off

Turning one page into a site with enough surface area to rank for more than the brand name.

### Deliverables

| # | Deliverable | Notes |
|---|---|---|
| 2.1 | Multi-page IA build-out per [05-information-architecture.md](05-information-architecture.md) | 6 service pages, the conveyor specialism page (**build first** — most winnable), 6 industry pages, 3 training pages, About, Contact |
| 2.2 | 700–1,200 words of genuinely useful copy per page | Each page owns one primary keyword; no two pages compete |
| 2.3 | Shared header/footer without a build step | Static includes are impossible on Pages; use a small documented HTML partial convention or add a lightweight generator (11ty) — **decision required at phase start** |
| 2.4 | Working contact form | GitHub Pages cannot process POST. Options: Formspree, Web3Forms, Google Forms embed. Evaluate on spam handling, GDPR/DPDP posture and free-tier limits |
| 2.5 | Custom domain + HTTPS | Unblocks a root-level `robots.txt`, a real brand email, and `LocalBusiness` schema |
| 2.6 | Google Business Profile | **Blocked** until the client confirms a publishable business address |
| 2.7 | Real photography to replace stock in the top three positions | Hero, About and both trainer portraits — see [09](09-image-asset-strategy.md#replacement-priority) |
| 2.8 | Vector logo originals integrated (SVG) | Replaces the raster extractions |
| 2.9 | Case studies / anonymised results | 2–3 minimum. The single highest-value content asset available and the only one that cannot be substituted |
| 2.10 | `BreadcrumbList` + per-page `Service` schema | Follows from the multi-page IA |

### Gate

- [ ] Every page passes the Definition of Done
- [ ] Internal linking audit: no orphan pages, every page reachable within two clicks of home
- [ ] `sitemap.xml` regenerated and submitted to Google Search Console
- [ ] Contact form delivers a test message end to end

---

## Phase 3 — Authority content & organic growth

**Status:** Planned · **Effort:** ongoing, ~3 days/month · **Depends on:** Phase 2

Ranking for "conveyor belt consultant" is won by being the most useful answer to the hundred questions
that surround it, not by optimising one page harder.

### Deliverables

| # | Deliverable | Notes |
|---|---|---|
| 3.1 | `/insights/` article hub with `Article` + `BreadcrumbList` schema | |
| 3.2 | Pillar-and-cluster content programme | Pillars and clusters defined in [08 §3](08-content-strategy.md#3-content-pillars) |
| 3.3 | 2 articles/month against the Tier-2/Tier-3 keyword set | SME review is the bottleneck — plan around it |
| 3.4 | Lead magnets: conveyor inspection checklist, belt-failure diagnostic table, 5S audit sheet | Gated or ungated — decide with the client; ungated ranks, gated converts |
| 3.5 | LinkedIn syndication programme | The client's LinkedIn is the strongest existing distribution channel; see [08 §5](08-content-strategy.md#5-distribution--organic-reach) |
| 3.6 | Digital PR / backlink outreach | Industry associations, supplier directories, guest articles in bulk-handling publications |
| 3.7 | Internal link graph maintenance | Every new article links up to its pillar and sideways to two siblings |

### Gate

- [ ] 12+ indexed articles
- [ ] Non-brand organic sessions growing month on month for three consecutive months
- [ ] At least 5 referring domains

---

## Phase 4 — Conversion & analytics

**Status:** Planned · **Effort:** 3 days + ongoing · **Can run parallel to Phase 3**

### Deliverables

| # | Deliverable | Notes |
|---|---|---|
| 4.1 | Google Search Console — verified, sitemap submitted, coverage monitored | ⛔ **Still outstanding.** Should have been done the day the custom domain went live |
| 4.2 | Analytics with a documented consent posture | ✅ **GA4 `G-HFWSCJXX0Y` installed 24 Aug 2026** on `index.html` and `404.html`. The consent posture is **not** yet decided — GA4 sets cookies, so a privacy notice is now owed. See [10, known limitation 14](10-qa-definition-of-done.md#known-limitations-at-phase-1-close) |
| 4.3 | Conversion events: phone tap, email click, form submit, lead-magnet download | |
| 4.4 | CTA and conversion-rate optimisation pass | Hero CTA wording, mid-page CTAs on long articles, sticky mobile call button |
| 4.5 | Core Web Vitals field monitoring | Lab scores are already good; field data is the one that ranks |
| 4.6 | Monthly performance report template | Sessions, queries, positions, conversions, top pages |

### Gate

- [ ] All four conversion events firing and verified
- [ ] One full month of clean data
- [ ] First monthly report delivered

---

## Phase 5 — Scale & maintain

**Status:** Continuous · **Effort:** ~2 days/month

| # | Deliverable |
|---|---|
| 5.1 | Quarterly content refresh — update, merge or retire underperforming pages |
| 5.2 | Quarterly technical SEO audit — crawl, broken links, schema validation, index coverage |
| 5.3 | Dependency maintenance — Bootstrap and font updates, re-run the QA gate after each |
| 5.4 | Performance budget enforcement — see [10 §4](10-qa-definition-of-done.md#4-performance-budget) |
| 5.5 | Seasonal training-calendar landing pages |
| 5.6 | Optional: Hindi/Bengali localisation with `hreflang` (charter-flagged, not committed) |

---

## Dependency summary

| This… | …cannot start before |
|---|---|
| Any Phase 2 page build | Phase 1 design sign-off — otherwise every page is rebuilt |
| `LocalBusiness` schema, Google Business Profile | Client confirms a publishable address |
| Root-level `robots.txt` control | Custom domain |
| Case studies (2.9) | Client permission from the named end clients |
| Analytics (4.2) | Consent posture decision |
| Article programme (3.3) | `/insights/` hub (3.1) and SME review capacity |
