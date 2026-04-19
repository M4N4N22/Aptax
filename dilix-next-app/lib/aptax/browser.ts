"use client";

import { WagmiAdapter } from "@cofhe/sdk/adapters";
import { arbSepolia, hardhat, localcofhe, sepolia } from "@cofhe/sdk/chains";
import { createCofheClient, createCofheConfig } from "@cofhe/sdk/web";
import { ethers } from "ethers";
import type { PublicClient, WalletClient } from "viem";

import type {
  AptaxMetricOperator,
  AptaxMetricSlug,
  AptaxPublicConfig,
} from "@/lib/aptax/types";

export const diligenceMetricSlugs = [
  "mrr",
  "runway_months",
  "cash_balance",
  "gross_margin_bps",
  "customer_concentration_bps",
] as const satisfies readonly AptaxMetricSlug[];

const chainById = {
  31337: hardhat,
  42069: localcofhe,
  11155111: sepolia,
  421614: arbSepolia,
} as const;

export type AptaxWalletSessionInput = {
  account?: `0x${string}`;
  chainId?: number;
  publicClient?: PublicClient;
  walletClient?: WalletClient;
};

export type AptaxBrowserSession = {
  account: `0x${string}`;
  chainId: number;
  publicClient: PublicClient;
  walletClient: WalletClient;
  registryAddress: `0x${string}`;
  metricStoreAddress: `0x${string}`;
  verifierAddress: `0x${string}`;
  cofheClient: Awaited<ReturnType<typeof createCofheClient>>;
};

export async function createAptaxBrowserSession(
  config: AptaxPublicConfig,
  walletSession: AptaxWalletSessionInput
): Promise<AptaxBrowserSession> {
  const { account, chainId, publicClient, walletClient } = walletSession;

  if (!account || !publicClient || !walletClient || !chainId) {
    throw new Error("Connect a wallet with the Aptax app header before using the phase-1 flows.");
  }

  if (!config.configured) {
    throw new Error(config.error ?? "Aptax contracts are not configured for this app.");
  }

  if (chainId !== config.networkChainId) {
    throw new Error(
      `Switch your wallet to network ${config.networkChainId} before interacting with the Aptax contracts.`
    );
  }

  const cofheChain = chainById[config.networkChainId as keyof typeof chainById];
  if (!cofheChain) {
    throw new Error(`CoFHE support is not configured for network ${config.networkChainId}.`);
  }

  const cofheConfig = createCofheConfig({
    supportedChains: [cofheChain],
  });
  const cofheClient = createCofheClient(cofheConfig);
  const adaptedClients = await WagmiAdapter(walletClient as WalletClient, publicClient as PublicClient);

  await cofheClient.connect(
    adaptedClients.publicClient as PublicClient,
    adaptedClients.walletClient as WalletClient
  );
  await cofheClient.permits.getOrCreateSelfPermit(config.networkChainId, account, {
    issuer: account,
    name: "Aptax Phase 1 permit",
  });

  return {
    account,
    chainId,
    publicClient,
    walletClient,
    registryAddress: config.registryAddress as `0x${string}`,
    metricStoreAddress: config.metricStoreAddress as `0x${string}`,
    verifierAddress: config.verifierAddress as `0x${string}`,
    cofheClient,
  };
}

export function makeSubjectId(slug: string) {
  const normalized = slug.trim().toLowerCase().replace(/\s+/g, "-");
  if (!normalized) {
    throw new Error("Enter a startup slug before creating a subject.");
  }
  return ethers.id(`startup:${normalized}`);
}

export function makeMetricKey(metricSlug: AptaxMetricSlug | string) {
  const normalized = metricSlug.trim().toLowerCase();
  if (!normalized) {
    throw new Error("Enter a metric key before storing or verifying a diligence metric.");
  }

  return ethers.id(normalized);
}

export function parseUnsignedBigInt(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label} is required.`);
  }

  const parsed = BigInt(trimmed);
  if (parsed <= BigInt(0)) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return parsed;
}

export function abbreviateAddress(value: string) {
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

export function formatVerificationLabel(result: boolean) {
  return result ? "verified" : "not_verified";
}

export function normalizeOperatorKind(
  operatorKind?: AptaxMetricOperator
): AptaxMetricOperator {
  return operatorKind === "lte" ? "lte" : "gte";
}
