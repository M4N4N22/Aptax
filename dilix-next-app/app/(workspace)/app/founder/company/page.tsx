import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Founder Company",
  description: "Company profile details for the founder Dilix workspace.",
};

export default async function FounderCompanyPage() {
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
      title="Company profile and diligence identity"
      description="Your company profile shapes how Dilix frames the founder workspace. The live encrypted metric flow stays on the overview, while this page keeps the operating profile visible and credible."
      primaryHref="/app/founder"
      primaryLabel="Open founder overview"
      summary={[
        {
          label: "Company",
          value: profile.startupName,
          detail: "The flagship company workspace configured during onboarding.",
        },
        {
          label: "Stage",
          value: profile.startupStage,
          detail: "The operating stage investors will understand at a glance.",
        },
        {
          label: "Category",
          value: profile.startupCategory,
          detail: "A clear category anchor for the diligence profile.",
        },
        {
          label: "Profile status",
          value: profile.website ? "Ready" : "In progress",
          detail: "Optional details like website and region can deepen the profile later.",
        },
      ]}
      highlights={[
        {
          label: "Workspace owner",
          body: `${profile.fullName} is setting up Dilix as ${profile.roleAtCompany}.`,
          tone: "accent",
        },
        {
          label: "Website",
          body: profile.website
            ? profile.website
            : "No public site added yet. The core diligence flow still works without it.",
          tone: profile.website ? "success" : "neutral",
        },
        {
          label: "Region",
          body: profile.region
            ? `Operating region: ${profile.region}.`
            : "Region can be added later as the founder workspace matures.",
        },
      ]}
      notes={[
        "Dilix treats the company profile as product context, not a marketing profile.",
        "The real encrypted MRR storage flow remains available from the founder overview today.",
      ]}
    />
  );
}

