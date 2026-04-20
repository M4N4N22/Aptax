"use client";

import Link from "next/link";

import { WalletConnectButton } from "@/components/providers/wallet-connect-button";
import { Button } from "@/components/ui/button";
import type { DilixRole } from "@/lib/aptax/onboarding";

export function WorkspaceOverview({ role }: { role: DilixRole }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(8,9,10,0.92)] backdrop-blur w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 ">
        <div className="flex flex-wrap items-center gap-3 ml-auto">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
