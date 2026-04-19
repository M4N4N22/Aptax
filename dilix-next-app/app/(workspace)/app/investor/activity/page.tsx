import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Investor Activity",
  description: "Investor activity timeline inside Dilix.",
};

export default async function InvestorActivityPage() {
  const [profile, snapshot] = await Promise.all([
    requireDilixProfile("investor"),
    getWorkspaceSnapshot(),
  ]);

  return (
    <RoleModulePage
      role="investor"
      profile={profile}
      snapshot={snapshot}
      eyebrow="Investor module"
      title="Investor activity"
      description="A dedicated investor activity surface keeps the workspace premium and role-specific while we preserve the current due diligence loop underneath."
      primaryHref="/app/investor/requests"
      primaryLabel="Open investor requests"
      summary={[
        {
          label: "Requests",
          value: snapshot.requests.length.toString(),
          detail: "Visible diligence checks in the current environment.",
        },
        {
          label: "Computed",
          value: snapshot.computedRequests.length.toString(),
          detail: "Checks already resolved into bounded outcomes.",
        },
        {
          label: "Pending",
          value: snapshot.pendingRequests.length.toString(),
          detail: "Requests still in flight or awaiting resolution.",
        },
        {
          label: "Pipeline",
          value: snapshot.subjects.length.toString(),
          detail: "Potential startups available for review today.",
        },
      ]}
      highlights={[
        {
          label: "Operational clarity",
          body: "Request creation, result review, and opportunity scanning now live inside a cohesive investor shell.",
          tone: "success",
        },
        {
          label: "Future room",
          body: "Team activity and notes can deepen here later without forcing founders into investor-centric navigation.",
          tone: "accent",
        },
      ]}
      notes={[
        "This module intentionally leaves room for future collaboration while keeping the current MVP honest and focused.",
      ]}
    />
  );
}

