# 04 — Brand & design system

**Version 1.1 · 24 August 2026 · awaiting client sign-off**

Live, interactive version: **[`brand.html`](../brand.html)** — that page is rendered from the same
production CSS the site uses, so what you approve there is literally what ships.
Machine-readable source of truth: **[`assets/css/brand.css`](../assets/css/brand.css)**.

---

## 1. Where this came from

Nothing here was invented. The palette was sampled by building a per-pixel colour histogram across
all eight pages of `LALSNIG EXCELLENCE CONSULTANCY.pdf` rendered at 1267×979, discarding
near-neutral pixels, and ranking what remained. The typography was matched by visual analysis of the
deck's rendered glyphs (the embedded fonts are subset and anonymised as `CIDFont+F1…F7`, so the names
were not recoverable from the file).

Two colours were then **adjusted**, and only two, because the deck's originals fail WCAG 2.1 AA on a
white background. Those adjustments are documented in §2 with their measured ratios. Everything else
is the deck's own colour.

---

## 2. Colour scheme

### 2.1 Brand core — navy

Navy is the brand's ground. It carries authority and reads as engineering rather than marketing. Used
for the header bar, hero, expertise band, CTA panel and footer.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--ls-navy-900` | `#071729` | Deepest ground, footer | white **18.05:1** AAA |
| `--ls-navy-800` | `#0B1F35` | **Primary brand surface** | white **16.65:1** AAA |
| `--ls-navy-700` | `#17375E` | Secondary navy, card headers | on white **12.04:1** AAA |
| `--ls-navy-600` | `#1F497D` | Link colour | on white **9.10:1** AAA |
| `--ls-navy-500` | `#376092` | Service accent (steel) | on white **6.46:1** AA |
| `--ls-navy-400` | `#4D76B8` | Decorative only | — |
| `--ls-navy-100` | `#E4EAF2` | Chip borders | — |
| `--ls-navy-050` | `#F2F5F9` | Chip fills, accordion active | — |

### 2.2 Brand accents — gold and orange

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--ls-gold-500` | `#C5912B` | **Logo gold.** Rules, borders, dark-background text | on navy **5.91:1** AA · **on white 2.82:1 — FAILS** |
| `--ls-gold-400` | `#E0A93F` | Eyebrow labels on navy | on navy **7.86:1** AAA |
| `--ls-gold-700` | `#8A6516` | **Gold text on light backgrounds** | on white **5.31:1** AA |
| `--ls-amber-500` | `#FFC000` | Hero highlight (deck's "Eliminate Waste") | on navy **10.14:1** AAA |
| `--ls-orange-500` | `#E46C0A` | **Signature accent.** Icons, rules, focus ring, highlight text on navy | on navy **5.11:1** AA · on white 3.26:1 (large/decorative only) |
| `--ls-orange-400` | `#F58900` | Hover accent on navy | on navy **6.71:1** AA |
| `--ls-orange-700` | `#B4540A` | **CTA button fill** | white on it **4.98:1** AA |
| `--ls-orange-800` | `#9C4708` | CTA hover | white on it **6.33:1** AA |
| `--ls-orange-050` | `#FDF1E6` | Callout background | — |

### The one rule that keeps this palette accessible

> **Gold and orange are dark-background colours.**

On navy both clear AA comfortably. On white, `#C5912B` reaches only 2.82:1 and `#E46C0A` only 3.26:1
— under the 4.5:1 minimum for body text and under 3:1 for large text in the gold's case. So on light
surfaces:

- gold **text** → `--ls-gold-700` (`#8A6516`, 5.31:1)
- CTA **fills** behind white text → `--ls-orange-700` (`#B4540A`, 4.98:1)
- `#E46C0A` stays in use for rules, icons, bullet marks and the focus ring, where 3:1 for
  non-text contrast is the applicable threshold and it passes at 3.26:1

This is why the site's buttons look slightly deeper than the deck's orange. It is deliberate, it is
the only way to keep the brand orange visible *and* the buttons legible, and reverting it would fail
an accessibility audit.

### 2.3 Service-family accents

Carried over from the deck's colour-coded service cards so the website's services map visually onto
the deck the client already hands out.

| Token | Hex | Deck origin | On white |
|---|---|---|---|
| `--ls-plum-600` | `#604A7B` | Design & Review · Maintenance Support | 7.60:1 AAA |
| `--ls-steel-600` | `#376092` | Troubleshooting & RCA · Safety & Compliance | 6.46:1 AA |
| `--ls-clay-600` | `#8C3F3D` | Performance Improvement · Training | 7.26:1 AAA |
| `--ls-teal-600` | `#215968` | Improve & Sustain (process step 5) | 7.80:1 AAA |
| `--ls-blush-300` | `#E6B9B8` | Deck tint — **decorative only, never behind text** | 1.75:1 |

> The deck used `#E6B9B8` blush as a *card header* colour with white text on it — that pairing is
> 1.75:1 and effectively illegible. The website replaces it with `--ls-clay-600` for the same cards.

### 2.4 Neutrals

| Token | Hex | Role |
|---|---|---|
| `--ls-white` | `#FFFFFF` | Page ground |
| `--ls-grey-050` | `#F7F8FA` | Alternating section band |
| `--ls-grey-100` | `#EEF1F5` | Media placeholder |
| `--ls-grey-200` | `#E1E6ED` | Default border |
| `--ls-grey-300` | `#D8DEE7` | Hover border; muted text **on navy** (12.30:1) |
| `--ls-grey-500` | `#8A96A6` | Muted text on navy only (5.54:1) |
| `--ls-grey-600` | `#5A6675` | Secondary text on white (5.85:1 AA) |
| `--ls-grey-700` | `#4A5563` | **Body copy on white** (7.58:1 AAA) |
| `--ls-grey-900` | `#2A3442` | Highest-emphasis neutral |

### 2.5 Semantic roles

Components reference these, never raw ramps. Re-theming the site is a matter of repointing this block.

```css
--ls-bg / --ls-bg-subtle / --ls-bg-inverse
--ls-text / --ls-text-muted / --ls-text-on-inverse / --ls-text-on-inverse-muted
--ls-border / --ls-border-strong
--ls-accent / --ls-accent-cta / --ls-accent-cta-hover / --ls-focus
```

### 2.5b Tinting a brand colour — darken, never lighten

The numbered chips on the service cards originally used `rgba(255,255,255,.16)` over the card's
accent. Lightening the background under white text destroys contrast: it took the gold card to
**3.83:1** (a fail) and the steel card to **4.50:1** (a hair over the line). `rgba(0,0,0,.16)`
darkens instead, taking the worst case to **6.88:1**, and looks the same.

| Accent | White 16% tint | Black 16% tint |
|---|---|---|
| `--ls-gold-700` | 3.83 ✗ | **6.88** ✓ |
| `--ls-steel-600` | 4.50 ~ | **8.14** ✓ |
| `--ls-plum-600` | 5.05 | **9.40** |
| `--ls-clay-600` | 4.99 | **9.02** |
| `--ls-teal-600` | 5.17 | **9.57** |
| `--ls-navy-700` | 7.43 | **13.71** |

**Rule: when overlaying a chip or badge on a brand accent that carries white text, tint with black,
not white.** Both were found by running axe against the deployed page, not by eye — a 4.50 and a
3.83 look completely fine.

### 2.5c Inline `<code>` on dark sections

Bootstrap's `--bs-code-color` is repointed to `--ls-navy-600`, which reads well on white and is
**1.83:1** on a navy ground. `.ls-section--inverse code` and `.ls-footer code` therefore switch to
`--ls-gold-400` (7.86:1).

### 2.6 Colour proportion

Roughly 60 / 25 / 10 / 5 — white and near-white ground, navy structure, gold and orange accent,
service colours as identifiers. Accent colours mark *one* thing per view. If two things on screen are
orange, one of them is wrong.

---

## 3. Typography

Three families, all SIL Open Font Licence, all self-hosted from `assets/fonts/`, all subset to
latin + latin-ext. **Total webfont payload: 308 KB across 10 files, zero third-party requests.**

### 3.1 The families

| Role | Family | Weights | Why |
|---|---|---|---|
| Display / headings | **Barlow Semi Condensed** | 600, 700 | Matches the deck's condensed uppercase section bars. Industrial voice, and it fits long technical headings ("Troubleshooting and root cause analysis") without dropping to a smaller size. |
| Body / UI | **Inter** (variable 100–900) | 400–700 | Large x-height and open apertures keep dense engineering copy readable at 17 px on a phone. Shipped as one variable file rather than four statics. |
| Serif accent | **Cormorant Garamond** | 600, 600 italic | Echoes the serif wordmark in the logo. Reserved for pull-quotes and the "Trainer name:" label — **never body copy**. |

The deck itself is set in a Calibri-class humanist sans. Inter is the closer screen face; if exact
metric fidelity to the deck ever matters (for print collateral generated from the same tokens),
**Carlito** is the metric-compatible Calibri clone and is also on Google Fonts.

### 3.2 The scale

Fluid, with `clamp()`. No breakpoint-specific font sizes anywhere — type moves continuously with the
viewport, so there is no size that only exists at one width and never got tested.

| Token | Clamp | Renders |
|---|---|---|
| `--ls-fs-hero` | `clamp(2.5rem, 1.45rem + 4.2vw, 4.5rem)` | 40 → 72 px |
| `--ls-fs-h1` | `clamp(2rem, 1.45rem + 2.2vw, 3.25rem)` | 32 → 52 px |
| `--ls-fs-h2` | `clamp(1.625rem, 1.3rem + 1.3vw, 2.5rem)` | 26 → 40 px |
| `--ls-fs-h3` | `clamp(1.25rem, 1.13rem + 0.5vw, 1.625rem)` | 20 → 26 px |
| `--ls-fs-h4` | `clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem)` | 17 → 19 px |
| `--ls-fs-lede` | `clamp(1.0625rem, 1.01rem + 0.28vw, 1.3125rem)` | 17 → 21 px |
| `--ls-fs-body` | `1.0625rem` | 17 px |
| `--ls-fs-sm` | `0.9375rem` | 15 px |
| `--ls-fs-xs` | `0.8125rem` | 13 px |

**17 px body, not 16.** This site's copy is technical and read on phones in industrial settings. The
extra pixel is worth more than the line it costs.

### 3.3 Line height, tracking, measure

| Property | Value | Applies to |
|---|---|---|
| `--ls-lh-tight` | 1.08 | Hero headline |
| `--ls-lh-snug` | 1.22 | All headings |
| `--ls-lh-body` | 1.68 | Body copy |
| `--ls-ls-display` | −0.01em | Headings — condensed faces tighten naturally at size |
| `--ls-ls-eyebrow` | 0.14em | Uppercase eyebrow labels |
| `--ls-ls-caps` | 0.06em | Uppercase labels and small caps |
| Measure | 62ch (`.ls-lede`), 68ch (`.ls-section-head`) | Anything that is read rather than scanned |

`text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs — prevents single-word orphan
lines without manual `<br>` tags that break at other widths.

### 3.4 Loading strategy

- Every face declares `font-display: swap` — text paints immediately in the fallback, never invisible.
- The two critical faces (Inter variable latin, Barlow 700 latin) are `<link rel="preload">`ed.
- Fallback stacks are chosen for similar metrics so the swap is not jarring:
  Barlow → Arial Narrow → Helvetica Neue; Inter → system UI stack; Cormorant → Iowan Old Style → Georgia.

---

## 4. Space, radius, elevation

### Spacing scale — 4 px base, 8 px rhythm

| Token | Value | Used for |
|---|---|---|
| `--ls-space-1…3` | 4 / 8 / 12 px | Icon gaps, tight inline spacing |
| `--ls-space-4` | 16 px | Inline gaps, list rhythm |
| `--ls-space-5` | 24 px | Card padding, grid gutters |
| `--ls-space-6` | 32 px | Panel padding |
| `--ls-space-7` | 48 px | Section-head bottom margin |
| `--ls-space-8/9` | 64 / 96 px | Large separations |
| `--ls-section-y` | `clamp(3.5rem, 2rem + 5vw, 6.5rem)` | Section vertical padding, 56 → 104 px |

**Grid gutter constraint.** Bootstrap rows apply negative horizontal margins equal to half their
gutter, and `.container` applies matching positive padding. A row whose gutter exceeds the
container's overflows the viewport. Because `.ls-container` is fluid up to 1200 px, this bit us: `g-5`
rows overflowed by 12 px at every width. **Rule: horizontal gutters never exceed `g-4`. For extra
vertical air use `gy-5`, which changes no horizontal geometry.**

### Radius

`--ls-radius-sm` 6 px · `--ls-radius` 12 px · `--ls-radius-lg` 20 px · `--ls-radius-pill` 999 px

### Elevation

Three levels only. Shadows are tinted navy (`rgba(11,31,53,…)`), never neutral black — black shadows
on a navy-and-white palette read as dirt.

| Token | Use |
|---|---|
| `--ls-shadow-1` | Resting card, stuck header |
| `--ls-shadow-2` | Hover / lifted state |
| `--ls-shadow-3` | Modal or overlay (reserved) |

---

## 5. Logo

| File | Use |
|---|---|
| `logo-horizontal.png` (1043×300) | **Header and footer.** Mark + wordmark, tagline removed |
| `logo-lalsnig-consulting.png` (1000×1055) | Full stacked lockup — hero card, `Organization` schema, print |
| `logo-lalsnig-consulting-420.png` | Same, web-sized |
| `logo-mark.png` (600×329) | Monogram alone, for small or square placements |
| `icon-512 / icon-192 / apple-touch-icon / favicon-32` | App and tab icons — mark knocked out white on navy |

### Rules

**Do**
- Keep clear space equal to the height of the "L" on all four sides.
- Minimum 120 px wide on screen, 30 mm in print.
- On any background darker than `--ls-grey-100`, place the logo on a **white chip** with
  `--ls-radius` corners — exactly as the deck's cover does.
- Use the horizontal lockup anywhere the logo will render under ~150 px tall. The stacked lockup's
  "EXCELLENCE | TRANSFORMATION | SUSTAINABLE GROWTH" strip becomes an illegible smudge below that.

**Don't**
- Recolour, outline, rotate, or add effects to the mark.
- Place the transparent logo directly on a photograph.
- Re-typeset the wordmark. It is artwork, not live text.
- Use the stacked lockup in the header.

> **Open action.** Every logo file here is a raster extraction from the deck, produced by a
> border-seeded flood fill that removes the white surround while preserving the white detail inside
> the faces. It is good enough for the web at these sizes and **not** good enough for print, large
> format, or embroidery. Vector originals are requested — see
> [checklist item 6](03-progress-checklist.md#open-items-needing-the-client-).

---

## 6. Iconography

- Line icons, 2 px stroke, round caps and joins, 24×24 viewBox.
- Delivered as one inline `<symbol>` sprite at the top of `<body>`, referenced with `<use>` — no icon
  font, no extra request, and icons inherit `currentColor`.
- Icons are decorative: every one carries `aria-hidden="true"` and sits beside real text.

---

## 7. Motion

| | |
|---|---|
| Easing | `cubic-bezier(.22, .61, .36, 1)` — fast out, settle in |
| Duration | 280 ms for state changes, 500–600 ms for reveals |
| Reveal | 18 px rise + fade, triggered by `IntersectionObserver`, unobserved after firing |
| Hover | 2–4 px lift plus shadow step; images scale 4.5% inside their frame |

Under `prefers-reduced-motion: reduce`: reveals render immediately at full opacity, smooth scrolling
is disabled, and all transitions and animations collapse to 0.001 ms.

---

## 8. Accessibility commitments

| Commitment | How it is met |
|---|---|
| WCAG 2.1 AA on all text | Every pairing in §2 measured; the two failures replaced |
| Visible focus | 3 px `--ls-orange-500` ring, 3 px offset — 5.11:1 on navy, 3.26:1 on white, both above the 3:1 non-text minimum |
| Keyboard reachable | Skip link, logical DOM order, native interactive elements throughout |
| Screen-reader structure | Landmarks (`header`/`nav`/`main`/`footer`), one `h1`, no heading-level skips, `aria-label` on both navs, `aria-labelledby` on every section |
| No layout shift | Explicit `width`/`height` or `aspect-ratio` on every image |
| Reduced motion | Honoured (§7) |
| Text alternatives | Descriptive alt text on content images; `alt=""` on decorative ones |
| Colour is never the only signal | Service cards carry a number and a label as well as a colour |

---

## 9. Extending the system

1. **Never write a raw colour, size or spacing value in a component.** If the value you need does not
   exist as a token, add the token.
2. **Check contrast before adding a colour pairing.** The measurement script pattern is in
   [10-qa-definition-of-done.md](10-qa-definition-of-done.md#3-accessibility).
3. **Prefer restyling a Bootstrap component through its own CSS variables** over overriding its
   selectors — the accordion in `brand.css` §11b is the reference example.
4. **Horizontal row gutters never exceed `g-4`.** See §4.
5. **Add the component to `brand.html`** in the same commit. A component that is not on the style
   guide will be reinvented by the next person.
6. **Tint chips and badges with black, never white** — see [§2.5b](#25b-tinting-a-brand-colour--darken-never-lighten).
7. **Run `node scripts/check-links.mjs` before pushing.** It catches heading skips, missing `alt`,
   images without dimensions and broken references — all of which are design-system failures as
   much as code ones.
