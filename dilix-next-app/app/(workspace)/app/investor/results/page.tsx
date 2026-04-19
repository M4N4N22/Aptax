import type { Metadata } from "next";

import {
  EmptyState,
  SectionCard,
  StatusBadge,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Investor Results",
  description: "Bounded diligence outcomes inside the investor workspace.",
};

export default async function InvestorResultsPage() {
  await requireDilixProfile("investor");
  const snapshot = await getWorkspaceSnapshot();

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
        eyebrow="Investor module"
        title="Bounded results"
        description="Resolved investor-visible outcomes stay in a dedicated results surface so the workspace feels more like a product and less like a single mixed dashboard."
      />

      <SectionCard eyebrow="Resolved outcomes" title="Latest computed answers">
        {snapshot.computedRequests.length === 0 ? (
          <EmptyState message="No computed results are available yet. Once requests are resolved, only the bounded answer will appear here." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {snapshot.computedRequests.slice(0, 12).map((request) => (
              <div
                key={request.id}
                className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-[510] text-[#f7f8f8]">Result {request.id}</p>
                  <StatusBadge label="Computed" tone="success" />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#8a8f98]">
                  Subject {request.subjectId.slice(0, 10)}...{request.subjectId.slice(-6)} was
                  evaluated against threshold {request.threshold}. The raw metric stays private.
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

