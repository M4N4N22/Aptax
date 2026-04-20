"use client";

import { baseSepolia, hardhat } from "wagmi/chains";

const FALLBACK_WALLETCONNECT_PROJECT_ID = "00000000000000000000000000000000";
const FALLBACK_LOCAL_RPC_URL = "http://127.0.0.1:8545";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  FALLBACK_WALLETCONNECT_PROJECT_ID;

const rawChainId =
  process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID ??
  process.env.NEXT_PUBLIC_CHAIN_ID ??
  String(baseSepolia.id);

export const networkChainId = Number(rawChainId);

if (!Number.isInteger(networkChainId)) {
  throw new Error(`Invalid NEXT_PUBLIC_NETWORK_CHAIN_ID: ${rawChainId}`);
}

const explicitRpcUrl =
  process.env.NEXT_PUBLIC_NETWORK_RPC_URL ??
  process.env.NEXT_PUBLIC_RPC_URL;

type ChainWithRpcUrls = {
  rpcUrls: {
    default: { http: readonly string[] };
    public?: { http: readonly string[] };
  };
};

function withRpcOverride<T extends ChainWithRpcUrls>(chain: T, rpcUrl?: string): T {
  if (!rpcUrl) return chain;

  return {
    ...chain,
    rpcUrls: {
      ...chain.rpcUrls,
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] },
    },
  };
}

export const walletChain =
  networkChainId === hardhat.id
    ? withRpcOverride(hardhat, explicitRpcUrl ?? FALLBACK_LOCAL_RPC_URL)
    : withRpcOverride(baseSepolia, explicitRpcUrl);

export const networkRpcUrl = walletChain.rpcUrls.default.http[0];