# 05 — Information architecture

---

## 1. Phase 1 (live) — one page, anchor-navigated

Phase 1's job is brand sign-off and a credible presence. Splitting into a dozen thin pages before the
content has depth would have produced a dozen pages with nothing to rank on, and would have had to be
rewritten in Phase 2 anyway.

```
/                       index.html   — the whole deck, in order, as one narrative
  #about                About us + credentials              (deck p3/p4)
  #services             Six business-excellence services    (deck p5 + p4)
  #specialism           Conveyor & bulk handling practice   (deck p3/p4)
  #expertise            How we work / what clients buy      (deck p6)
  #industries           Six industry tiles                  (deck p6)
  #process              Five-step process + six outcomes    (deck p7)
  #team                 Two trainer cards                   (deck p2)
  #why-us               Why choose us + commitment quote    (deck p8)
  #faq                  Seven Q&As                          (new — SEO)
  #contact              CTA + contact details               (deck p8)

/brand.html             Design-system sign-off page (noindex)
/404.html               Branded not-found page (noindex)
```

**Deck coverage: 8 of 8 pages.** Nothing in the client's deck was dropped.

### Narrative order and why

| Order | Section | The question it answers |
|---|---|---|
| 1 | Hero | What is this and is it for me? |
| 2 | Trust bar | What do I get? |
| 3 | About | Who are you and do you actually know this? |
| 4 | Services | What exactly do you do? |
| 5 | Specialism | Do you actually know my equipment? |
| 6 | Expertise | Why you and not a manufacturer's rep? |
| 7 | Industries | Have you worked in my sector? |
| 8 | Process | What happens if I call? |
| 9 | Team | Who will actually turn up? |
| 10 | Why us | Why choose you over the alternative? |
| 11 | FAQ | The things I would have emailed to ask |
| 12 | Contact | How do I start? |

Credibility (3, 6, 9) is deliberately interleaved with capability (4, 5, 7) rather than stacked. A
visitor who bounces at any point should have met at least one reason to believe.

---

## 2. Phase 2 target sitemap

```
/                                          Home — narrative overview, links into everything
├── /about/                                Story, credentials, both trainers, commitment
├── /services/                             Hub — six cards linking down
│   ├── /lean-manufacturing/
│   ├── /lean-six-sigma/
│   ├── /industrial-engineering/
│   ├── /data-analytics/
│   ├── /training-competency/
│   └── /maintenance-reliability/
├── /specialism/                           Specialist practice hub
│   └── /conveyor-bulk-handling/           PRIORITY: most winnable page on the site
├── /training/                             Hub — capability pillars
│   ├── /lean-manufacturing/
│   ├── /lean-six-sigma/
│   └── /industrial-engineering/
├── /industries/                           Hub
│   ├── /mining-minerals/
│   ├── /power-plants/
│   ├── /cement/
│   ├── /steel-metals/
│   ├── /ports-logistics/
│   └── /aggregates/
├── /insights/                             Article hub (Phase 3)
│   └── /{article-slug}/
├── /contact/                              Form + details + response commitment
└── /404.html
```

**Crawl depth: 3 maximum.** Every page is reachable within two clicks of home.

The fifth deck capability pillar — *Web Design & Development* — stays on the home page as a paragraph
under the services grid and does **not** get its own page. It is a genuine service, but giving it a
page would split the site's topical identity between "business excellence" and "web agency", and the
first is what this business needs to be known for. Revisit if it becomes a revenue line.

> ### `/services/` vs `/training/` — deliberate, and a cannibalisation risk
> Three names appear in both hubs. They are different pages with different intent, and they must stay
> that way: `/services/lean-manufacturing/` targets **`lean manufacturing consultant`** (buy a
> project), `/training/lean-manufacturing/` targets **`on-site lean manufacturing training`** (buy a
> programme). Different buyer, different page, different primary keyword — see
> [06 §3](06-keyword-research.md#3-page-to-keyword-map).
>
> **If the two drafts start saying the same thing, merge them.** Two pages splitting one intent is
> keyword cannibalisation and neither will rank.

---

## 3. Navigation

### Primary (header)

Phase 1: `About · Services · Specialism · Industries · Process · Team` + a **Get in touch** button.

Phase 2: same labels, now pointing at pages, with dropdowns on Services / Specialism / Industries.
**Maximum seven items.** Adding an eighth means something else comes out.

The CTA button is visually distinct from the nav links and is the only orange element in the header —
one primary action per view.

### Footer

Four columns: brand + positioning · Explore (section/page links) · Services (six lines plus the
specialism) · Contact (phone, email, LinkedIn). Bottom bar carries copyright, the image-licence link, and a link to
the design system.

Footer links are real navigation, not an SEO dumping ground.

### Mobile

Collapsed hamburger below `lg` (992 px). The menu closes automatically after an in-page jump.
Phase 4 adds a sticky call button — on a phone, in a plant, the tap target should always be visible.

---

## 4. Page templates (Phase 2)

### Service page

```
Breadcrumb
H1 — primary keyword
Lede — the problem in the client's words
Hero image (sector-relevant)
H2 — What this covers          (deliverables, as a list)
H2 — When you need it          (symptoms, so the reader self-identifies)
H2 — How we work               (the 5-step process, service-specific)
H2 — What you get              (outputs: report, drawings, plan, training records)
H2 — Related services          (3 internal links)
CTA panel
FAQ (3-4, service-specific, in FAQPage schema)
```

### Industry page

```
Breadcrumb
H1 — business excellence consultant for {sector}
Lede — what breaks in this sector specifically
Hero image (sector)
H2 — Typical challenges in {sector}
H2 — How we help               (links to the relevant service pages)
H2 — Sector considerations     (material characteristics, duty cycle, regulatory)
H2 — Case example              (when available)
CTA panel
```

### Training page

```
Breadcrumb
H1 — primary keyword
Lede — the capability gap this closes
H2 — Programme outline         (modules)
H2 — Who it is for
H2 — Duration and delivery     (on-site / in-house / hybrid)
H2 — What participants take away
H2 — Trainer                   (links to /about/)
CTA panel
```

### Article

```
Breadcrumb
H1 — the question, as asked
Byline + date + review date
Lede — the short answer, in the first paragraph
H2 sections — the long answer, with diagrams and tables
H2 — Key takeaways
Author bio card
Related articles (3)
CTA — relevant service page
```

---

## 5. URL conventions

- Lowercase, hyphenated, trailing slash on directory-style paths
- No dates in article URLs — an article that stays current should not look stale
- No `/blog/` — `/insights/` positions the content as expertise rather than news
- Slugs read as the keyword: `/services/lean-manufacturing/`, `/specialism/conveyor-bulk-handling/`
- **Never change a live URL.** GitHub Pages cannot issue a 301; a change costs a client-side redirect
  page plus a Search Console change-of-address, and leaks authority either way.

---

## 6. Internal linking rules

| Rule | Reason |
|---|---|
| Every page links to at least three others, with descriptive anchor text | Distributes authority, aids discovery |
| Every page is linked from at least two others | No orphans |
| Service pages link to relevant industry pages, and back | Builds two topical clusters that reinforce each other |
| Articles link **up** to their pillar and **sideways** to two siblings | Standard pillar-cluster topology |
| Home links to every hub; hubs link to every child | Guarantees crawl depth ≤ 3 |
| Anchor text is the target's primary keyword, varied naturally | Relevance signal without looking manufactured |
