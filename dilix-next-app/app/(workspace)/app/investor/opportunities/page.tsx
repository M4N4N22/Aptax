import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Investor Opportunities",
  description: "Opportunity pipeline inside the investor Dilix workspace.",
};

export default async function InvestorOpportunitiesPage() {
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
      title="Opportunities and startup pipeline"
      description="This module gives the investor workspace a focused place for startup selection and opportunity framing while the live request flow remains on the overview."
      primaryHref="/app/investor"
      primaryLabel="Open investor overview"
      summary={[
        {
          label: "Firm",
          value: profile.firmName,
          detail: "The investor workspace configured during onboarding.",
        },
        {
          label: "Investor type",
          value: profile.investorType,
          detail: "The operating context for how this workspace approaches diligence.",
        },
        {
          label: "Visible startups",
          value: snapshot.subjects.length.toString(),
          detail: "Founder-registered companies available in the current environment.",
        },
        {
          label: "Focus stage",
          value: profile.focusStage ?? "Flexible",
          detail: "The investment stage preference captured during setup.",
        },
      ]}
      highlights={[
        {
          label: "Pipeline ready",
          body: "Opportunities can later become a richer investor pipeline without changing the core role-specific navigation.",
          tone: "accent",
        },
        {
          label: "Current live workflow",
          body: "Startup selection and bounded request creation already work from the investor overview.",
          tone: "success",
        },
        {
          label: "Region",
          body: profile.region
            ? `Current geography focus: ${profile.region}.`
            : "Geography can be refined later as the investor workspace deepens.",
        },
      ]}
      notes={[
        "The investor overview remains the active place to create verification requests today.",
        "This page makes the workspace feel intentional without inventing a fake CRM layer.",
      ]}
    />
  );
}

