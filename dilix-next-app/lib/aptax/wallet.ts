"use client";

import { arbitrumSepolia, baseSepolia, hardhat, sepolia } from "wagmi/chains";
import { defineChain } from "viem";

function readPublicRuntime(key: string, fallback?: string) {
  return process.env[key] ?? fallback;
}

export const aptaxWalletConnectProjectId =
  readPublicRuntime("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID", "00000000000000000000000000000000") ??
  "00000000000000000000000000000000";

export const aptaxNetworkChainId = Number(
  readPublicRuntime("NEXT_PUBLIC_NETWORK_CHAIN_ID", readPublicRuntime("NEXT_PUBLIC_APTAX_CHAIN_ID", "31337"))
);

export const aptaxNetworkRpcUrl =
  readPublicRuntime(
    "NEXT_PUBLIC_NETWORK_RPC_URL",
    readPublicRuntime("NEXT_PUBLIC_APTAX_RPC_URL", "http://127.0.0.1:8545")
  ) ?? "http://127.0.0.1:8545";

export const aptaxWalletChain = (() => {
  switch (aptaxNetworkChainId) {
    case hardhat.id:
      return {
        ...hardhat,
        rpcUrls: {
          default: { http: [aptaxNetworkRpcUrl] },
          public: { http: [aptaxNetworkRpcUrl] },
        },
      };
    case sepolia.id:
      return {
        ...sepolia,
        rpcUrls: {
          default: { http: [aptaxNetworkRpcUrl] },
          public: { http: [aptaxNetworkRpcUrl] },
        },
      };
    case arbitrumSepolia.id:
      return {
        ...arbitrumSepolia,
        rpcUrls: {
          default: { http: [aptaxNetworkRpcUrl] },
          public: { http: [aptaxNetworkRpcUrl] },
        },
      };
    case baseSepolia.id:
      return {
        ...baseSepolia,
        rpcUrls: {
          default: { http: [aptaxNetworkRpcUrl] },
          public: { http: [aptaxNetworkRpcUrl] },
        },
      };
    default:
      return defineChain({
        id: aptaxNetworkChainId,
        name: "Aptax Deployment Network",
        nativeCurrency: {
          decimals: 18,
          name: "Ether",
          symbol: "ETH",
        },
        rpcUrls: {
          default: { http: [aptaxNetworkRpcUrl] },
          public: { http: [aptaxNetworkRpcUrl] },
        },
        blockExplorers: {
          default: {
            name: "Explorer",
            url: aptaxNetworkRpcUrl,
          },
        },
        testnet: true,
      });
  }
})();
