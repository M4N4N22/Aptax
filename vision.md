# Aptax Vision

## One line
Aptax is the confidential verification layer for products, agents, and workflows. Dilix is the first flagship application built on top of it for private due diligence.

## Why this exists
Software still verifies by overexposing.

In most diligence and compliance workflows, the default pattern is blunt: send the file, share the spreadsheet, expose the room, and hope trust catches up later. That works poorly for founders, operators, and anyone handling sensitive business data. The people asking for proof are often legitimate. The problem is that the proof workflow itself is too invasive, too repetitive, and too early.

Aptax exists to change that model.

Instead of making people hand over raw underlying data every time they need to establish credibility, Aptax is built around a better primitive:

**prove once, verify many times without re-exposing the underlying data.**

This is the shift from disclosure-first software to bounded-answer software.

## How we got here
The initial spark came from looking closely at how venture and corporate venture diligence actually works in the real world.

One of the strongest catalysts was Bill Graves’ article, **“Venture Capital Due Diligence: The Importance of Trade Secret Protection.”** It made the underlying tension unusually clear: diligence is necessary, but it can also force startups into a dangerous disclosure pattern. Graves describes how trade secrets are often among a startup’s most valuable assets, how diligence routinely pushes investors to inspect highly sensitive materials, and how founders are forced into a balancing act between transparency and protection. He also highlights practical mitigations such as secure data rooms, limited access, audit trails, phased disclosure, and summaries instead of full exposure.

That framing mattered because it made the pain obvious:

- the market does not lack diligence tools
- it lacks a better verification model
- secure storage alone does not solve over-disclosure
- founders still end up sharing too much, too early, too often

A second reinforcing signal came from broader fundraising and data room guidance. Good diligence preparation absolutely improves deal flow, but the burden is still on the founder to assemble, organize, and share increasingly sensitive material. In other words, the current system rewards readiness, but still assumes disclosure as the main interface.

That led to the core Aptax idea:

> what if software could answer bounded diligence questions without requiring raw data to be repeatedly exposed?

Fhenix made that idea feel practical rather than theoretical. If encrypted computation can happen in production-grade workflows, then it becomes possible to move from “send me the number” to “let me verify the claim.”

## The thesis
Aptax does not create truth.

It preserves confidentiality around truth claims once they enter the system.

That distinction matters.

If a founder manually enters MRR, Aptax is not magically turning that number into source-of-truth accounting. The long-term value is different: once a claim is established through a trusted input path, reviewer workflow, or connected system, Aptax lets that claim be reused in controlled ways without forcing repeated disclosure.

So the long-term thesis is:

1. Sensitive workflows increasingly require proof, not just permission.
2. Existing software mostly handles this through access control and secure storage.
3. Access control is necessary, but not enough, because the raw data still gets revealed to too many parties.
4. Confidential computation makes a new product category possible: systems that return bounded answers instead of exposing full underlying records.
5. The winning wedge is not abstract infrastructure by itself. It is solving a real workflow first, then expanding into a platform.

## Why Dilix is the first product
Due diligence is the clearest first wedge because the pain is immediate and legible.

Founders are often forced to expose sensitive data before trust and conviction are strong enough to justify that exposure. Investors want confidence, but founders want control. The current process creates an ugly binary between blind trust and full disclosure.

Dilix creates a middle ground.

With Dilix, founders and investors can move through diligence with bounded verification instead of early full disclosure. A founder can prepare company data and verification-ready claims. An investor can request evidence about a business claim. The system returns bounded results rather than exposing raw underlying numbers by default.

Dilix is not the end state. It is the first proof that Aptax’s verification model can be made product-shaped.

## Product architecture in plain English
- **Fhenix** powers encrypted computation.
- **Aptax** turns that capability into usable verification infrastructure.
- **Dilix** is the first application that proves the model in a real workflow.

The long-term ambition is for Aptax to sit underneath many products and many surfaces:
- first-party applications like Dilix
- third-party app integrations
- developer APIs and SDKs
- agent-native verification flows
- workflow automation and policy systems

## What Aptax becomes over time
Today, the easiest way to understand Aptax is as a private diligence layer.

Long term, it should become the verification stack for any workflow where the question is:

**can this system verify what matters without unnecessarily revealing everything else?**

That expands into multiple categories over time:

### 1. Due diligence
The first wedge.

Examples:
- revenue threshold checks
- runway confirmation
- customer concentration checks
- gross margin checks
- internal reviewer-assisted diligence

### 2. Compliance and policy verification
Examples:
- treasury policy checks
- partner eligibility checks
- internal control verification
- regulated access flows
- confidential policy enforcement

### 3. Access and trust infrastructure
Examples:
- gated access based on confidential criteria
- app permissions based on verified attributes
- private qualification checks for marketplaces and SaaS tools

### 4. Agent-native verification
Examples:
- AI agents that can ask bounded questions against sensitive systems
- agent workflows that receive proofs or bounded answers instead of raw records
- autonomous workflows that remain useful without becoming over-privileged

### 5. Embedded verification surfaces
Examples:
- “verify this claim” inside third-party apps
- plug-in verification modules for fintech, legaltech, procurement, and enterprise workflows
- private proof layers behind customer-facing products

## Roadmap

### Phase 1: prove the wedge
**Goal:** make private diligence real and legible.

- launch Dilix as the first flagship product
- support founder and investor workspaces
- let founders prepare company profile and verification-ready data
- support bounded checks on initial core diligence metrics
- make the workflow feel product-grade, not protocol-shaped

Success looks like:
- users understand the value proposition immediately
- one real diligence flow works end to end
- the product proves that bounded verification is easier to trust than early oversharing

### Phase 1.5: make it feel inevitable
**Goal:** turn the MVP into something that feels like a real operating product.

- sharpen onboarding and role-based workspaces
- improve overview, company profile, data room, and requests flows
- make the founder experience calm, clear, and credible
- make the investor experience focused on request handling and confidence-building
- improve IA so the product tells one clear story

Success looks like:
- the product is easy to demo
- the workflow feels coherent enough to sell
- the first users can imagine using it beyond a hackathon context

### Phase 2: move from one metric to a reusable verification model
**Goal:** expand from a narrow demo loop into a real verification substrate.

- move beyond MRR to a broader metric and claims layer
- introduce structured metric storage and reusable claim policies
- support more diligence checks with the same underlying pattern
- make connected inputs, reviewer workflows, and source-of-truth integrations possible

Success looks like:
- Aptax is no longer “the thing that privately verifies MRR”
- Dilix becomes a real diligence operating system
- the underlying platform starts to look reusable beyond this one app

### Phase 3: externalize the platform
**Goal:** let others build on Aptax.

- launch API and SDK surfaces
- define app-facing and agent-facing verification primitives
- support third-party integrations and embedded verification widgets
- create opinionated developer flows for bounded verification requests and responses

Success looks like:
- external developers can build on the model without learning the full cryptography stack
- Aptax becomes a category entry point, not just a first-party product backend

### Phase 4: policy, automation, and agent workflows
**Goal:** turn verification into an application-layer primitive.

- support reusable policy engines
- add confidential eligibility and approval flows
- support agent-native execution paths
- enable automation tools and enterprise systems to consume bounded verification outputs

Success looks like:
- Aptax powers real workflows outside venture diligence
- the platform becomes useful even when the original user never thinks about FHE directly

## GTM
The go-to-market should start narrow and narrative-rich.

### Wedge
**Private due diligence for founders and investors**

This wedge works because:
- the pain is easy to understand
- the current workflow is obviously broken
- the status quo still relies on raw disclosure
- the market already understands “data room” and “diligence,” which makes onboarding easier
- the product has a strong story for demos, pilots, and early design partners

### Initial users
1. early-stage founders handling investor diligence
2. angel and pre-seed / seed investors who want faster confidence loops
3. corporate venture and strategic diligence teams where confidentiality concerns are stronger
4. startup advisors, finance operators, and legal/ops partners who touch diligence repeatedly

### GTM motion
1. **Founder-led storytelling**
   - use the problem framing aggressively: software still verifies by overexposing
   - show the middle ground between blind trust and full early disclosure
   - demo one sharp workflow instead of pitching a general-purpose privacy protocol

2. **Design partner motion**
   - work closely with a small number of founders, angels, and diligence-heavy operators
   - learn what claims actually matter first
   - prioritize real trust bottlenecks over theoretical protocol breadth

3. **Flagship-app-first distribution**
   - let Dilix prove the model in the market
   - use the app to generate usage patterns, objections, and proof points
   - delay broad platform packaging until the workflow is clearly valuable

4. **Platform expansion after proof**
   - once Dilix produces repeated demand patterns, expose the underlying primitives as API / SDK / agent surfaces

### Positioning
Aptax should be positioned as:

- **the verification layer for products and agents**
- **a better interface to private information**
- **private data in, bounded answers out**

Dilix should be positioned as:

- **the first flagship product built on Aptax**
- **a private diligence workflow for founders and investors**

### Why this can win
The market already has storage tools, permissions tools, and data rooms.
What it lacks is a good application-layer answer to this question:

**how do you establish trust without handing over the whole underlying dataset?**

Aptax can win if it becomes the default way to build that answer.

## Principles
1. **Start with workflows, not crypto.**
   Users should understand the product without needing to understand the underlying cryptography.

2. **Product first, protocol underneath.**
   The best proof of infrastructure value is a product people actually want.

3. **Bounded answers beat broad disclosure.**
   The product should always prefer clear, limited, decision-useful outputs over exposing raw materials by default.

4. **Trust is not binary.**
   Between blind trust and full disclosure, there is a large, valuable middle ground.

5. **Do not confuse confidentiality with truth creation.**
   Aptax protects and reuses trusted claims; it does not magically create trustworthy inputs.

6. **Make the system legible.**
   Privacy products fail when users cannot tell what is happening. The UX must make boundaries, requests, and outcomes clear.

## Long-term end state
The long-term goal is not just to build a better diligence product.

The long-term goal is to make confidential verification a standard application primitive.

If Aptax succeeds, teams will stop thinking in terms of “who gets the full file?” and start thinking in terms of “what exactly needs to be verified here?”

That is the category change:

from sharing secrets with software,
to asking software bounded questions about secrets.

## Reading references that shaped this thinking
1. Bill Graves, **Venture Capital Due Diligence: The Importance of Trade Secret Protection** (TDK Ventures / Medium)
2. Slidebean, **How to Build an Investor Data Room: A Founder’s Guide to Startup Due Diligence** (Medium)
3. Jill Godden, **From FOMO to Diligence: Why Investors Are Taking Longer and Asking More** (Moonshotnx Capital Stack / Medium)
