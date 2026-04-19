import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Investor Settings",
  description: "Investor workspace settings for Dilix.",
};

export default async function InvestorSettingsPage() {
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
      title="Workspace settings"
      description="Investor settings keep the workspace tightly scoped to daily diligence work while Aptax stays visible as the platform layer underneath."
      primaryHref="/platform"
      primaryLabel="Explore Aptax platform"
      summary={[
        {
          label: "Workspace role",
          value: "Investor",
          detail: "Dilix is tuned for private diligence requests and bounded results.",
        },
        {
          label: "Profile owner",
          value: profile.fullName,
          detail: "The investor identity saved during setup.",
        },
        {
          label: "Firm",
          value: profile.firmName,
          detail: "The current investment organization tied to this workspace.",
        },
        {
          label: "Boundary",
          value: "Focused",
          detail: "User-facing workflow in Dilix, underlying verification in Aptax.",
        },
      ]}
      highlights={[
        {
          label: "Investor-first nav",
          body: "The investor workspace hides founder-specific navigation and keeps attention on opportunities, requests, and results.",
          tone: "success",
        },
        {
          label: "Workspace identity",
          body: "Onboarding data gives the investor shell a strong default identity from the first session onward.",
        },
      ]}
      notes={[
        "Profile editing, team preferences, and notification controls can grow here in later passes.",
      ]}
    />
  );
}
