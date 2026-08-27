# LALSNIG Consulting — website project documentation

Everything that governs how this website gets built, in the order you would read it.
Source of truth for scope, sequence and status is **[03-progress-checklist.md](03-progress-checklist.md)**.

| # | Document | What it answers | Read when |
|---|---|---|---|
| 01 | [Project charter](01-project-charter.md) | Why this site exists, who decides, what "done" means at the programme level | Kick-off, and whenever scope is challenged |
| 02 | [Project plan](02-project-plan.md) | The six phases, their deliverables, dependencies, effort and sequence | Planning any phase |
| 03 | [Progress checklist](03-progress-checklist.md) | What is done, what is next, who owns it | Every working session |
| 04 | [Brand & design system](04-brand-design-system.md) | Colour, typography, spacing, components, logo rules, measured contrast | Building any UI, or signing off Phase 1 |
| 05 | [Information architecture](05-information-architecture.md) | Sitemap, URL scheme, navigation, page templates | Before adding pages in Phase 2 |
| 06 | [Keyword research](06-keyword-research.md) | The keyword universe, intent map, page-to-keyword assignment, validation method — **and what the business-excellence repositioning costs in search** | Writing any page or article |
| 07 | [On-page SEO specification](07-seo-onpage-spec.md) | The rules every page must satisfy: titles, headings, schema, internal links, technical SEO | Building or reviewing any page |
| 08 | [Content strategy](08-content-strategy.md) | Voice, content pillars, editorial calendar, distribution, organic-reach plan | Planning content |
| 09 | [Image & asset strategy](09-image-asset-strategy.md) | Licensing, the current image manifest, alt-text rules, optimisation pipeline | Adding or replacing any image |
| 10 | [QA & definition of done](10-qa-definition-of-done.md) | The gate every page passes before release | Before every deploy |
| 11 | [Deployment runbook](11-deployment-runbook.md) | GitHub Pages setup, the CI workflow, custom domain, rollback | Deploying, or when a deploy breaks |
| 12 | [Risk register](12-risk-register.md) | What could derail this and what we do about it | Monthly review |

## Fast facts

| | |
|---|---|
| **Client** | LALSNIG Consulting (Lalsnig Excellence Consultancy) |
| **Business** | Business excellence consulting — lean manufacturing, Lean Six Sigma, industrial engineering, data analytics and workforce capability, with a specialist practice in conveyor and bulk material handling |
| **Primary contact** | Mr. Ranjit Mondal — +91 90517 96271 — ranjit_jumech1@yahoo.co.in |
| **Repository** | https://github.com/anupammo/lalsnig-excellence-consultancy |
| **Live URL (Phase 1)** | https://lalsnigconsulting.com/ |
| **Design-system sign-off page** | https://lalsnigconsulting.com/brand.html |
| **Stack** | Static HTML5 + Bootstrap 5.3.3 (self-hosted), vanilla JS, GitHub Pages via branch deployment |
| **Design source** | `LALSNIG EXCELLENCE CONSULTANCY.pdf` (8-page company deck, in the repository root) |

## Working conventions

- **Docs are versioned with the code.** Change the doc in the same commit as the change it describes.
- **The checklist is the status board.** Do not track status in chat or email; tick the box.
- **No fabricated numbers.** Where a figure needs a tool we do not have yet (search volume, difficulty,
  Core Web Vitals field data), the doc says so and names the tool that will produce it. See
  [06-keyword-research.md](06-keyword-research.md#how-these-numbers-get-validated).
