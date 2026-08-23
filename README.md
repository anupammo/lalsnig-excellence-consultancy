# LALSNIG Consulting — website

Conveyor belt consulting, operational excellence and workforce capability.
Static site: **HTML5 + Bootstrap 5.3.3 + vanilla JS**, deployed to GitHub Pages by GitHub Actions.

**Live:** https://anupammo.github.io/lalsnig-excellence-consultancy/
**Design system:** https://anupammo.github.io/lalsnig-excellence-consultancy/brand.html

---

## Status

**Phase 1 — brand foundation & digital presence — delivered 23 August 2026, awaiting client sign-off.**

Full status board: [`docs/03-progress-checklist.md`](docs/03-progress-checklist.md)

## Documentation

Start at [`docs/README.md`](docs/README.md). Twelve documents cover the charter, the phase plan, the
progress checklist, the design system, information architecture, keyword research, the on-page SEO
specification, content and image strategy, the QA gate, the deployment runbook and the risk register.

## Repository layout

```
index.html                      Phase 1 site — the whole company deck as one narrative
brand.html                      Design-system sign-off page (noindex)
404.html                        Branded not-found page (noindex)
robots.txt  sitemap.xml  site.webmanifest  .nojekyll
LALSNIG EXCELLENCE CONSULTANCY.pdf    Source company deck — brand and content origin

assets/
  css/brand.css                 Design tokens + component library  ← single source of visual truth
  css/fonts.css                 Self-hosted @font-face declarations
  js/site.js                    Header shadow, scroll-spy, reveal, menu collapse
  fonts/                        10 woff2 files, 308 KB total
  img/                          Photography (WebP + JPEG), logo set, icons
  vendor/bootstrap/             Bootstrap 5.3.3, vendored

docs/                           Project management documentation (12 files)
.github/workflows/              CI: validate, then deploy to Pages
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
5. **Pass the Definition of Done before pushing** —
   [`docs/10`](docs/10-qa-definition-of-done.md).

## Deployment

Push to `main`. CI validates required files and every local link, then publishes.

**One-time setup, still outstanding:** Settings → Pages → Source → **GitHub Actions**.
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
