# 11 — Deployment runbook

**Host:** GitHub Pages · **Pipeline:** GitHub Actions ·
**Live URL:** https://anupammo.github.io/lalsnig-excellence-consultancy/

---

## 1. One-time setup

Do this once, in the GitHub web UI. **Nothing deploys until step 1 is done.**

1. **Repository → Settings → Pages → Build and deployment → Source → "GitHub Actions"**
   *(not "Deploy from a branch" — the workflow in this repository uses the Actions path and will fail
   against the branch source.)*
2. Repository → Settings → Actions → General → Workflow permissions →
   **Read and write permissions** enabled.
3. Push to `main`. The workflow runs automatically.
4. Watch it under the **Actions** tab. First run takes 1–2 minutes.
5. The live URL appears in Settings → Pages and on the workflow's `deploy` job.

## 2. How a deploy works

```
push to main
   └── job: build
         ├── checkout
         ├── verify required files exist
         ├── verify every local href/src resolves            ← blocks the deploy on a broken link
         └── upload the whole repository as a Pages artifact
   └── job: deploy
         └── publish to the github-pages environment
```

Defined in [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml).

**Deliberate choices:**

| Choice | Reason |
|---|---|
| `concurrency: { group: pages, cancel-in-progress: false }` | Two simultaneous deploys can corrupt the Pages artifact. In-flight deploys finish rather than being cancelled |
| Link check before upload | A broken asset path is the failure mode this stack produces most often, and it is invisible until someone loads the page |
| `path: .` | The site *is* the repository root. No build step, nothing to go stale |
| `.nojekyll` | Without it, GitHub Pages runs Jekyll and silently drops any path beginning with `_` |
| `workflow_dispatch` | Lets you redeploy without an empty commit |

## 3. Deploy checklist

```
[ ] Definition of Done passed for every changed page        (docs/10)
[ ] sitemap.xml lastmod updated if content changed
[ ] Tested locally (see §4)
[ ] No secrets, credentials or client-confidential files in the diff
[ ] Commit message says what changed and why
[ ] Push to main
[ ] Actions tab: workflow green
[ ] Load the live URL in a private window (bypasses cache)
[ ] Hard-refresh and confirm CSS, fonts, images all load
[ ] Lighthouse against the live URL
[ ] Rich Results Test against the live URL if schema changed
```

## 4. Local testing

This repository lives under XAMPP's `htdocs`, so Apache serves it directly:

```
http://localhost/lalsnig-excellence-consultancy/
```

Or without Apache, from the repository root:

```bash
python -m http.server 8000     # → http://localhost:8000/
npx serve .                    # → whatever port it prints
```

**Test over HTTP, not `file://`.** Under `file://` the web manifest, `fetch`, and some font loading
behave differently, and you will chase problems that do not exist on the server.

Headless screenshot for a quick visual check:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
       --window-size=1400,3000 --virtual-time-budget=8000 \
       --screenshot=out.png "http://localhost:8000/"
```

## 5. Custom domain (Phase 2)

Attaching a domain is what unblocks a working `robots.txt`, a brand email address, and
`LocalBusiness` schema.

1. Buy the domain. Prefer `.in` or `.com`; keep the brand name intact and unhyphenated.
2. **DNS — apex domain** (`lalsnigconsulting.com`), four `A` records:
   `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
   *(Verify these against GitHub's current documentation before entering them — GitHub has changed
   these addresses before.)*
3. **DNS — `www` subdomain:** one `CNAME` → `anupammo.github.io`
4. Repository → Settings → Pages → Custom domain → enter the domain → Save.
   This commits a `CNAME` file to the repository root; leave it there.
5. Wait for DNS propagation, then tick **Enforce HTTPS**.
6. **Then, in order:**
   - [ ] Update every absolute URL: canonicals, `og:url`, `og:image`, `twitter:image`, JSON-LD `@id`s and `url`s, `sitemap.xml`, the `Sitemap:` line in `robots.txt`. **Miss one and canonicals point at the old host, which is worse than having no canonical at all.**
   - [ ] Add the new property in Google Search Console and use **Change of Address**
   - [ ] Resubmit `sitemap.xml`
   - [ ] Update the LinkedIn profile and any directory listings

> ### `robots.txt` caveat
> `robots.txt` is only honoured at a domain root. On the current project path it resolves to
> `anupammo.github.io/lalsnig-excellence-consultancy/robots.txt`, which crawlers ignore. Our file is
> therefore inert until the custom domain exists — at which point it starts working unchanged, with no
> edit needed. Until then, indexing is controlled per page by `<meta name="robots">`, which is why
> `brand.html` and `404.html` carry `noindex` in their markup.

## 6. Rollback

Pages serves the last successful deploy, so a red workflow leaves the previous version live — a
failed build is not an outage.

**To roll back a bad deploy that succeeded:**

```bash
git revert <bad-commit-sha>     # preserves history; preferred
git push origin main
```

Or redeploy a known-good commit: Actions → *Deploy to GitHub Pages* → **Run workflow** → pick the ref.

Never `git push --force` to `main`. It rewrites the history the deployment record depends on.

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Workflow fails at "Check that required entry points exist" | A required file was renamed or deleted | Restore it, or update the list in the workflow |
| Workflow fails at "Check every local href/src resolves" | Broken asset path — the error names the file and the reference | Fix the path. **Do not disable the check** |
| Deploy is green but the site is a 404 | Pages source is still "Deploy from a branch" | Settings → Pages → Source → GitHub Actions |
| CSS and images 404 on the live site but work locally | Root-absolute paths (`/assets/…`) — wrong under a project path | Use relative paths (`assets/…`), or prefix with `/lalsnig-excellence-consultancy/` as `404.html` does |
| Fonts do not load | `@font-face` paths are relative to the **CSS file**, not the HTML | `fonts.css` correctly uses `../fonts/…` |
| A page with a leading `_` is missing | Jekyll processing | `.nojekyll` must exist at the repository root |
| Old content still showing | Browser or CDN cache | Private window; Pages' CDN clears within minutes |
| Deploy queued forever | Another deploy in flight | `concurrency` is doing its job — wait |
| Actions minutes exhausted | Free-tier limit | Public repositories get unlimited Actions minutes; check the repository is still public |

## 8. Platform limits

| Limit | Value | Our position |
|---|---|---|
| Repository size (soft) | 1 GB | ~15 MB |
| Published site size | 1 GB | ~10 MB |
| Bandwidth | 100 GB/month soft | Nowhere near |
| Builds | ~10/hour soft | Nowhere near |
| Server-side code | **None** | Forms need a third-party endpoint (Phase 2) |
| Redirects | **No 301s** | URL changes need a client-side redirect page + Search Console change-of-address |
| Custom headers / CSP | **Not configurable** | `<meta http-equiv>` only |

If server-side behaviour ever becomes necessary, the migration target with the least friction is
Cloudflare Pages or Netlify — both accept this repository unchanged and add redirects, headers and
form handling.

## 9. Files that must never be committed

- Credentials, API keys, tokens, `.env` files
- Client-confidential documents, contracts, pricing
- Personal data of any third party
- Large binaries not used by the site
- `node_modules/`

The repository is **public**. Anything committed is public permanently, including after a
`git rm` — Git history keeps it. A leaked key must be rotated, not just deleted.
