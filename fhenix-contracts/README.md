# Aptax Contracts

This package contains the Aptax verification contracts built on top of Fhenix primitives.

Its job is to provide a reusable confidential verification layer for the product, rather than a diligence app-specific one-off contract set.

## What lives here

- Solidity contracts for subject registration, encrypted metric storage, and threshold verification
- Hardhat configuration for local and testnet deployment
- deployment scripts
- ABI and deployment sync into the Next.js app

## Current contracts

### `AptaxRegistry.sol`

The registry anchors each diligence subject.

Current responsibilities:

- register a subject ID
- track the owner of that subject
- store metadata URI
- expose subject lookup and listing

In the current Dilix flow, a single founder workspace maps to one onboarded company subject.

### `AptaxMetricStore.sol`

The metric store holds encrypted metrics for a registered subject.

Current responsibilities:

- accept encrypted `uint64` metric inputs
- keep track of whether a metric has been stored
- retain an update timestamp and encrypted handle reference
- allow the configured verifier contract to operate on stored values

The store is generic by metric key, even though there is still a convenience function for MRR.

### `AptaxVerifier.sol`

The verifier creates bounded checks over encrypted metrics.

Current responsibilities:

- create threshold requests for a subject and metric
- evaluate `gte` and `lte` checks using encrypted computation
- store request metadata
- expose request lookup by subject and requester

Today the result shape is intentionally narrow: request a bounded verification and receive the result handle, rather than revealing the raw metric.

## Current deployed network

Base Sepolia:

- Registry: `0xE79D3fa05aE722a69bbd5c47558C7b4F423Cf23d`
- Metric Store: `0x1849367bA40715d98C4bC107e4c9AAC8392661E9`
- Verifier: `0xA6741DdCd52320921e6513D6310ac0FB5967Ba73`

Deployment record:

- [deployments/base-sepolia.json](C:\dev\buildathons\fhenix-buildathon\Aptax\fhenix-contracts\deployments\base-sepolia.json)

## Commands

Install:

```bash
npm install
```

Compile:

```bash
npm run build
```

Test:

```bash
npm run test
```

Deploy to Base Sepolia:

```bash
npm run deploy:base-sepolia
```

Sync ABIs and deployment data into the app:

```bash
npm run sync:dilix-app
```

## Environment

Copy [`.env.example`](C:\dev\buildathons\fhenix-buildathon\Aptax\fhenix-contracts\.env.example) to `.env` and provide:

```env
PRIVATE_KEY=
BASE_SEPOLIA_RPC_URL=
SEPOLIA_RPC_URL=
ARBITRUM_SEPOLIA_RPC_URL=
```

For the current main workflow, `PRIVATE_KEY` and `BASE_SEPOLIA_RPC_URL` are the important ones.

## Deployment and sync flow

The deployment script is designed to keep the app integration in sync.

When `scripts/deploy.ts` runs, it:

1. deploys the registry
2. deploys the metric store
3. deploys the verifier
4. configures the verifier on the metric store
5. writes the deployment manifest in this package
6. copies ABIs and deployment data into `dilix-next-app`

The sync logic lives in [scripts/sync-dilix-app.ts](C:\dev\buildathons\fhenix-buildathon\Aptax\fhenix-contracts\scripts\sync-dilix-app.ts).

## Contract design principles

- keep contracts generic rather than building a separate contract per diligence workflow
- let Fhenix handle encrypted computation primitives
- expose enough structure for app indexing and future platform surfaces
- preserve a clean path from first-party product to future SDK/API usage

## Future additions

Likely next additions in this package:

- richer claim templates beyond simple threshold checks
- stronger result scoping and permission controls
- better event coverage for indexing and async orchestration
- more explicit verification lifecycle support
- cleaner support for review or attestation-backed ingestion flows

The intent is to expand the verification layer without turning it into a product-specific monolith.
