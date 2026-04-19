# Aptax Phase 1.5 — Product Shell Upgrade

## 0. How to use this file

This file defines the in-between phase after the functional phase 1 MVP and before broader phase 2 platform exposure.

Purpose:

* keep the verified phase 1 product logic,
* upgrade the in-app product experience,
* make Aptax feel like a real product system from day one,
* preserve the future platform shape visually,
* avoid overbuilding backend/platform scope before the shell is ready.

Codex should:

* read `roadmap.md` for overall product context,
* read `phase-1.md` for the completed MVP scope,
* treat `phase-1.5.md` as the active implementation source of truth for this upgrade,
* use `design.md` as the visual/design source of truth,
* keep using existing product messaging and route logic where possible,
* update this file as work progresses.

Status values:

* `pending`
* `building`
* `blocked`
* `completed`

Only one major task should be marked `building` at a time unless tasks are truly independent.

---

## 1. Phase 1.5 goal

Upgrade Aptax from an MVP page set into a production-shaped app workspace.

At the end of phase 1.5, Aptax should feel like:

* a real product system,
* a structured workspace,
* a platform with visible module shape,
* a product that judges can imagine scaling,
* something closer to a Linear-style product shell than isolated demo pages.

This phase is primarily a **product shell, information architecture, and UX quality** upgrade.

It is **not** a new protocol/platform phase.

---

## 2. What should change

Current state:

* founder and investor pages exist as functional MVP routes,
* app experience feels too sparse and MVP-like,
* platform scope is not visually legible enough.

Target state:

* shared app shell,
* persistent sidebar,
* persistent header,
* overview page that guides users into product workflows,
* upgraded founder dashboard,
* upgraded investor dashboard,
* future modules visible in the UI as `Coming soon` or `In development`,
* consistent product-grade layout and component system.

---

## 3. Source-of-truth files

Codex must read and follow:

* `roadmap.md`
* `phase-1.md`
* `phase-1.5.md`
* `design.md`

Priority rules:

* `phase-1.5.md` = current implementation source of truth
* `design.md` = visual source of truth for shell/layout/polish
* `roadmap.md` = strategic context
* `phase-1.md` = prior phase boundaries and MVP logic

Important:
`design.md` must be actively used during implementation. Do not ignore it.

---

## 4. Scope

### In scope

* app shell
* sidebar
* header
* overview page
* founder dashboard refactor
* investor dashboard refactor
* placeholder states for future modules
* stronger information architecture
* stronger product-grade navigation and page composition
* improved consistency of cards, spacing, hierarchy, and empty states

### Out of scope

* new contract features
* new backend/platform features beyond what is needed for the shell
* public API launch
* public SDK launch
* MCP implementation expansion
* Aptax Skill implementation
* deployment work
* new flagship workflow beyond due diligence

---

## 5. Product structure target

## App shell

Aptax should have a unified workspace shell for authenticated product pages.

The shell should include:

* persistent left sidebar
* top header
* main content area
* consistent page width and layout rhythm
* role/module-aware navigation
* product environment or status treatment if useful

The shell should feel:

* modern
* premium
* minimal
* system-oriented
* product-grade

Use `design.md` for the visual and structural approach.

---

## 6. Route target

### Core routes

* `/app` or `/overview` as the main product overview page
* `/founder`
* `/investor`

### Future-visible routes or modules

These do not all need full functionality, but they should be represented in the UI:

* Requests
* Results
* Activity
* API
* SDK
* MCP
* Aptax Skill
* Settings

These may be:

* real pages with placeholder states,
* or internal nav items that open a designed placeholder state,
* but they should look intentional and credible.

---

## 7. UX intent

This phase should achieve **production shape, MVP depth**.

Meaning:

* implemented workflows remain focused,
* visual structure looks larger and more complete,
* future platform shape is visible without pretending everything is fully built,
* `Coming soon` or `In development` markers are acceptable if tasteful.

Do not fake deep functionality.
Do make the future structure legible.

---

## 8. Overview page target

The overview page should act like the home of the Aptax due diligence workspace.

Purpose:

* orient new users,
* frame the flagship product clearly,
* route users into founder or investor workflows,
* show the current verification system at a glance,
* preview the broader Aptax platform without confusing it with the app itself.

Suggested sections on the overview page:

* workspace intro / overview header
* founder workflow card
* investor workflow card
* verification summary / stats cards
* recent activity or recent requests panel
* `Built on Aptax` platform section

The `Built on Aptax` section should explain that the due diligence app is powered by the broader Aptax platform.

Suggested cards or modules for that section:

* Verification API
* Developer SDK
* MCP
* Aptax Skill

These should be shown as the infrastructure layer underneath the app, not as the primary in-app workflow.

This page should feel like a real product home, not a marketing section squeezed into the app.

---

## 9. Founder dashboard target

The founder dashboard should feel like a role-specific module inside the broader Aptax workspace.

It should include:

* clear page header
* company/subject overview card
* encrypted metrics section
* active verification requests section
* permissions/access section or placeholder
* activity panel or recent events

Only currently real features need full depth.
Future areas can exist as placeholder cards or sections.

---

## 10. Investor dashboard target

The investor dashboard should feel equally productized.

It should include:

* clear page header
* watched/startup selection state
* verification request module
* results state
* diligence queue or requests table
* notes/activity placeholder if useful

Keep the current implemented verification loop strong, but wrap it in a more structured dashboard.

---

## 11. Sidebar target

The sidebar should represent the **flagship due diligence application**, not the full Aptax infrastructure platform.

Aptax has two layers that must stay mentally separate:

* **Aptax Platform** = verification infrastructure
* **Aptax Due Diligence** = first flagship application built on that platform

The in-app sidebar should only reflect the flagship product workspace.

Suggested navigation shape:

* Overview
* Founder
* Investor
* Requests
* Results
* Activity
* Settings

Rules:

* currently active modules should feel stronger and more complete,
* the sidebar should feel like a real product workspace,
* do not mix infrastructure/platform surfaces into the primary app navigation,
* keep the information architecture clean and believable.

Platform surfaces such as:

* API
* SDK
* MCP
* Aptax Skill

should be surfaced **outside** the core application sidebar.

Recommended places to surface the Aptax platform:

* a dedicated `Built on Aptax` section on the overview page,
* a separate `/platform` page,
* lightweight header-level navigation,
* designed cards or modules that explain what powers the flagship app.

This keeps the mental model clear:
**Aptax Platform powers the flagship due diligence app.**

---

## 12. Visual guidance

Use `design.md` as the visual source of truth.

Key implementation intent:

* do not build generic dashboard chrome,
* do not make it feel like admin-template SaaS,
* do not overdecorate,
* do not turn placeholder areas into low-effort empty boxes,
* make the shell feel calm, premium, and product-forward.

The in-app experience should feel like a serious product workspace that matches the quality bar of the landing page.

---

## 13. Task board

## Task 01 — Audit current app information architecture

**status:** completed

Started: 2026-04-15 IST - Auditing the current route structure, shell usage, and where the platform/app boundary is currently blurred.
Completed: Confirmed the app currently consists of a marketing landing page plus standalone `/founder` and `/investor` routes using a page wrapper instead of a persistent workspace shell. There is no `/app` overview route yet, and the flagship due diligence workspace is not distinct enough from the broader Aptax platform shape.

### Goal

Understand the current route structure, dashboard flows, and shell weaknesses before refactoring.

### Deliverables

* current routes summarized
* shell/layout issues identified
* proposal for new app structure

---

## Task 02 — Define the new app shell architecture

**status:** completed

Started: 2026-04-15 IST - Defining a route-group based workspace shell so `/app`, `/founder`, `/investor`, and due-diligence placeholder modules share one persistent layout while the Aptax platform is surfaced outside the primary sidebar.
Completed: 2026-04-15 IST - Locked the flagship-only workspace IA: persistent shell for `/app`, `/founder`, `/investor`, `/requests`, `/results`, `/activity`, and `/settings`; Aptax platform surfaces moved to the overview `Built on Aptax` section, lightweight header navigation, and a separate `/platform` page.

### Goal

Design the shared workspace shell before implementing pages.

### Deliverables

* shell layout plan
* sidebar structure
* header structure
* content layout rules
* route mapping plan

### Notes

Must align with `design.md`.

---

## Task 03 — Implement shared app shell

**status:** completed

Started: 2026-04-15 IST - Rebuilding the shell as a route-group layout with new shared page primitives that follow `design.md`.
Completed: 2026-04-15 IST - Implemented the shared workspace shell, flagship-only sidebar, header-level platform links, summary/status/section primitives, and route-group wiring for all product pages.

### Goal

Create the reusable shell for all in-app pages.

### Deliverables

* shared shell component(s)
* sidebar component
* header component
* shell layout primitives
* route wiring for shell usage

---

## Task 04 — Build overview page

**status:** completed

Started: 2026-04-15 IST - Building the new `/app` overview as the home for the flagship due diligence workspace.
Completed: 2026-04-15 IST - Added the overview route with founder/investor entry cards, verification summary stats, workspace health, recent diligence activity, and a dedicated `Built on Aptax` section that surfaces API/SDK/MCP/Aptax Skill outside the sidebar.

### Goal

Create the main Aptax workspace overview page.

### Deliverables

* overview route/page
* founder/investor entry cards
* summary cards
* recent activity or request overview
* future modules preview

---

## Task 05 — Refactor founder dashboard into the new shell

**status:** completed

Started: 2026-04-15 IST - Refactoring the founder workflow onto the shared workspace primitives while preserving the live Phase 1 MRR flow.
Completed: 2026-04-15 IST - Rebuilt the founder dashboard inside the new shell with stronger hierarchy, subject overview, encrypted metric entry, active request visibility, permissions framing, and founder-side activity notes.

### Goal

Upgrade founder experience from MVP page to structured dashboard.

### Deliverables

* founder dashboard inside shared shell
* stronger page header
* subject/company overview
* encrypted metric section
* active requests area
* better empty states and card hierarchy

---

## Task 06 — Refactor investor dashboard into the new shell

**status:** completed

Started: 2026-04-15 IST - Refactoring the investor workflow into the new workspace shell without changing the underlying bounded verification loop.
Completed: 2026-04-15 IST - Rebuilt the investor dashboard with a stronger page header, request builder, bounded result spotlight, request history, and tasteful placeholder space for future diligence collaboration.

### Goal

Upgrade investor experience from MVP page to structured dashboard.

### Deliverables

* investor dashboard inside shared shell
* stronger page header
* request creation area
* result state area
* queue/list/table treatment
* better empty states and card hierarchy

---

## Task 07 — Add future module placeholders

**status:** completed

Started: 2026-04-15 IST - Adding intentional placeholder routes and states so the workspace feels product-shaped without faking extra protocol scope.
Completed: 2026-04-15 IST - Added Requests, Results, Activity, and Settings workspace pages plus in-dashboard placeholder panels that make future areas legible while keeping the actual flagship flow grounded.

### Goal

Make the broader platform shape visible without pretending the features are fully built.

### Deliverables

* placeholder states or pages for future modules
* tasteful `Coming soon` or `In development` labels
* consistent visual treatment for future surfaces

---

## Task 08 — Improve product-wide UI consistency

**status:** completed

Started: 2026-04-15 IST - Tightening shell/dashboard consistency against `design.md` after the route and page structure settled.
Completed: 2026-04-15 IST - Unified the shell, overview, founder, investor, and marketing entry treatment around the darker Aptax workspace language, stronger card hierarchy, calmer spacing, and clearer platform/app separation.
Update: 2026-04-15 IST - Started a focused design fidelity pass on the workspace header and global tokens: removed the forced zero-radius override, switched back to an Inter-led system with `cv01` and `ss03`, added shadcn-style button primitives, and reframed the header as the user-facing `Dilix by Aptax` product.
Update: 2026-04-15 IST - Continued the same fidelity pass on the sidebar: reshaped it into a calmer Linear-like workspace rail with grouped navigation, icon-led rows, softer active states, and a secondary `Built on Aptax` block that stays outside the core app workflow.
Update: 2026-04-18 IST - Refined the shell layout so the sidebar sits flush on the far left while the main workspace content and header content remain centered inside a `max-w-7xl` column.
Update: 2026-04-18 IST - Initialized shadcn/ui officially in `next-app`, added the registry-backed Button component and dependencies, and replaced the remaining handmade founder/investor action buttons with the generated shadcn Button.
Update: 2026-04-19 IST - Started refactoring `/app` into a true Dilix onboarding entry, moved the live role workspaces under `/app/founder` and `/app/investor`, and rebuilt the shell/navigation model so founder and investor users now see role-specific workspace chrome instead of a mixed sidebar.
Update: 2026-04-19 IST - Completed the Dilix role-workspace pass: `/app` now server-routes through onboarding, founder and investor shells have distinct sidebars and module routes, legacy top-level workspace URLs redirect into the new IA, and the preserved founder/investor MVP dashboards now live as the role-specific overviews inside the new workspace structure.

### Goal

Tighten component consistency across shell, overview, founder, and investor surfaces.

### Deliverables

* consistent cards
* consistent headers
* spacing and layout cleanup
* nav/item state cleanup
* stronger in-app product polish

### Notes

Must actively follow `design.md`.

---

## Task 09 — Phase 1.5 QA pass

**status:** completed

Started: 2026-04-15 IST - Running route, lint, type, and production-build checks for the upgraded flagship workspace.
Completed: 2026-04-15 IST - Verified the new route structure and flagship sidebar with `pnpm lint`, `next typegen`, `tsc --noEmit`, and `next build --webpack`. The production build still emits upstream RainbowKit/WalletConnect warnings around `pino-pretty`, chunk circularity, and `indexedDB`, but the build completes successfully and the app routes generate as expected.
Update: 2026-04-19 IST - Re-ran `pnpm lint` and `tsc --noEmit` after the onboarding and role-specific workspace refactor. Both now pass with the new `/app` entry flow, nested founder/investor workspaces, and legacy-route redirects in place.

### Goal

Ensure the app shell upgrade feels coherent and production-shaped.

### Deliverables

* route sanity check
* sidebar and header behavior check
* responsive check
* placeholder credibility check
* visual consistency check
* no broken current MVP flow

---

## 14. Task update protocol for Codex

When starting a task:

* set status to `building`
* add a short `Started:` note

When blocked:

* set status to `blocked`
* add `Blocked on:` note
* explain the blocker clearly

When completed:

* set status to `completed`
* add a short `Completed:` note
* optionally add `Files touched:` summary

After completing a task:

* automatically move the next logical task to `building`
* continue without waiting unless blocked or ambiguity is high

---

## 15. Success criteria

Phase 1.5 is successful when:

* Aptax no longer feels like isolated MVP pages,
* the app has a credible shared product shell,
* overview, founder, and investor experiences feel like one flagship system,
* the platform/app distinction is visually and mentally clear,
* the broader Aptax platform is visible without being confused for core app navigation,
* placeholder modules feel intentional,
* the app looks product-grade enough for judges to imagine the broader platform,
* current working phase 1 flows still function.

---

## 16. Guidance for Codex

This phase is about upgrading perception and product shape without losing the grounded MVP core.

Build with this principle:
**production shape, MVP depth**

That means:

* current flows must remain real,
* future modules may be visible but lightly implemented,
* design quality must go up,
* information architecture must become clearer,
* the overall product should feel more like a system than a demo.
