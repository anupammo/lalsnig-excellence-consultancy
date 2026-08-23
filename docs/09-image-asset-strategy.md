# 09 — Image & asset strategy

---

## 1. Licensing position

Every photograph on this site comes from **[Pexels](https://www.pexels.com/license/)** under the
Pexels licence:

- Free for commercial use
- No attribution required
- Modification permitted

**We credit anyway.** The footer links to the Pexels licence and this manifest records the source URL
for every file. It costs nothing, it is the decent thing to do, and it means that in eighteen months
nobody has to reverse-image-search their way to proving the site is clean.

### Rules

| Rule | Why |
|---|---|
| **Self-host every image.** Never hotlink a CDN URL | Hotlinks break silently, leak referrer data, and add a third-party request to the critical path |
| **Record the source URL before using a file** | Provenance you cannot reconstruct later is provenance you do not have |
| **Never use an image of an identifiable person to imply they are a client, employee or customer** | Model-release and misrepresentation exposure. The only identifiable people on this site are the two trainers, from the client's own deck |
| **Never use a photograph containing a visible third-party logo, brand or trademark** | Implied endorsement |
| **Never use AI-generated imagery of "our team" or "our work"** | It is a misrepresentation, and it reads as one |
| **Prefer the client's own photographs over stock, always** | Stock is a ceiling on trust, not a substitute for evidence |

Prohibited sources: Google Image search results, competitor websites, manufacturer catalogues,
Pinterest, and any "free stock" aggregator that does not state a licence on the file's own page.

Acceptable alternatives to Pexels if more variety is needed: **Unsplash** (Unsplash licence),
**Pixabay** (Pixabay content licence), **Burst**, **StockSnap**, **Openverse** (check the per-image
licence — it aggregates several, including some with attribution requirements).

---

## 2. Image manifest — Phase 1

All files live in `assets/img/`. Every entry exists as a `.webp` and a `.jpg` fallback at the stated
crop.

### Hero and section bands

| File | Size | Pexels source | Subject | Placement |
|---|---|---|---|---|
| `hero-conveyor-coal` | 1920×1080 · 166/265 KB | [6595775](https://www.pexels.com/photo/coal-moving-on-conveyor-belts-6595775/) (Tom Fisk) | Aerial: stacker-reclaimer feeding a coal stockyard conveyor | Hero background — **the LCP image** |
| `band-conveyor-aerial` | 1920×823 · 177/256 KB | [6595788](https://images.pexels.com/photos/6595788/pexels-photo-6595788.jpeg) | Aerial: stockyard conveyor and stacker | Expertise band, 16% opacity |

### Industry tiles — 800×600 (4:3)

| File | Size | Pexels source | Subject |
|---|---|---|---|
| `industry-mining` | 137/137 KB | [60008](https://www.pexels.com/photo/brown-coal-energy-garzweiler-bucket-wheel-excavators-60008/) | Bucket-wheel excavator, open-pit bench |
| `industry-power-plant` | 65/74 KB | [7563985](https://www.pexels.com/photo/cooling-tower-of-power-plant-in-countryside-7563985/) (Sharath G.) | Thermal power plant cooling tower and stacks |
| `industry-cement` | 83/90 KB | [18845250](https://www.pexels.com/photo/cement-plant-surrounded-by-mountains-18845250/) | Cement plant: silos, inclined conveyors, stockpiles |
| `industry-ports-logistics` | 141/149 KB | [1427107](https://www.pexels.com/photo/aerial-view-photography-of-container-van-lot-1427107/) (Tom Fisk) | Container terminal, aerial |
| `industry-aggregates` | 70/86 KB | [18468425](https://www.pexels.com/photo/industrial-structures-at-a-cement-factory-18468425/) | Screening towers, chutes, transfer conveyors |
| `industry-steel-mill` | 32/50 KB | [8803230](https://www.pexels.com/photo/the-inside-of-a-steel-mill-8803230/) | Ladle handling, molten metal |

### Service and training — 900×600 (3:2)

| File | Size | Pexels source | Subject | Placement |
|---|---|---|---|---|
| `service-engineer-inspection` | 55/82 KB | [2760241](https://www.pexels.com/photo/man-wearing-orange-hard-hat-2760241/) (Kateryna Babaieva) | Engineer in hi-vis inspecting a large pulley shaft | About section |
| `conveyor-belt-operator` | 49/70 KB | [17315570](https://www.pexels.com/photo/worker-removing-sheets-of-leather-from-a-conveyor-belt-17315570/) | Operator at a running conveyor line | Why-us / commitment |
| `training-professionals-meeting` | 48/73 KB | [3184287](https://www.pexels.com/photo/professionals-having-a-meeting-3184287/) (fauxels) | Improvement team reviewing charts | Capability section |
| `analytics-dashboard-charts` | 41/66 KB | [265087](https://www.pexels.com/photo/business-charts-commerce-computer-265087/) | Laptop with performance charts | `brand.html` component demo |
| `service-workshop-maintenance` | 69/87 KB | [17156136](https://www.pexels.com/photo/man-working-in-workshop-17156136/) (Darry Lin) | Industrial workshop | **In library, not yet placed** — Phase 2 maintenance page |
| `service-engineer-tablet` | 36/60 KB | [32845694](https://www.pexels.com/photo/engineer-in-industrial-factory-using-tablet-32845694/) (Sergey Sergeev) | Engineer with tablet in a factory | **In library, not yet placed** — Phase 2 |
| `training-team-charts` | 74/99 KB | [6476260](https://www.pexels.com/photo/a-group-of-people-discussing-charts-6476260/) | Team discussing charts | **In library, not yet placed** — Phase 2 training pages |

> Where a photographer name is not listed, it was not verified at sourcing time. Open the linked photo
> page to read the current credit before using the file anywhere attribution is expected.

### Brand assets — derived from the client's own deck

| File | Size | Origin |
|---|---|---|
| `logo-horizontal.png` | 1043×300 | Composed from the deck lockup: monogram left, wordmark right, tagline strip removed |
| `logo-lalsnig-consulting.png` | 1000×1055 | Deck page 1 at 5× render, background removed by border-seeded flood fill |
| `logo-lalsnig-consulting-420.png` | 420×443 | Web-sized variant |
| `logo-mark.png` | 600×329 | Monogram alone |
| `icon-512 / icon-192 / apple-touch-icon / favicon-32` | .png | Mark knocked out white on `#0B1F35` |
| `trainer-ranjit-mondal` | 512×512 | Deck page 2, circular portrait, 5× render |
| `trainer-ruturaj-jadhav` | 512×512 | Deck page 2, circular portrait, 5× render |

**Payload:** 1.3 MB WebP · 1.8 MB JPEG fallback · 765 KB PNG brand assets. A visitor on a modern
browser downloads the WebP path only, and only the images their viewport reaches.

---

## 3. Alt-text rules

Alt text describes the image to someone who cannot see it. It is an accessibility feature that
happens to help SEO, never the other way round.

| Situation | Rule | Example |
|---|---|---|
| Content image | Describe what is shown, specifically. Relevant terms appear naturally because the subject *is* the topic | `Aerial view of a stacker-reclaimer feeding a coal stockyard conveyor system` |
| Decorative image | `alt=""` — so screen readers skip it | Expertise-band background |
| Logo | The organisation name | `LALSNIG Consulting logo` |
| Portrait | Name and role | `Portrait of Mr. Ranjit Mondal, conveyor belt and Lean Six Sigma consultant` |
| Image inside a link | Describe the destination, not the picture | — |
| Never | Keyword lists, `alt="image"`, `alt="photo"`, filenames, or a missing `alt` attribute | — |

Length: under ~125 characters. If it needs more, the information belongs in a caption or in the body.

---

## 4. Optimisation pipeline

Every source image passes through the same four steps. The Phase 1 set was processed with a Node
script using `@napi-rs/canvas`; any equivalent tool (Squoosh, sharp, ImageMagick) is fine as long as
the outputs match.

1. **Crop to the placement's aspect ratio** — 16:9 hero, 21:9 band, 4:3 industry tiles, 3:2 cards.
   Cropping at build time, not with CSS `object-fit` on an oversized file, is what keeps the bytes
   down.
2. **Resize to the largest rendered size**, not the source size. 1920 px wide is the maximum here;
   nothing needs more.
3. **Encode twice** — WebP q80 (served) and JPEG q78 (fallback).
4. **Serve via `<picture>`** with explicit `width`/`height`, `loading="lazy"` below the fold, and
   `fetchpriority="high"` with no `loading` attribute on the LCP image.

```html
<picture>
  <source srcset="assets/img/industry-cement.webp" type="image/webp">
  <img src="assets/img/industry-cement.jpg" width="800" height="600"
       loading="lazy" decoding="async"
       alt="Cement plant with silos, inclined conveyors and material stockpiles at sunset">
</picture>
```

### Budget

| Class | Max WebP | Max JPEG |
|---|---|---|
| Hero / band (1920 w) | 200 KB | 300 KB |
| Card (900 w) | 100 KB | 120 KB |
| Tile (800 w) | 150 KB | 160 KB |
| Portrait (512 w) | 30 KB | 50 KB |

Everything currently shipped is inside budget. Anything that is not gets re-encoded or re-cropped, not
waved through.

---

## 5. Replacement priority

Stock photography is a placeholder for evidence. Replace in this order as real material becomes
available — the top three matter far more than the rest combined.

| Priority | Replace | With | Why |
|---|---|---|---|
| **1** | `trainer-ranjit-mondal`, `trainer-ruturaj-jadhav` | Professional headshots | Both are low-resolution passport photographs upscaled from the deck. On a page selling expertise, the faces are the least convincing element on it |
| **2** | Hero | A photograph of the team on a real site | The single strongest trust signal available |
| **3** | `service-engineer-inspection` (About) | Real inspection or assessment work | Turns a claim into evidence |
| 4 | Industry tiles | Site photographs from actual engagements | Sector-specific proof |
| 5 | Training images | Photographs from delivered workshops | Proves the training exists |
| 6 | All logo PNGs | Vector SVG originals | Crisp at every size; needed for print |

### Requirements for client-supplied photographs

- Landscape, 2000 px wide minimum
- No identifiable third-party branding, plant names or personnel without written permission
- Correct PPE visible in every plant shot — a photograph of an unsafe practice on a safety
  consultant's website is worse than no photograph
- Original files, not WhatsApp-compressed copies (WhatsApp destroys roughly 80% of the data)
- Written confirmation that the client owns or has licensed the image and that any identifiable
  person consents

---

## 6. Non-image assets

| Asset | Source | Licence |
|---|---|---|
| Bootstrap 5.3.3 CSS + JS bundle | jsDelivr, vendored to `assets/vendor/bootstrap/` | MIT |
| Inter (variable) | Google Fonts, self-hosted | SIL Open Font Licence 1.1 |
| Barlow Semi Condensed 600/700 | Google Fonts, self-hosted | SIL Open Font Licence 1.1 |
| Cormorant Garamond 600 + italic | Google Fonts, self-hosted | SIL Open Font Licence 1.1 |
| Icon set | Hand-authored inline SVG in `index.html` | Original work, no third-party licence |

All four font families and Bootstrap are redistributable under their licences, which is what makes
self-hosting legal as well as fast.
