# 12 — Risk register

Reviewed at every phase gate. Scoring: Likelihood × Impact, each 1–5.

| ID | Risk | L | I | Score | Response |
|---|---|---|---|---|---|
| **R1** | **No business address ⇒ no local SEO.** No `LocalBusiness` schema, no Google Business Profile, no map-pack eligibility, no city-qualified pages | 4 | 4 | **16** | **Mitigate.** Chase the client for a publishable address. For a services business this is the cheapest high-intent traffic available and it is blocked on one fact. A registered office or even a serviced address unblocks it. Meanwhile compete on national and problem-led terms |
| **R2** | **SME review capacity is the content bottleneck.** Two practitioners with day jobs; the article programme needs their time and cannot proceed without it | 4 | 4 | **16** | **Mitigate.** Size the calendar to real availability (2/month, not 8). Draft from transcripts of 30-minute recorded conversations rather than asking for written input — talking is ten times faster than writing for an expert. Batch reviews |
| **R3** | **Logo exists only as raster extractions** from the deck. Blurs above ~1000 px, unusable for print, large format or embroidery | 4 | 3 | **12** | **Mitigate.** Requested from the client. If originals are lost, commission a vector redraw — it is a few hours of work and the mark is simple enough to trace faithfully |
| **R4** | **Stock photography caps trust.** Nothing on the site proves the work has actually been done | 4 | 3 | **12** | **Mitigate.** Replacement priority defined in [09 §5](09-image-asset-strategy.md#5-replacement-priority). Trainer headshots and one real site photograph fix most of it |
| **R5** | **No case studies.** The single strongest credibility asset is absent, and competitors that have them will win comparable enquiries | 4 | 4 | **16** | **Mitigate.** Pursue in Phase 2. Anonymisation ("a cement plant in eastern India") removes most permission friction. Even two short before/after paragraphs change the site's persuasive weight materially |
| **R6** | **Training keywords are highly competitive.** Established providers with budgets own the head terms for Lean/Six Sigma training in India | 5 | 2 | **10** | **Accept and reposition.** Do not compete on `lean six sigma training`. Compete on the qualified long tail — "for manufacturing", "in-house", "on-site", "for plant teams" — where the differentiator is conveyor and bulk-handling domain expertise nobody else has |
| **R7** | **GitHub Pages cannot process forms or issue redirects.** Enquiries currently depend on `tel:`/`mailto:`; URL changes are lossy | 3 | 3 | **9** | **Mitigate.** Third-party form endpoint in Phase 2. Get URLs right the first time. Cloudflare Pages / Netlify are drop-in migration targets if it ever becomes limiting |
| **R8** | **`robots.txt` is inert on a `github.io` project path** — indexing control is markup-only | 3 | 2 | **6** | **Accept, with control.** `<meta name="robots">` per page is authoritative and already in place. Resolves itself when the custom domain lands |
| **R9** | **Single-person delivery dependency.** Bus factor of one on build and SEO | 2 | 4 | **8** | **Mitigate.** This documentation set exists for exactly this reason: any competent developer can pick up the repository and continue from `docs/` alone. Everything is plain HTML, CSS and vanilla JS with no build step and no proprietary tooling |
| **R10** | **Public repository leaks something confidential** | 2 | 5 | **10** | **Prevent.** [11 §9](11-deployment-runbook.md#9-files-that-must-never-be-committed) lists what never gets committed. Review every diff. A leaked credential is rotated, not deleted — history is permanent |
| **R11** | **Publishing an inaccurate technical claim.** A wrong belt-tension formula on a consultancy's own site is worse than no page at all | 2 | 5 | **10** | **Prevent.** No technical content publishes without SME sign-off. Named owner per page in the checklist |
| **R12** | **Contact details go stale** — one wrong digit silently costs every lead on the page | 2 | 4 | **8** | **Prevent.** Single source in [docs/README](README.md#fast-facts); verified in the Definition of Done for every deploy |
| **R13** | **Design decisions get relitigated late,** forcing rework across a completed site | 3 | 4 | **12** | **Prevent.** This is exactly why Phase 1 ships a live, signed-off style guide before any Phase 2 page is built. Token architecture also means a late colour change is a one-line edit rather than a rebuild |
| **R14** | **Bootstrap or font dependency ages out** — security advisory or breaking release | 2 | 2 | **4** | **Monitor.** Versions pinned and vendored, so nothing changes underneath us. Quarterly review; re-run the QA gate after any bump |
| **R15** | **Analytics never gets installed**, so nobody can tell whether any of this worked | 3 | 4 | **12** | **Mitigate.** Blocked on a client consent decision. Present the two options concretely — GA4, or a cookieless tool that preserves the site's zero-third-party property — rather than asking an open question |
| **R16** | **Content published but not distributed.** Articles ship and nobody sees them | 3 | 3 | **9** | **Mitigate.** LinkedIn syndication is part of the article's definition of done, not an afterthought. The client's existing network is the strongest distribution channel available and it is free |
| **R17** | **Trainer consent for name, photo and biography was assumed, not obtained** | 2 | 4 | **8** | **Prevent.** Explicit confirmation is a Phase 1 gate item ([03](03-progress-checklist.md#open-items-needing-the-client-)). Do not go live without it |
| **R18** | **Scope creep from the Web Design & Development capability** — the site drifts into positioning itself as a web agency and dilutes its conveyor identity | 2 | 3 | **6** | **Prevent.** Deliberate IA decision: it stays a listed capability on the home page and gets no page of its own. Revisit only if it becomes a real revenue line ([05 §2](05-information-architecture.md#2-phase-2-target-sitemap)) |
| **R19** | **GitHub Actions is billing-blocked on the hosting account.** The first deploy never started: *"your account is locked due to a billing issue"*. The CI link check that guards every deploy cannot run | 5 | 3 | **15** | **Mitigate now, fix later.** Switch Pages to branch deployment — no Actions minutes, publishes this repository unchanged. Run the link and overflow checks locally before every push until billing is cleared, then switch the source back to "GitHub Actions". See [11 §0](11-deployment-runbook.md#0--current-blocker--github-actions-is-disabled-on-this-account) |

---

## Top risks, by score

1. **R1** — address blocks local SEO (16)
2. **R2** — SME capacity bottlenecks content (16)
3. **R5** — no case studies (16)
4. **R19** — Actions billing block removes the deploy safety net (15)
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
