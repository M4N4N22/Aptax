# Aptax Phase 1 Execution Plan

## 0. How to use this file

This file is the implementation source of truth for Codex during phase 1.

`roadmap.md` explains the broader Aptax vision.
`phase-1.md` defines what should be built right now.

Codex should:

* read `roadmap.md` for context,
* treat this file as the active execution plan,
* work task by task,
* update task statuses directly in this file,
* move the next task from `pending` to `building` when starting it,
* mark tasks as `completed` only after code is implemented and locally validated as far as practical,
* append short implementation notes under each completed task.

Status values:

* `pending`
* `building`
* `blocked`
* `completed`

Only one major task should be marked `building` at a time unless parallel work is truly independent.

---

## 1. Phase 1 goal

Ship the first complete Aptax loop:

1. a founder can connect, register a subject, and store an encrypted metric,
2. an investor can request a bounded verification check,
3. Aptax can compute and return a result of `verified` or `not_verified`,
4. the first-party app demonstrates private due diligence as the flagship application.

This phase should also preserve the future Aptax platform shape, but without overbuilding the public platform surfaces.

---

## 2. Phase 1 in-scope deliverables

### In scope

* `fhenix-contracts/` project bootstrapped with Hardhat + Fhenix-compatible setup
* Aptax verification contracts v1
* Next.js app and backend inside `next-app/`
* first-party due diligence flow
* minimal internal API layer for the app
* minimal internal SDK wrapper if it reduces duplication
* migration-aware Fhenix client usage based on `@cofhe/sdk`
* updated decrypt flow usage:

  * `decryptForView`
  * `decryptForTx` where relevant

### Out of scope

* polished public SDK launch
* full public API documentation
* public MCP server
* Aptax Skill package / installer
* delegated auth / relayer abstraction
* multiple flagship workflows
* advanced multi-metric scoring
* generalized policy engine

---

## 3. Repository structure target

```text
Aptax/
  next-app/
    app/
    components/
    lib/
    server/
    docs/
  fhenix-contracts/
    contracts/
    scripts/
    test/
    ignition/
```

### `next-app/`

This is the first-party app and backend.

Expected responsibilities:

* landing page
* founder dashboard
* investor dashboard
* verification request flow
* backend routes / server actions
* orchestration against contracts
* optional internal SDK wrapper under `lib/aptax`

### `fhenix-contracts/`

This is the contract workspace.

Expected responsibilities:

* Hardhat + Fhenix setup
* Aptax contracts
* deploy scripts
* local/testnet testing

---

## 4. Functional scope for phase 1

### Subject

Support one subject type:

* startup

### Metric

Support one metric first:

* MRR

### Verification logic

Support one verification mode first:

* `mrr >= threshold`

### Result

Support one bounded result first:

* `verified`
* `not_verified`

### UX roles

Support two user roles first:

* founder
* investor

---

## 5. Technical constraints

### Fhenix constraints

* Do not use deprecated `FHE.decrypt()` flow.
* Do not build new client logic on top of `cofhejs`.
* Use `@cofhe/sdk`.
* Use `decryptForView` for UI display where needed.
* Use `decryptForTx` only when onchain publication of decrypted result is actually required.

### Product constraints

* Do not overexpose the exact metric in UI or API.
* The investor must only receive a bounded result.
* Keep threshold checks simple and reliable.

### Architecture constraints

* Keep backend orchestration in `next-app/`.
* Keep contracts and deployments in `fhenix/`.
* Preserve a future platform-friendly API shape, but do not prematurely productize it.

---

## 6. User flow target

### Founder flow

1. connect wallet
2. create or register startup subject
3. input MRR
4. encrypt MRR client-side
5. store encrypted metric through Aptax flow
6. review active verification requests

### Investor flow

1. connect wallet or use app auth if implemented
2. select a startup subject
3. submit a threshold verification request
4. wait for computation status
5. receive `verified` or `not_verified`

---

## 7. Core contracts target

Phase 1 should aim for a small contract surface.

Suggested contract split:

* `AptaxRegistry.sol`
* `AptaxVerifier.sol`

### `AptaxRegistry.sol`

Responsibilities:

* register subject ownership
* map subject identifiers to owner addresses
* store metadata references if needed

### `AptaxVerifier.sol`

Responsibilities:

* store encrypted metric handle for a subject and metric key
* accept threshold verification requests
* compute `gte` check on encrypted metric
* emit request/result lifecycle events
* scope result access appropriately

Do not split further unless necessary.

---

## 8. Internal API target

Phase 1 backend/API should support:

* create subject
* upload encrypted metric
* create verification request
* get verification request status/result
* list requests for a subject

These may be implemented as:

* route handlers
* server actions
* or a thin service layer

Keep the shape clean enough to later become the public Aptax API.

---

## 9. Internal SDK target

Only build this if it meaningfully reduces duplication.

Suggested internal client methods:

* `createSubject()`
* `storeEncryptedMetric()`
* `createVerificationRequest()`
* `getVerificationResult()`

This is not a public SDK launch.
This is a thin internal wrapper to keep app code clean.

---

## 10. Phase 1 task board

## Task 01 — Bootstrap contract workspace

**status:** completed

Started: 2026-04-15 IST - Bootstrapping the contract workspace against the current Fhenix Hardhat and `@cofhe/sdk` setup guidance.
Completed: Created the Hardhat 2 + CoFHE contract workspace, installed the supported dependencies, added config/env scaffolding, and validated the workspace through local contract tests.
Files touched:
* `fhenix-contracts/package.json`
* `fhenix-contracts/hardhat.config.ts`
* `fhenix-contracts/tsconfig.json`
* `fhenix-contracts/.env.example`
* `fhenix-contracts/.gitignore`
* `fhenix-contracts/test/AptaxPhase1.test.ts`

### Goal

Create the `fhenix/` workspace with Hardhat and required Fhenix-compatible structure.

### Deliverables

* `fhenix/` directory created
* Hardhat project initialized
* dependencies installed
* environment config scaffolded
* placeholder deploy/test scripts present

### Notes

Must be set up for current Fhenix flow, not deprecated client patterns.

---

## Task 02 — Confirm current Fhenix client flow and dependency choices

**status:** completed

Started: 2026-04-15 IST - Validating the supported Hardhat 2 + `@cofhe/hardhat-plugin@0.4.0` stack and locking where `decryptForView` vs `decryptForTx` applies in phase 1.
Completed: Confirmed `@cofhe/sdk` and the Hardhat plugin on Hardhat 2 are the compatible phase-1 stack. `decryptForView` is required for founder-side metric viewing and investor-side bounded result viewing; `decryptForTx` is not needed in phase 1 because no on-chain plaintext publication flow is required.

### Goal

Bake the migration guidance into implementation choices before writing contract-facing frontend code.

### Deliverables

* confirm use of `@cofhe/sdk`
* document where `decryptForView` is needed
* document whether `decryptForTx` is needed in phase 1
* remove or avoid any `cofhejs` assumptions

### Notes

This task should influence both `next-app/` and `fhenix/` implementation.

---

## Task 03 — Design contract interfaces v1

**status:** completed

Completed: Locked a minimal v1 API around `registerSubject`, `storeEncryptedMrr`, `createMrrThresholdRequest`, request lookup/listing, and lifecycle events for stored metrics plus computed verification handles.

### Goal

Lock the smallest believable contract API before implementing.

### Deliverables

* subject registration function design
* encrypted metric storage function design
* verification request function design
* result access model design
* event list defined

### Notes

Keep the surface minimal and generic.

---

## Task 04 — Implement `AptaxRegistry.sol`

**status:** completed

Completed: Implemented subject registration, metadata updates, owner lookup, and owner checks with custom errors and test coverage.
Files touched:
* `fhenix-contracts/contracts/AptaxRegistry.sol`
* `fhenix-contracts/test/AptaxPhase1.test.ts`

### Goal

Implement subject ownership and registration.

### Deliverables

* contract file created
* subject registration implemented
* subject ownership retrieval implemented
* tests added

---

## Task 05 — Implement `AptaxVerifier.sol`

**status:** completed

Completed: Implemented encrypted MRR storage, threshold verification requests, bounded result handle scoping to the requester, and request indexing with end-to-end tests.
Files touched:
* `fhenix-contracts/contracts/AptaxVerifier.sol`
* `fhenix-contracts/test/AptaxPhase1.test.ts`
Update: 2026-04-19 IST - Refactored the contract layer beyond the original MRR-only shape by adding `AptaxMetricStore.sol`, moving encrypted metric persistence into the store, and upgrading `AptaxVerifier.sol` to support generic `metricKey + threshold + operatorKind` checks with `gte` and `lte` while preserving MRR compatibility wrappers for the current flagship flow.

### Goal

Implement encrypted metric storage and one threshold verification flow.

### Deliverables

* contract file created
* encrypted MRR storage implemented
* `mrr >= threshold` verification request implemented
* result lifecycle events implemented
* tests added

### Notes

This is the heart of phase 1.

---

## Task 06 — Deployment and local/testnet scripts

**status:** completed

Completed: Added a deploy script that emits the registry/verifier addresses as JSON and scaffolded the environment inputs needed for app wiring.
Files touched:
* `fhenix-contracts/scripts/deploy.ts`
* `fhenix-contracts/.env.example`

### Goal

Make contracts deployable and usable from the app.

### Deliverables

* deploy script(s)
* contract address output format
* env wiring plan for `next-app/`

---

## Task 07 — Scaffold Aptax backend/service layer in `next-app/`

**status:** completed

Started: 2026-04-15 IST - Building the first-party app services around the validated contract surface and current Next.js app-router/server-action guidance.
Completed: Added typed Aptax app ABIs, browser-side wallet/CoFHE session helpers, server-only env + contract wiring, and query helpers for subjects plus request history.
Files touched:
* `next-app/lib/aptax/abis.ts`
* `next-app/lib/aptax/browser.ts`
* `next-app/lib/aptax/types.ts`
* `next-app/server/aptax/env.ts`
* `next-app/server/aptax/contracts.ts`
* `next-app/server/aptax/queries.ts`
Update: 2026-04-19 IST - Extended the app contract wiring for the new metric-store architecture: added the metric-store ABI and address wiring, expanded verification request types to include `metricKey` and `operatorKind`, and kept the internal client surface MRR-compatible while introducing generic metric helpers underneath.

### Goal

Create the backend shape that will orchestrate app flows.

### Deliverables

* service folder(s) defined
* contract client wiring created
* subject service
* metric service
* verification service

### Notes

Even if implemented simply, keep service boundaries clean.

---

## Task 08 — Create internal API endpoints or server actions

**status:** completed

Started: 2026-04-15 IST - Exposing the app read model through route handlers while keeping write flows wallet-signed in the browser to avoid out-of-scope relayer behavior.
Completed: Added prepared-transaction handlers for subject creation, encrypted MRR storage, and threshold verification requests, plus request status/result lookups and the read-model routes the app uses.
Files touched:
* `next-app/server/aptax/transactions.ts`
* `next-app/app/api/aptax/config/route.ts`
* `next-app/app/api/aptax/subjects/route.ts`
* `next-app/app/api/aptax/subjects/[subjectId]/metric/route.ts`
* `next-app/app/api/aptax/subjects/[subjectId]/requests/route.ts`
* `next-app/app/api/aptax/requests/[requestId]/route.ts`
Update: 2026-04-19 IST - Generalized the prepared transaction layer so metric writes can target any `metricKey` and verification requests can specify both `metricKey` and `operatorKind`, while the existing MRR endpoints still default cleanly to the flagship MVP flow.

### Goal

Expose the first-party app flows through backend interfaces.

### Deliverables

* create subject handler
* store encrypted metric handler
* create verification request handler
* get verification result handler

---

## Task 09 — Founder dashboard v1

**status:** completed

Completed: Built the founder dashboard route and UI for wallet connect, subject registration, encrypted MRR storage, founder-only decrypt confirmation, and request review.
Files touched:
* `next-app/app/founder/page.tsx`
* `next-app/components/aptax/founder-dashboard.tsx`

### Goal

Create the founder-side product flow.

### Deliverables

* founder page/route
* connect wallet flow
* startup subject creation UI
* MRR input UI
* encrypt/store metric UI
* list active requests UI

### Notes

Use the updated decrypt flow only where needed for founder-side display.

---

## Task 10 — Investor dashboard v1

**status:** completed

Completed: Built the investor dashboard route and UI for wallet connect, startup selection, threshold requests, bounded result decryption, and recent request review.
Files touched:
* `next-app/app/investor/page.tsx`
* `next-app/components/aptax/investor-dashboard.tsx`

### Goal

Create the investor-side product flow.

### Deliverables

* investor page/route
* startup selection UI
* threshold input or predefined threshold UI
* request verification action
* pending/computed result state UI

---

## Task 11 — Wire end-to-end founder → investor verification flow

**status:** completed

Started: 2026-04-15 IST - Wiring the founder and investor dashboards through the shared Aptax app layer so the full flagship loop uses one consistent path.
Completed: The founder flow now registers subjects when needed, prepares and submits encrypted MRR storage through the internal API layer, and confirms the stored handle with `decryptForView`. The investor flow prepares and submits threshold requests through the same app layer, resolves the request, and decrypts only the bounded verdict.
Files touched:
* `next-app/lib/aptax/client.ts`
* `next-app/components/aptax/founder-dashboard.tsx`
* `next-app/components/aptax/investor-dashboard.tsx`
Update: 2026-04-19 IST - Preserved the current founder and investor MRR experience by keeping `storeFounderMrr()` and `requestThresholdVerification()` as compatibility wrappers on top of the new generic metric/request client methods.

### Goal

Make the full flagship loop work.

### Deliverables

* founder stores encrypted MRR
* investor submits verification request
* request resolves through backend/contract flow
* investor receives bounded result

### Notes

This task is not complete until the whole flow works together.

---

## Task 12 — Build minimal internal SDK wrapper

**status:** completed

Completed: Added a thin internal Aptax client wrapper that centralizes app config fetches, subject/request queries, prepared transaction submission, founder-side encrypted MRR storage, and investor-side threshold verification orchestration.
Files touched:
* `next-app/lib/aptax/client.ts`
* `next-app/lib/aptax/browser.ts`
* `next-app/lib/aptax/types.ts`
Update: 2026-04-19 IST - Expanded the internal wrapper so it now supports generic diligence metric storage and generic threshold verification requests while still exposing MRR-first helpers for the flagship product.

### Goal

Reduce duplication and shape the future platform surface without overbuilding.

### Deliverables

* `lib/aptax/` or equivalent
* typed helper methods for core app actions
* app refactored to use wrapper where sensible

---

## Task 13 — Seed docs inside repo for future platform surfaces

**status:** completed

Completed: Added a short phase-1 note that explains the Aptax vs. Fhenix boundary and records the future API, SDK, and MCP surface shapes without overbuilding them in code.
Files touched:
* `next-app/docs/phase-1-platform-notes.md`

### Goal

Make the platform shape legible even though only the app is fully productized in phase 1.

### Deliverables

* short notes for future API
* short notes for future SDK
* short notes for future MCP
* clear distinction between Aptax and Fhenix in docs

---

## Task 14 — Phase 1 QA and demo pass

**status:** blocked

Started: 2026-04-15 IST - Running the final phase-1 validation pass across contracts, app wiring, and active Fhenix usage.
Blocked on: A real runtime config and deployed addresses for the first-party app. The repository currently includes `next-app/.env.example` but no live `next-app/.env.local` values to run a manual founder → investor browser demo against.
Completed so far: Contract tests pass, `pnpm lint` passes, `tsc --noEmit` passes, founder and investor flows now use RainbowKit + Wagmi wallet connection with a shared CoFHE session path, the app config now refers to the Aptax deployment network instead of an “Aptax chain”, `next build --webpack` passes, and no deprecated `FHE.decrypt()`, `cofhejs`, or `decryptHandle` calls remain in active source.
Files touched:
* `next-app/components/providers/app-providers.tsx`
* `next-app/components/providers/wallet-connect-button.tsx`
* `next-app/lib/aptax/wallet.ts`
* `next-app/lib/aptax/browser.ts`
* `next-app/lib/aptax/client.ts`
* `next-app/components/aptax/founder-dashboard.tsx`
* `next-app/components/aptax/investor-dashboard.tsx`
* `next-app/server/aptax/env.ts`
* `next-app/app/api/aptax/config/route.ts`
* `next-app/.env.example`
Recommendation for unblocking: Provide deployed Aptax contract addresses plus RPC configuration for `next-app/.env.local`, then run one manual browser pass with a founder wallet and an investor wallet to confirm the demo loop end to end.
Update: 2026-04-19 IST - Revalidated the upgraded generic metric architecture with `npx hardhat test`, `pnpm lint`, and `tsc --noEmit`. Automated verification now passes with `AptaxMetricStore`, generic threshold requests, and the preserved MRR compatibility path in place. The task remains blocked only on live deployment values for a manual browser demo.

### Goal

Prepare the system to be demoed reliably.

### Deliverables

* verify core flow manually
* verify no deprecated Fhenix client calls remain
* verify investor only sees bounded result
* verify contract/app env wiring
* tighten loading/error states

---

## 11. Task update protocol for Codex

When starting a task:

* set its status to `building`
* add a short line under the task: `Started: <date/time or short note>`

When blocked:

* set status to `blocked`
* add a `Blocked on:` note
* add a short recommendation for unblocking

When completed:

* set status to `completed`
* add `Completed:` note with a short summary of what was implemented
* optionally add `Files touched:` list

After marking one task completed:

* immediately move the next logical task to `building`
* do not wait for another instruction unless the next step is ambiguous or blocked

---

## 12. Demo-ready success criteria

Phase 1 is demo-ready when all of the following are true:

* founder can register a startup subject
* founder can encrypt and store MRR
* investor can create a verification request for `mrr >= threshold`
* system resolves and returns `verified` or `not_verified`
* investor does not see raw MRR
* codebase clearly separates `next-app/` and `fhenix/`
* no deprecated Fhenix decrypt flow is used in the active implementation

---

## 13. Guidance for Codex

Build phase 1 like a product team, not like a platform research project.

That means:

* optimize for the first real working loop,
* keep the platform shape visible but thin,
* avoid overbuilding future surfaces,
* preserve clean structure so phase 2 can expose API/SDK/MCP cleanly,
* prefer a smaller reliable system over a broad fragile one.

North star for this phase:
Ship the first flagship Aptax product on a real verification core.
