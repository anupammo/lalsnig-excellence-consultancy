# 06 — Keyword research

**Version 1.0 · 23 August 2026**

---

## How these numbers get validated

**There are no invented search volumes in this document, and there should never be any.**

Search volume and difficulty require a data source we do not have yet. Fabricating them would make
every downstream decision — which page to build, what to write first, what to expect — rest on
fiction. So this document instead gives you what *can* be derived without a paid tool and is
genuinely more useful at this stage: the keyword universe, the intent behind each term, the
competitive character of each cluster, and a defensible build order.

Fill the volume column when these are in place:

| Source | Gives you | When | Cost |
|---|---|---|---|
| **Google Keyword Planner** (free with any Ads account, no spend required) | Volume ranges, related terms, India-specific data | Do this first | Free |
| **Google Search Console** | The queries this site *actually* gets impressions for — the only truly accurate source | 4–8 weeks after Phase 2 goes live | Free |
| **Google autocomplete + "People also ask" + "Related searches"** | Real long-tail phrasing | Anytime | Free |
| **Bing Webmaster Tools keyword research** | Volume estimates without an Ads account | Anytime | Free |
| Ahrefs / Semrush / Ubersuggest | Difficulty, SERP analysis, competitor gaps | When budget allows | Paid |

**Method when you run it:** set Keyword Planner's location to India, language English, and record the
range Google gives rather than a point estimate. Then re-sort the tiers below by
*volume ÷ competition* and adjust the build order. Record the run date in the table so a stale figure
is visible as stale.

---

## 1. What we are actually optimising for

This is a **specialist B2B consultancy with two people**. It will not out-rank Continental,
Fenner Dunlop or Flexco for `conveyor belt` — nor should it try. Those are manufacturer terms with
manufacturer budgets behind them.

The winnable ground is the intersection of three characteristics:

1. **Problem-led** — the searcher has a mistracking belt, not a purchase order.
2. **Service-led, not product-led** — "consultant", "audit", "training", "analysis", not "buy" or "price".
3. **Long-tail and specific** — four words and up, where a two-person firm with real expertise can
   out-answer a corporate content team.

Everything below is sorted by that.

---

## 2. Keyword universe by cluster

### Cluster A — Core service identity (Tier 1)

Who we are. Low volume, extremely high intent. If someone types these, they are looking to hire.

| Keyword | Intent | Competitive character | Target page |
|---|---|---|---|
| conveyor belt consultant | Commercial | Thin — mostly manufacturers, few true consultancies | Home |
| conveyor belt consultancy services | Commercial | Thin | Home |
| conveyor belt consultant India | Commercial, local | Very thin | Home |
| conveyor system consultant | Commercial | Thin | Home |
| bulk material handling consultant | Commercial | Moderate — engineering firms | Home / Industries |
| conveyor belt expert | Commercial | Thin | About |
| conveyor belt engineering services | Commercial | Moderate | Services hub |

### Cluster B — Service pages (Tier 1)

One keyword owns one page. No two pages compete.

| Keyword | Intent | Target page (Phase 2) |
|---|---|---|
| conveyor belt design review | Commercial | `/services/conveyor-belt-design-review/` |
| conveyor capacity calculation | Informational → commercial | Same page, subsection |
| conveyor belt troubleshooting | Informational, high volume | `/services/conveyor-troubleshooting-rca/` |
| conveyor root cause analysis | Commercial | Same |
| conveyor performance improvement | Commercial | `/services/conveyor-performance-improvement/` |
| conveyor downtime reduction | Commercial | Same |
| conveyor preventive maintenance | Informational → commercial | `/services/conveyor-maintenance-support/` |
| conveyor belt maintenance plan | Commercial | Same |
| conveyor safety audit | Commercial | `/services/conveyor-safety-compliance/` |
| conveyor risk assessment | Commercial | Same |
| conveyor belt training programme | Commercial | `/services/training-competency/` |
| conveyor operator training | Commercial | Same |

### Cluster C — Training and operational excellence (Tier 1–2)

**Much higher volume than the conveyor cluster, and much more competitive.** Every training provider
in India bids on `lean six sigma training`. The realistic play is the qualified long tail —
"for manufacturing", "in-house", "on-site", "for plant" — where the searcher wants delivery at their
site, which is exactly what this business sells.

| Keyword | Intent | Competitive character | Target page |
|---|---|---|---|
| lean six sigma training | Commercial | **Very high** — do not target head-on | `/training/lean-six-sigma/` |
| lean six sigma training for manufacturing | Commercial | Moderate | Same |
| in-house lean six sigma training India | Commercial | Low–moderate | Same |
| lean manufacturing consultant | Commercial | Moderate | `/training/lean-manufacturing/` |
| lean manufacturing implementation | Commercial | Moderate | Same |
| 5S implementation training | Commercial | Moderate | Same |
| value stream mapping training | Commercial | Moderate | Same |
| kaizen training for plant | Commercial | Low | Same |
| industrial engineering consultant | Commercial | Moderate | `/training/industrial-engineering/` |
| time and motion study consultant | Commercial | **Low — strong opportunity** | Same |
| line balancing consultant | Commercial | Low | Same |
| productivity improvement consultant India | Commercial | Moderate | Same |
| DMAIC training | Informational | Moderate | Lean Six Sigma page |
| SPC and MSA training | Commercial | Low | Same |
| 7 QC tools training | Informational | Moderate | Same |
| FMEA APQP training | Commercial | Low–moderate | Same |

### Cluster D — Problem-led long tail (Tier 2) — **the growth engine**

This is where a two-person specialist beats a content team: these questions have real answers that
only someone who has stood next to the belt can write. Each becomes an article in
[Phase 3](02-project-plan.md#phase-3--authority-content--organic-growth).

| Keyword / question | Intent | Article |
|---|---|---|
| conveyor belt mistracking causes | Informational | Belt mistracking: causes and fixes |
| how to fix conveyor belt tracking | Informational | Same |
| conveyor belt spillage solutions | Informational | Reducing spillage and carry-back |
| conveyor carry-back problem | Informational | Same |
| conveyor belt splice failure | Informational | Splice failure modes and prevention |
| steel cord vs fabric conveyor belt | Informational, comparison | Belting selection guide |
| how to select conveyor belt cover grade | Informational | Same |
| conveyor idler failure causes | Informational | Idler and pulley failure analysis |
| conveyor transfer chute design problems | Informational | Transfer point engineering |
| conveyor belt life extension | Informational | Extending belt life |
| conveyor downtime cost calculation | Informational | The true cost of conveyor downtime |
| conveyor belt inspection checklist | Informational → **lead magnet** | Checklist + gated PDF |
| conveyor preventive maintenance schedule | Informational | PM schedule template |
| belt conveyor power calculation | Informational | Capacity & power primer |
| conveyor belt tension calculation | Informational | Same |
| conveyor guarding requirements | Informational, compliance | Conveyor safety audit checklist |
| conveyor lock out tag out procedure | Informational, compliance | Same |

### Cluster E — Industry-qualified (Tier 2)

Low volume individually, very high intent, and trivially easy to satisfy because each maps to a page
we are building anyway.

`conveyor belt consultant for [mining | cement plant | power plant | steel plant | port | aggregates]`
`conveyor maintenance [mining | cement | power plant]`
`coal handling plant conveyor consultant`
`overland conveyor consultant`

→ `/industries/{sector}/`, one page each.

### Cluster F — Brand & navigational (Tier 3)

`lalsnig` · `lalsnig consulting` · `lalsnig excellence consultancy` · `ranjit mondal conveyor`

Zero difficulty, must-win. Owned by the home page, `Organization` schema, and a consistent
NAP (name/address/phone) across the site, LinkedIn and — once the address exists — Google Business
Profile.

### Cluster G — Local (Tier 2) — ⛔ blocked

`conveyor belt consultant in [city]` · `lean six sigma training in [city]` ·
`industrial consultant near me`

**Blocked until the client confirms a publishable business address.** That single missing fact blocks
`LocalBusiness` schema, Google Business Profile, city-qualified landing pages and map-pack
eligibility — collectively the cheapest high-intent traffic available to a services business. See
[checklist item 7](03-progress-checklist.md#open-items-needing-the-client-).

---

## 3. Page-to-keyword map

**Rule: one primary keyword per page, and no keyword is primary on two pages.** Violating this is
keyword cannibalisation — two of your own pages splitting the signal and neither ranking.

| Page | Primary keyword | Secondary (2–4) |
|---|---|---|
| `/` (Phase 1, live) | conveyor belt consultant | conveyor belt consultancy services, lean six sigma training for manufacturing, bulk material handling consultant |
| `/services/` | conveyor belt engineering services | conveyor consulting services |
| `/services/conveyor-belt-design-review/` | conveyor belt design review | conveyor capacity calculation, belt tension calculation |
| `/services/conveyor-troubleshooting-rca/` | conveyor belt troubleshooting | conveyor root cause analysis, belt mistracking |
| `/services/conveyor-performance-improvement/` | conveyor performance improvement | conveyor downtime reduction, conveyor availability |
| `/services/conveyor-maintenance-support/` | conveyor preventive maintenance | conveyor maintenance plan, conveyor reliability |
| `/services/conveyor-safety-compliance/` | conveyor safety audit | conveyor risk assessment, conveyor guarding |
| `/services/training-competency/` | conveyor operator training | conveyor belt training programme |
| `/training/lean-manufacturing/` | lean manufacturing consultant | 5S implementation, value stream mapping, kaizen |
| `/training/lean-six-sigma/` | lean six sigma training for manufacturing | DMAIC training, SPC MSA, 7 QC tools |
| `/training/industrial-engineering/` | industrial engineering consultant | time and motion study, line balancing |
| `/industries/{sector}/` × 6 | conveyor belt consultant for {sector} | {sector} conveyor maintenance |
| `/about/` | conveyor belt expert | Ranjit Mondal, LALSNIG Consulting |
| `/contact/` | contact conveyor belt consultant | — |
| `/insights/{article}` × N | one Cluster-D term each | related Cluster-D terms |

---

## 4. Build order

Sequenced by **(intent quality × winnability) ÷ effort** — not by volume. A page that ranks #3 for a
term 20 people search is worth more here than page 4 for a term 2,000 people search.

| Order | What | Why now |
|---|---|---|
| 1 | Home page — Cluster A + F | ✅ **Live.** Owns brand terms and core identity |
| 2 | Six service pages — Cluster B | Highest commercial intent; content already exists in the deck |
| 3 | Six industry pages — Cluster E | Very low competition, high intent, cheap to write |
| 4 | Three training pages — Cluster C long tail | Bigger audience; needs qualified positioning to be winnable |
| 5 | Cluster-D articles, 2/month | Compounding organic growth; feeds internal links to 2–4 |
| 6 | Lead magnets | Converts Cluster-D traffic into contacts |
| 7 | Cluster G — local | ⛔ the moment an address exists, this jumps to position 2 |

---

## 5. Rules for using keywords

1. **Write for the plant engineer, then check the keyword.** Never the reverse. Google's helpful-content
   systems demote text that reads like it was assembled around a phrase.
2. **Primary keyword must appear** in the `<title>`, the `<h1>`, the first 100 words, at least one
   `<h2>`, one image `alt`, and the URL slug. That is placement, not repetition.
3. **No keyword density target.** Once naturally in the copy, stop. Repetition past that point is a
   liability.
4. **Every page answers a question a real person asked.** "People also ask" is free primary research —
   mine it before writing.
5. **Internal links use descriptive anchor text.** "conveyor belt troubleshooting", not "click here"
   and not the bare URL.
6. **One page per intent.** If two drafts would say the same thing, they are one page.
7. **Re-run Search Console every month** and add the queries you are *already* getting impressions for
   but not clicks. Those are the fastest wins available and they cost nothing to find.
