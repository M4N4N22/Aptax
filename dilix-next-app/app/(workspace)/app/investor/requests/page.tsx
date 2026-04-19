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
  title: "Investor Requests",
  description: "Request queue for the investor Dilix workspace.",
};

export default async function InvestorRequestsPage() {
  await requireDilixProfile("investor");
  const snapshot = await getWorkspaceSnapshot();

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
        eyebrow="Investor module"
        title="Diligence requests"
        description="A clean investor-first queue for the checks you are creating and monitoring. This removes the old shared queue feeling and keeps requests inside the investor workspace."
      />

      <SectionCard eyebrow="Request queue" title="Recent investor-side activity">
        {snapshot.requests.length === 0 ? (
          <EmptyState message="No investor requests are visible yet. Once bounded checks are created, they will accumulate here in a focused investor queue." />
        ) : (
          <div className="grid gap-3">
            {snapshot.requests.slice(0, 12).map((request) => (
              <div
                key={request.id}
                className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-[510] text-[#f7f8f8]">Request {request.id}</p>
                    <p className="mt-1 text-sm text-[#62666d]">
                      Subject {request.subjectId.slice(0, 10)}...{request.subjectId.slice(-6)}
                    </p>
                  </div>
                  <StatusBadge
                    label={request.status}
                    tone={request.status === "computed" ? "success" : "warning"}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#8a8f98]">
                  Threshold {request.threshold}. Requester {request.requester.slice(0, 6)}...
                  {request.requester.slice(-4)}.
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

