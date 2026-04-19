# Aptax Roadmap

## 1. What Aptax is

Aptax is a confidential verification infrastructure layer for AI-native and Web3-native workflows.

Its job is not to perform encrypted computation itself.

* **Fhenix** provides the encrypted computation layer.
* **Aptax** turns that capability into a usable verification stack for products, agents, and workflows.

Aptax makes it possible for software to ask bounded questions about private data and receive only bounded answers.

Examples:

* Is startup MRR above a threshold?
* Does a treasury satisfy a policy?
* Does a wallet qualify for access?
* Is a claim valid without exposing the underlying value?

The raw data should not need to be revealed for the workflow to continue.

---

## 2. Product thesis

Modern software still verifies by overexposing.

Apps, agents, and workflows usually need direct access to sensitive data in order to act on it. That creates friction, expands the blast radius of access, and introduces unnecessary trust assumptions.

Aptax changes that default interaction model.

Instead of passing around raw data, Aptax lets software:

1. encrypt the source value,
2. submit a bounded verification request,
3. evaluate it through encrypted computation,
4. return only the minimal result required by the workflow.

This makes confidential verification programmable.

---

## 3. Flagship wedge

The first flagship application built on Aptax is **private due diligence**.

Why this wedge:

* It is high-value and high-friction.
* It has a clear trust problem.
* The workflow is immediately understandable.
* It demonstrates the Aptax model cleanly.

The flagship app should prove the broader thesis:
Aptax is not a diligence-only company. Due diligence is the first product experience built on top of the broader verification stack.

---

## 4. Product layers

Aptax has five product layers.

### Layer 1: Encrypted computation substrate

Provided by Fhenix.

Responsibilities:

* encrypted types and operations,
* client-side encryption and decryption flows,
* permits and decrypt paths,
* contract-side verification logic backed by encrypted computation.

### Layer 2: Aptax verification contracts

Aptax-owned contract layer built on top of Fhenix.

Responsibilities:

* subject registration,
* encrypted metric storage,
* claim template and verification request handling,
* result scoping and permissioning,
* events for indexing and async flow handling.

### Layer 3: Aptax backend and orchestration

Offchain service layer.

Responsibilities:

* workspace/org auth,
* internal API,
* transaction orchestration,
* indexing and polling,
* request lifecycle management,
* audit trails,
* future public platform API.

### Layer 4: Aptax product surfaces

The surfaces external systems and builders use.

* Verification API
* Developer SDK
* MCP server
* Aptax Skill

### Layer 5: First-party product experiences

Applications built on top of the stack.

Phase 1:

* private due diligence app

Future:

* treasury policy verification,
* private compliance checks,
* eligibility / access verification,
* agent-native verification workflows.

---

## 5. Long-term product surfaces

### Verification API

Aptax’s stable programmatic surface for products, backends, and internal tools.

### Developer SDK

A typed integration layer that wraps encryption flow, request creation, permissions, polling, and result consumption.

### MCP server

Agent-callable tool surface for AI systems and model-driven workflows.

### Aptax Skill

A developer acceleration layer for coding assistants. It should help teams scaffold Aptax integrations correctly inside apps and workflows.

Important: the Aptax Skill is not part of the phase-1 critical path.

---

## 6. Target architecture shape

Repository shape:

```text
Aptax/
  next-app/        # frontend + backend for first-party app
  fhenix/          # hardhat + contracts + fhenix/cofhe setup
```

### `next-app/`

Owns:

* Next.js frontend,
* app pages and flows,
* backend routes / API handlers,
* database and orchestration layer,
* optional internal SDK package,
* optional MCP server package.

### `fhenix/`

Owns:

* contract project,
* Fhenix/CoFHE integration,
* deployment scripts,
* test suite,
* local and testnet contract workflow.

---

## 7. Important Fhenix implementation note

Aptax must be built against the updated Fhenix client flow.

Deprecated:

* `FHE.decrypt()`
* legacy `cofhejs`

Current direction:

* `decryptForView` for showing values in the UI, using a permit and offchain flow
* `decryptForTx` for publishing values onchain, returning a signature that is later used with `FHE.publishDecryptResult()`
* migrate to `@cofhe/sdk`

Aptax should not build new work on top of deprecated decryption paths.

---

## 8. Phased roadmap

## Phase 1 — Verification core + flagship application

Goal:
Ship the first complete Aptax product loop with private due diligence as the flagship application.

Build:

* Aptax verification contracts v1
* first-party backend/API v1
* first-party due diligence app v1
* minimal internal SDK wrapper v0.1

Result:
A founder can encrypt and store a metric.
An investor can request bounded verification.
Aptax returns verified / not verified without exposing the raw metric.

## Phase 2 — Platform exposure

Goal:
Expose the verification stack beyond the first-party app.

Build:

* cleaner external API shape,
* developer SDK v1,
* MCP server v0.1,
* docs and examples,
* stronger permission model,
* more claim templates.

Result:
Other products and agent workflows can integrate Aptax without depending on the first-party app internals.

## Phase 3 — Broader verification workflows

Goal:
Expand Aptax beyond due diligence.

Potential workflows:

* treasury policy verification,
* confidential compliance checks,
* eligibility and access gating,
* internal workflow automation,
* agent-native trust checks,
* verification surfaces inside third-party apps.

## Phase 4 — Developer acceleration layer

Goal:
Make Aptax easy to adopt inside modern coding and agent environments.

Build:

* Aptax Skill,
* CLI installer / setup command,
* better SDK templates,
* starter repos,
* stronger MCP resources/prompts.

---

## 9. What we are deliberately not building first

To protect the flagship app and keep the system believable, Aptax phase 1 should not try to ship all of the following at once.

Out of scope for now:

* generalized private policy engine,
* multi-metric scoring engine,
* full public platform API,
* polished external SDK launch,
* large MCP tool suite,
* CLI-installable Aptax Skill,
* enterprise delegation / relayer abstraction,
* multiple flagship applications.

These come later after the verification core proves itself.

---

## 10. Core architecture principles

### 1. Build the first real product first

The flagship application is what proves the Aptax thesis.

### 2. Keep the platform shape visible

Even in phase 1, code and interfaces should preserve the future platform shape.

### 3. Contracts should be generic, not use-case-specific

Use generic verification primitives, not a separate contract for every workflow.

### 4. Keep the backend as the orchestrator

The API layer should unify app, SDK, and future MCP access.

### 5. Avoid deprecated Fhenix patterns

Use `@cofhe/sdk` and the new decrypt flow.

### 6. Product clarity beats platform breadth in phase 1

A strong flagship app is more valuable than a weak collection of developer surfaces.

---

## 11. What success looks like

Aptax phase 1 is successful if it proves all of the following:

* encrypted metrics can be stored and used for bounded verification,
* the flagship due diligence workflow feels real,
* the distinction between Fhenix and Aptax is clear,
* the backend/API shape can later support SDK and MCP exposure,
* the product feels like a broader platform, not just one app.

---

## 12. North star positioning

Fhenix powers the encrypted computation.
Aptax turns that capability into a confidential verification stack for real products, agents, and workflows.
