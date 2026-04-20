# Dilix App

Dilix is the first-party application built on top of Aptax.

It turns confidential verification into a user-facing due diligence workflow for founders and investors.

## What the app does

Dilix is a private diligence workspace where:

- founders manage a single-company workspace
- company data can be uploaded as encrypted metrics
- investors request bounded verification instead of raw exports
- the product stays focused on readiness, requests, and verification coverage

This app is the flagship wedge for the broader Aptax thesis: verify what matters without exposing more than you need to.

## Current product areas

### Founder workspace

The founder side currently includes:

- onboarding into a single-company workspace
- overview focused on live diligence flow
- company profile
- data room
- manual demo upload flow for company data
- founder-only decrypt for uploaded values

Important note: the upload page uses manual input for the current demo. The intended production flow is hybrid source ingestion plus review or attestation before a metric becomes broadly reusable.

### Investor workspace

The investor side currently includes:

- investor dashboard
- diligence request views
- results-oriented workflows
- activity and opportunity surfaces

## Tech stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Wagmi + RainbowKit
- `viem` and `ethers`
- `@cofhe/sdk` for Fhenix client flows

## Contract integration

The app reads from the Aptax contracts deployed on Base Sepolia.

Generated integration artifacts live in:

- [lib/aptax/abis.generated.ts](C:\dev\buildathons\fhenix-buildathon\Aptax\dilix-next-app\lib\aptax\abis.generated.ts)
- [lib/aptax/deployments.generated.json](C:\dev\buildathons\fhenix-buildathon\Aptax\dilix-next-app\lib\aptax\deployments.generated.json)

Those files are updated automatically from the contracts package after deployment.

Current Base Sepolia addresses:

- Registry: `0xE79D3fa05aE722a69bbd5c47558C7b4F423Cf23d`
- Metric Store: `0x1849367bA40715d98C4bC107e4c9AAC8392661E9`
- Verifier: `0xA6741DdCd52320921e6513D6310ac0FB5967Ba73`

## Local setup

Install dependencies:

```bash
npm install
```

Create `.env.local`.

Recommended Base Sepolia configuration:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_NETWORK_CHAIN_ID=84532
NEXT_PUBLIC_NETWORK_RPC_URL=https://sepolia.base.org
```

Optional overrides if you want to pin explicit contract addresses:

```env
NEXT_PUBLIC_APTAX_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_APTAX_METRIC_STORE_ADDRESS=0x...
NEXT_PUBLIC_APTAX_VERIFIER_ADDRESS=0x...
```

Notes:

- for Base Sepolia, the app can fall back to the generated deployment manifest if those contract addresses are not set manually

## Running the app

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Start:

```bash
npm run start
```

## Important routes

- `/` landing page
- `/app` application entry
- `/app/founder` founder workspace
- `/app/founder/company` company profile
- `/app/founder/metrics` data room
- `/app/founder/upload` upload company data
- `/app/investor` investor workspace

## Build note

The build script currently uses:

```bash
next build --webpack
```

That was chosen to avoid the slower or stuck optimized build behavior that was showing up with the default Turbopack build path in this project.

## Where to look next

- [components/aptax](C:\dev\buildathons\fhenix-buildathon\Aptax\dilix-next-app\components\aptax) for core founder and investor UI
- [app](C:\dev\buildathons\fhenix-buildathon\Aptax\dilix-next-app\app) for route structure
- [lib/aptax](C:\dev\buildathons\fhenix-buildathon\Aptax\dilix-next-app\lib\aptax) for browser-side contract and CoFHE integration
- [server/aptax](C:\dev\buildathons\fhenix-buildathon\Aptax\dilix-next-app\server\aptax) for server-side contract access and workspace helpers
