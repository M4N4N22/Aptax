import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Founder Settings",
  description: "Founder workspace settings for Dilix.",
};

export default async function FounderSettingsPage() {
  const [profile, snapshot] = await Promise.all([
    requireDilixProfile("founder"),
    getWorkspaceSnapshot(),
  ]);

  return (
    <RoleModulePage
      role="founder"
      profile={profile}
      snapshot={snapshot}
      eyebrow="Founder module"
      title="Workspace settings"
      description="Founder settings keep the Dilix product boundary clear: role-specific workflow in the workspace, Aptax platform surfaces outside it."
      primaryHref="/platform"
      primaryLabel="View platform layer"
      summary={[
        {
          label: "Workspace role",
          value: "Founder",
          detail: "This Dilix space is configured for preparing company diligence proofs.",
        },
        {
          label: "Profile owner",
          value: profile.fullName,
          detail: "The founder identity saved during onboarding.",
        },
        {
          label: "Company",
          value: profile.startupName,
          detail: "The current company identity associated with this workspace.",
        },
        {
          label: "Boundary",
          value: "Clear",
          detail: "Dilix stays user-facing while Aptax remains the infrastructure layer.",
        },
      ]}
      highlights={[
        {
          label: "Dilix-first navigation",
          body: "The founder sidebar avoids platform modules and stays focused on company diligence operations.",
          tone: "success",
        },
        {
          label: "Onboarding profile",
          body: "Settings can expand later to support editing company identity and workspace preferences.",
        },
      ]}
      notes={[
        "Profile editing and deeper preferences can land here later without disrupting the onboarding or founder overview flow.",
      ]}
    />
  );
}

