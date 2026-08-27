# 01 — Project charter

**Project:** LALSNIG Consulting website
**Sponsor:** Mr. Ranjit Mondal (owner, LALSNIG Consulting)
**Delivery:** Anupam Mondal
**Charter date:** 23 August 2026 · **Revised:** 24 August 2026 (positioning)
**Status:** Active — Phase 1 live, awaiting sign-off

---

## 1. Why this project exists

LALSNIG Consulting sells expertise that is invisible until someone explains it: where a plant's
throughput actually leaks, why the same defect keeps coming back, what a maintenance regime is worth.
Today that explanation lives in an eight-page PDF deck that has to be emailed to one person at a time.

The business needs a place where the explanation is *found* rather than *sent* — a website that:

1. establishes the brand as a credible **business excellence** partner with real engineering depth,
2. is discoverable by plant managers and maintenance heads who search for their problem before they
   search for a supplier, and
3. converts that visit into a phone call or an email.

The company deck is the design and content source. The website is not a redesign of the brand; it is
the brand's first proper public surface.

## 2. Objectives

| # | Objective | Measured by | Target |
|---|---|---|---|
| O1 | A single, agreed visual identity applied consistently | Design system signed off; every page built from tokens | Phase 1 |
| O2 | A live, professional digital presence | Site reachable at a public URL, mobile-usable, accessible | Phase 1 |
| O3 | Discoverable for problem-led and method-led searches | Indexed pages ranking for the Tier-1 keyword set in [06](06-keyword-research.md) | Phase 3 |
| O4 | Enquiries arrive through the site | Tracked email/phone/form conversions per month | Phase 4 |
| O5 | Content compounds rather than decays | Growing non-brand organic sessions quarter on quarter | Phase 5 |

## 3. Scope

### In scope

- Brand foundation: colour system, typography system, logo usage, component library, style guide
- A responsive, accessible, SEO-optimised website built in HTML5 + Bootstrap 5
- Keyword research, on-page SEO specification, content and image strategy
- Royalty-free imagery, licensed and self-hosted
- Structured data (Organization, ProfessionalService, Person, OfferCatalog, FAQPage)
- Hosting and continuous deployment on GitHub Pages
- Project management documentation (this set)

### Out of scope (this programme)

- Logo redesign — the existing mark is used as-is. **Vector originals are required from the client**
  (see [risk R3](12-risk-register.md)).
- Paid advertising (Google Ads, LinkedIn Ads) — organic only unless separately commissioned.
- A CMS or server-side application. GitHub Pages serves static files; forms will use a third-party
  endpoint (see [Phase 2](02-project-plan.md#phase-2--content--multi-page-expansion)).
- E-commerce, client portal, or online course delivery.
- Translation into Hindi/Bengali. Flagged as a Phase 5 option, not committed.

## 4. Success criteria

Phase-level acceptance lives in [10-qa-definition-of-done.md](10-qa-definition-of-done.md). At
programme level the project succeeds when all of the following are true:

- [ ] The client can hand out one URL instead of a PDF and it represents the business better than the PDF did.
- [ ] Every page passes the Definition of Done gate: WCAG 2.1 AA, Lighthouse ≥ 90 on all four categories, valid structured data.
- [ ] The site ranks on page one for at least three Tier-1 keywords from [06-keyword-research.md](06-keyword-research.md).
- [ ] At least one enquiry per month is attributable to organic search.
- [ ] Any competent web developer can pick up the repository and extend it from the documentation alone.

## 5. Stakeholders and decision rights

| Role | Person | Decides | Consulted on |
|---|---|---|---|
| Sponsor / business owner | Ranjit Mondal | Brand sign-off, service claims, pricing language, contact details, go-live | Everything |
| Subject-matter expert | Ranjit Mondal | Technical accuracy of all conveyor and Lean content | Keyword intent, FAQ answers |
| Subject-matter expert | Ruturaj Jadhav | Process-excellence and analytics content | Training page content |
| Delivery | Anupam Mondal | Architecture, stack, implementation, SEO tactics | Brand, content |

**Escalation rule:** anything that changes a public claim about capability, experience or results is a
sponsor decision, not a delivery decision. Anything that changes only *how* a claim is presented is a
delivery decision.

## 6. Constraints

| Constraint | Consequence |
|---|---|
| **Static hosting (GitHub Pages)** | No server-side code. Forms, search and analytics must be client-side or third-party. |
| **Public repository** | Never commit credentials, API keys or client-confidential documents. |
| **Zero hosting budget in Phase 1** | GitHub Pages free tier: 1 GB repository soft limit, 100 GB/month bandwidth, ~10 builds/hour. Comfortably inside all three. |
| **Two-person subject-matter capacity** | Content velocity is capped by SME review time, not by writing time. The editorial calendar in [08](08-content-strategy.md) is sized accordingly. |
| **`robots.txt` limitation** | On a `github.io` project path, `robots.txt` at the repo root is *not* honoured by crawlers — only the one at the domain root is. Indexing control relies on per-page `<meta name="robots">` until a custom domain is attached. See [11-deployment-runbook.md](11-deployment-runbook.md#robotstxt-caveat). |
| **No paid SEO tooling yet** | Search volume and difficulty figures must come from Google Keyword Planner and Search Console, not from estimates. |

## 6b. Positioning

**LALSNIG Consulting is a business excellence consultancy.** Lean manufacturing, Lean Six Sigma,
industrial engineering, data analytics, training and maintenance/reliability are the service lines.

**Conveyor and bulk material handling is a named specialist practice, not the headline.** It is the
founder's 18-year technical foundation, it differentiates the firm from generalist consultancies, and
it remains the single most winnable position in search. It sits below the category claim on the site
and it is not to be removed — see [06 §0](06-keyword-research.md#0-what-the-repositioning-costs-and-what-to-do-about-it)
for why that combination is deliberate.

> Changed 24 August 2026 at the sponsor's direction, from a conveyor-led to a business-excellence-led
> position. The SEO consequences are documented rather than assumed.

## 7. Assumptions

1. The company deck is the approved brand expression; colours and typography derive from it.
2. Contact details in the deck (phone, email, LinkedIn) are current and may be published.
3. The two named trainers consent to their names, photographs and biographies appearing publicly.
4. Business operates from India and serves clients nationally. **No street address is published**
   until the client confirms one — this blocks `LocalBusiness` schema and Google Business Profile,
   both of which are Phase 2 items.
5. English (`en-IN`) is the sole content language for Phases 1–4.

## 8. High-level timeline

| Phase | Focus | Status |
|---|---|---|
| 0 | Discovery & foundation inputs | ✅ Complete — 23 Aug 2026 |
| 1 | Brand foundation & digital presence (GitHub Pages) | ✅ Live — 24 Aug 2026, awaiting sign-off |
| 2 | Content & multi-page expansion | ⏳ Next |
| 3 | Authority content & organic growth | Planned |
| 4 | Conversion & analytics | Planned |
| 5 | Scale & maintain | Ongoing |

Detail, dependencies and effort estimates: [02-project-plan.md](02-project-plan.md).

## 9. Governance

- **Cadence:** one working review per phase gate; the checklist is updated continuously.
- **Change control:** scope changes are recorded as a new checklist item with an owner and a phase.
  Nothing gets silently absorbed into the current phase.
- **Risk review:** [12-risk-register.md](12-risk-register.md) is reviewed at every phase gate.
