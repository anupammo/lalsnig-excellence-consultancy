# 11 — Deployment runbook

**Host:** GitHub Pages · **Pipeline:** branch deployment (Actions workflow ready but billing-blocked) ·
**Live URL:** https://anupammo.github.io/lalsnig-excellence-consultancy/

---

## 0. Current deployment mode — branch, not Actions

**The site is live** at https://anupammo.github.io/lalsnig-excellence-consultancy/, published by
**classic branch deployment** (`main` / `/ (root)`), not by the Actions workflow.

### Why

The first Actions deploy (run
[32645651484](https://github.com/anupammo/lalsnig-excellence-consultancy/actions/runs/32645651484))
failed before any step executed:

> `The job was not started because your account is locked due to a billing issue.`

Nothing was wrong with the site or the workflow — the `Validate and package` job never ran, and the
annotation pointed at `.github`, not at any file we wrote. Branch deployment needs no Actions minutes
and publishes this repository unchanged, because the site is a static tree at the repository root
with `.nojekyll` already present.

### What this costs us, and what to do about it

The pre-deploy validation gate does not run. **Until Actions is restored, run it yourself before
every push:**

```bash
node scripts/check-links.mjs
```

That is the identical script CI invokes, so passing locally means passing in CI. It checks required
files, every local reference (multi-line `srcset` included), one `<h1>` per page, heading-level skips,
canonical on indexable pages, `img` alt + width/height, and JSON-LD parseability.

### Restoring the Actions path

1. GitHub → Settings (account) → Billing and plans → clear the outstanding item, or check whether a
   spending limit is set to zero.
2. Repository → Settings → Pages → Source → **"GitHub Actions"**.
3. Push, and confirm the workflow goes green.

Leave [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) in place
meanwhile — it is ready and correct.

---

## 1. One-time setup

Do this once, in the GitHub web UI. **Nothing deploys until step 1 is done.**

1. **Repository → Settings → Pages → Build and deployment → Source**
   - ✅ **"Deploy from a branch"** (`main`, `/ (root)`) — **current mode**, see [§0](#0-current-deployment-mode--branch-not-actions)
   - **"GitHub Actions"** — the intended target, once Actions billing is unblocked
2. Repository → Settings → Actions → General → Workflow permissions →
   **Read and write permissions** enabled *(Actions path only)*.
3. Push to `main`.
4. Branch deployment publishes within a couple of minutes. The Actions path shows progress under the
   **Actions** tab.
5. The live URL appears in Settings → Pages.

> Observed publish latency on branch deployment: **30–90 seconds** from push to the new bytes being
> served. There is no build log — the only way to confirm is to fetch the changed file.

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
[ ] node scripts/check-links.mjs passes
[ ] Push to main
[ ] Confirm the change is served (curl the changed file; branch deploys have no build log)
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

> **Under branch deployment there is no gate.** Whatever you push to `main` goes live, broken or not.
> On the Actions path a failed validation leaves the previous version serving, so a bad build is not
> an outage. That safety net is currently absent — which is why `node scripts/check-links.mjs` before
> pushing is not optional right now.

**To roll back a bad deploy:**

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
| Site is a 404 | Pages source not set, or set to the path you are not using | Settings → Pages → Source: "Deploy from a branch" (main, root) today; "GitHub Actions" once billing is clear |
| CSS and images 404 on the live site but work locally | Root-absolute paths (`/assets/…`) — wrong under a project path | Use relative paths (`assets/…`), or prefix with `/lalsnig-excellence-consultancy/` as `404.html` does |
| Fonts do not load | `@font-face` paths are relative to the **CSS file**, not the HTML | `fonts.css` correctly uses `../fonts/…` |
| A page with a leading `_` is missing | Jekyll processing | `.nojekyll` must exist at the repository root |
| Old content still showing | Browser or CDN cache | Private window; Pages' CDN clears within minutes |
| Deploy queued forever | Another deploy in flight | `concurrency` is doing its job — wait |
| `The job was not started because your account is locked due to a billing issue` | Account-level Actions block, not a repository or code problem | Clear the billing item; meanwhile branch deployment is serving the site — see [§0](#0-current-deployment-mode--branch-not-actions) |

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
