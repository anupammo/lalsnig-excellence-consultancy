# 12 — Risk register

Reviewed at every phase gate. Scoring: Likelihood × Impact, each 1–5.

| ID | Risk | L | I | Score | Response |
|---|---|---|---|---|---|
| **R1** | **No business address ⇒ no local SEO.** No `LocalBusiness` schema, no Google Business Profile, no map-pack eligibility, no city-qualified pages | 4 | 4 | **16** | **Mitigate.** Chase the client for a publishable address. For a services business this is the cheapest high-intent traffic available and it is blocked on one fact. A registered office or even a serviced address unblocks it. Meanwhile compete on national and problem-led terms |
| **R2** | **SME review capacity is the content bottleneck.** Two practitioners with day jobs; the article programme needs their time and cannot proceed without it | 4 | 4 | **16** | **Mitigate.** Size the calendar to real availability (2/month, not 8). Draft from transcripts of 30-minute recorded conversations rather than asking for written input — talking is ten times faster than writing for an expert. Batch reviews |
| **R3** | **Logo exists only as raster extractions** from the deck. Blurs above ~1000 px, unusable for print, large format or embroidery | 4 | 3 | **12** | **Mitigate.** Requested from the client. If originals are lost, commission a vector redraw — it is a few hours of work and the mark is simple enough to trace faithfully |
| **R4** | **Stock photography caps trust.** Nothing on the site proves the work has actually been done | 4 | 3 | **12** | **Mitigate.** Replacement priority defined in [09 §5](09-image-asset-strategy.md#5-replacement-priority). Trainer headshots and one real site photograph fix most of it |
| **R5** | **No case studies.** The single strongest credibility asset is absent, and competitors that have them will win comparable enquiries | 4 | 4 | **16** | **Mitigate.** Pursue in Phase 2. Anonymisation ("a cement plant in eastern India") removes most permission friction. Even two short before/after paragraphs change the site's persuasive weight materially |
| **R6** | **The new category terms are highly competitive.** `business excellence consultant` and `lean six sigma training` are contested by every management consultancy and training provider in India; the old `conveyor belt consultant` position was nearly uncontested | 5 | 3 | **15** | **Accept the position, change the target.** Do not measure against the head terms. Compete on method + sector + delivery-mode long tail, keep `/specialism/conveyor-bulk-handling/` as a priority page because it is the only one that can rank top-three quickly, and treat Phase 3 content as the actual ranking mechanism. Full analysis in [06 §0](06-keyword-research.md#0-what-the-repositioning-costs-and-what-to-do-about-it) |
| **R21** | **A future host or path change silently breaks absolute URLs and root-absolute paths.** The move to `lalsnigconsulting.com` left 22 absolute URLs pointing at the old origin and 7 root-absolute paths on `404.html` returning 404, rendering the error page unstyled | 3 | 4 | **12** | **Prevent.** Step 6 of the [migration runbook](11-deployment-runbook.md#5-custom-domain--done-24-august-2026) is now a checklist with the exact counts. Always fetch the live pages after a host change rather than assuming the deploy carried over |
| **R7** | **GitHub Pages cannot process forms or issue redirects.** Enquiries currently depend on `tel:`/`mailto:`; URL changes are lossy | 3 | 3 | **9** | **Mitigate.** Third-party form endpoint in Phase 2. Get URLs right the first time. Cloudflare Pages / Netlify are drop-in migration targets if it ever becomes limiting |
| ~~**R8**~~ | ~~`robots.txt` is inert on a `github.io` project path~~ | — | — | **closed** | ✅ **Resolved 24 Aug 2026.** The custom domain serves the site from its root, so `robots.txt` is honoured. Per-page `<meta name="robots">` is retained as the authoritative control |
| **R9** | **Single-person delivery dependency.** Bus factor of one on build and SEO | 2 | 4 | **8** | **Mitigate.** This documentation set exists for exactly this reason: any competent developer can pick up the repository and continue from `docs/` alone. Everything is plain HTML, CSS and vanilla JS with no build step and no proprietary tooling |
| **R10** | **Public repository leaks something confidential** | 2 | 5 | **10** | **Prevent.** [11 §9](11-deployment-runbook.md#9-files-that-must-never-be-committed) lists what never gets committed. Review every diff. A leaked credential is rotated, not deleted — history is permanent |
| **R11** | **Publishing an inaccurate technical claim.** A wrong belt-tension formula on a consultancy's own site is worse than no page at all | 2 | 5 | **10** | **Prevent.** No technical content publishes without SME sign-off. Named owner per page in the checklist |
| **R12** | **Contact details go stale** — one wrong digit silently costs every lead on the page | 2 | 4 | **8** | **Prevent.** Single source in [docs/README](README.md#fast-facts); verified in the Definition of Done for every deploy |
| **R13** | **Design decisions get relitigated late,** forcing rework across a completed site | 3 | 4 | **12** | **Prevent.** This is exactly why Phase 1 ships a live, signed-off style guide before any Phase 2 page is built. Token architecture also means a late colour change is a one-line edit rather than a rebuild |
| **R14** | **Bootstrap or font dependency ages out** — security advisory or breaking release | 2 | 2 | **4** | **Monitor.** Versions pinned and vendored, so nothing changes underneath us. Quarterly review; re-run the QA gate after any bump |
| **R15** | **Analytics never gets installed**, so nobody can tell whether any of this worked | 3 | 4 | **12** | **Mitigate.** Blocked on a client consent decision. Present the two options concretely — GA4, or a cookieless tool that preserves the site's zero-third-party property — rather than asking an open question |
| **R16** | **Content published but not distributed.** Articles ship and nobody sees them | 3 | 3 | **9** | **Mitigate.** LinkedIn syndication is part of the article's definition of done, not an afterthought. The client's existing network is the strongest distribution channel available and it is free |
| **R17** | **Trainer consent for name, photo and biography was assumed, not obtained** | 2 | 4 | **8** | **Prevent.** Explicit confirmation is a Phase 1 gate item ([03](03-progress-checklist.md#open-items-needing-the-client-)). Do not go live without it |
| **R18** | **Scope creep from the Web Design & Development capability** — the site drifts into positioning itself as a web agency and dilutes the consulting identity | 2 | 3 | **6** | **Prevent.** Deliberate IA decision: it stays a paragraph under the services grid and gets no page of its own. Revisit only if it becomes a real revenue line ([05 §2](05-information-architecture.md#2-phase-2-target-sitemap)) |
| **R20** | **The specialism gets quietly dropped** in a future content pass because it looks off-message next to the category claim, taking the site's only easily-winnable search position and its strongest credibility proof with it | 3 | 4 | **12** | **Prevent.** Recorded as a positioning decision in [01 §6b](01-project-charter.md#6b-positioning), a priority page in [06 §4](06-keyword-research.md#4-build-order), and a nav item on the live site. Removing it is a sponsor decision, not an editorial one |
| **R19** | **No pre-deploy gate.** Actions is billing-blocked, so the site publishes by branch deployment — whatever is pushed to `main` goes live, broken or not | 4 | 3 | **12** | **Partly mitigated.** The site is live and the deploy path works. `node scripts/check-links.mjs` is the same gate CI would run and must be run before every push; it is in the deploy checklist. Clearing GitHub billing and switching the source back to "GitHub Actions" makes it automatic again. See [11 §0](11-deployment-runbook.md#0-current-deployment-mode--branch-not-actions) |

---

## Top risks, by score

1. **R1** — address blocks local SEO (16)
2. **R2** — SME capacity bottlenecks content (16)
3. **R5** — no case studies (16)
4. **R6** — the new category terms are far more contested than the old ones (15)
5. **R19** — no pre-deploy gate while Actions is billing-blocked (12) · **R20** — specialism erosion (12)
5. **R3** — raster-only logo (12) · **R4** — stock photography (12) · **R13** — late design churn (12) · **R15** — no analytics (12)

Five of these are unblocked by a single conversation with the client — the address, the case-study
permission, the vector logo, the photography, and the GitHub billing. That conversation is the
highest-value action available on this project right now, and it costs nothing.

---

## Review log

| Date | Reviewer | Changes |
|---|---|---|
| 2026-08-23 | Delivery | Register created at Phase 1 close |
| 2026-08-23 | Delivery | R19 added after the first deploy attempt was refused for account billing |
| 2026-08-24 | Delivery | Site live via branch deployment. R19 rescored 15 → 12: the deploy works, only the automatic gate is missing |
| 2026-08-24 | Delivery | Repositioned to business excellence. R6 rescored 10 → 15; R20 added to protect the specialism |
| 2026-08-24 | Delivery | Custom domain live. R8 closed; R21 added after the migration broke the 404 page and every canonical |
