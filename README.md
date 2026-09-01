# LALSNIG Consulting — website

Business excellence consulting — lean manufacturing, Lean Six Sigma, industrial engineering and
workforce capability, with a specialist practice in conveyor and bulk material handling.
Static site: **HTML5 + Bootstrap 5.3.3 + vanilla JS**, deployed to GitHub Pages by GitHub Actions.

**Live:** https://lalsnigconsulting.com/
**Design system:** https://lalsnigconsulting.com/brand.html

---

## Status

**Phase 1 — brand foundation & digital presence — live since 24 August 2026, awaiting client sign-off.**

Lighthouse on the deployed URL: mobile **86–98 (median 96) / 100 / 100 / 100**, desktop
**99 / 100 / 100 / 100**. Structured data validates with **0 errors, 0 warnings**. CLS is **0**.

Full status board: [`docs/03-progress-checklist.md`](docs/03-progress-checklist.md)

## Documentation

Start at [`docs/README.md`](docs/README.md). Twelve documents cover the charter, the phase plan, the
progress checklist, the design system, information architecture, keyword research, the on-page SEO
specification, content and image strategy, the QA gate, the deployment runbook and the risk register.

## Repository layout

```
index.html                      Phase 1 site — the whole company deck as one narrative,
                                led by business excellence with conveyor as a named specialism
brand.html                      Design-system sign-off page (noindex)
404.html                        Branded not-found page (noindex)
robots.txt  sitemap.xml  site.webmanifest  .nojekyll
LALSNIG EXCELLENCE CONSULTANCY.pdf    Source company deck — brand and content origin

assets/
  css/brand.css                 Design tokens + component library  ← single source of visual truth
  css/fonts.css                 Self-hosted @font-face declarations
  js/site.js                    Header shadow, scroll-spy, reveal, menu collapse, footer year
  fonts/                        10 woff2 files, 308 KB total
  img/                          Photography (WebP + JPEG), logo set, icons
  vendor/bootstrap/             Bootstrap 5.3.3, vendored

scripts/check-links.mjs         Validation gate - run before every push; CI runs the same script
docs/                           Project management documentation (12 files)
.github/workflows/              CI: validate, then deploy to Pages (blocked, see Deployment)
```

## Local development

The repository sits in XAMPP's `htdocs`, so Apache serves it directly at
`http://localhost/lalsnig-excellence-consultancy/`. Without Apache:

```bash
python -m http.server 8000     # → http://localhost:8000/
npx serve .
```

Serve over HTTP, not `file://` — the manifest and some font behaviour differ.

There is **no build step**. Edit the HTML or CSS, refresh the browser.

## Making changes

1. **Never hard-code a colour, size or spacing value.** Everything comes from a token in
   [`assets/css/brand.css`](assets/css/brand.css) §1. If the value you need does not exist, add a token.
2. **Horizontal row gutters never exceed `g-4`.** Bootstrap's negative row margins exceed the fluid
   container's padding above that and overflow the viewport. Use `gy-5` for vertical air —
   [why](docs/04-brand-design-system.md#4-space-radius-elevation).
3. **Measure contrast before adding a colour pairing** —
   [script](docs/10-qa-definition-of-done.md#contrast-measurement).
4. **Add new components to `brand.html`** in the same commit, or they will be reinvented.
5. **Tint chips and badges with black, never white.** Lightening a brand accent under white text
   destroys contrast — it put two live elements below AA.
6. **Every image ships slot-sized variants** with `srcset`/`sizes`. Regenerate with the scripts
   described in [`docs/09 §4`](docs/09-image-asset-strategy.md#4-optimisation-pipeline).
7. **Pass the Definition of Done before pushing** —
   [`docs/10`](docs/10-qa-definition-of-done.md).

## Deployment

The site publishes by **branch deployment** (`main` / `/ (root)`), live 30–90 seconds after a push.

```bash
node scripts/check-links.mjs    # run this BEFORE every push
git push origin main
```

**⛔ GitHub Actions is billing-blocked on this account**, so the workflow that would validate the
site before publishing never starts. Branch deployment has no gate: whatever you push goes live,
broken or not. `scripts/check-links.mjs` is the identical check CI runs — running it locally is
currently the only thing standing between a typo and production. Clear the billing item, switch
Settings → Pages → Source to **"GitHub Actions"**, and it becomes automatic again.
Full runbook: [`docs/11-deployment-runbook.md`](docs/11-deployment-runbook.md).

## Licensing

| | |
|---|---|
| Site code | See [`LICENSE`](LICENSE) |
| Brand, logo, company content | © LALSNIG Consulting — not covered by the code licence |
| Photography | [Pexels licence](https://www.pexels.com/license/) — manifest in [`docs/09`](docs/09-image-asset-strategy.md#2-image-manifest--phase-1) |
| Inter · Barlow Semi Condensed · Cormorant Garamond | SIL Open Font Licence 1.1 |
| Bootstrap 5.3.3 | MIT |

## Contact

Mr. Ranjit Mondal · +91 90517 96271 · ranjit_jumech1@yahoo.co.in ·
[LinkedIn](https://www.linkedin.com/in/ranjit-mondal-316301ab)
