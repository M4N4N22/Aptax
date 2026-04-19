"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";

import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { createStorage, noopStorage, WagmiProvider } from "wagmi";

import {
  aptaxWalletChain,
  aptaxWalletConnectProjectId,
  aptaxNetworkRpcUrl,
} from "@/lib/aptax/wallet";

const wagmiConfig = getDefaultConfig({
  appName: "Aptax",
  appDescription: "Confidential due diligence and bounded verification flows.",
  appUrl: "https://aptax.local",
  projectId: aptaxWalletConnectProjectId,
  chains: [aptaxWalletChain],
  ssr: false,
  storage: createStorage({
    storage: noopStorage,
  }),
  transports: {
    [aptaxWalletChain.id]: http(aptaxNetworkRpcUrl),
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={aptaxWalletChain}
          theme={darkTheme({
            accentColor: "#0f9d8a",
            accentColorForeground: "#f4f2ea",
            borderRadius: "medium",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
