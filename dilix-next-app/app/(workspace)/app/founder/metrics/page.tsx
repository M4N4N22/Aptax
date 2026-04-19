import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Founder Metrics",
  description: "Encrypted metrics module inside the founder workspace.",
};

export default async function FounderMetricsPage() {
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
      title="Encrypted metrics and verification readiness"
      description="This page frames the metrics layer as a product module while the current live MRR encryption and storage flow remains on the founder overview."
      primaryHref="/app/founder"
      primaryLabel="Go to live metric flow"
      summary={[
        {
          label: "Tracked company",
          value: profile.startupName,
          detail: "The current company workspace tied to founder onboarding.",
        },
        {
          label: "Visible subjects",
          value: snapshot.subjects.length.toString(),
          detail: "Subjects already available in the shared diligence environment.",
        },
        {
          label: "Pending requests",
          value: snapshot.pendingRequests.length.toString(),
          detail: "Open diligence activity still reacting to stored data.",
        },
        {
          label: "Metric scope",
          value: "MRR",
          detail: "Phase 1 keeps the live metric surface focused and believable.",
        },
      ]}
      highlights={[
        {
          label: "Current live metric",
          body: "Monthly recurring revenue is the active founder-side proof in the current MVP loop.",
          tone: "success",
        },
        {
          label: "Privacy boundary",
          body: "Dilix keeps raw business numbers on the founder side while investors receive only bounded results.",
          tone: "accent",
        },
        {
          label: "Future readiness",
          body: "Additional private metrics can grow from this surface without changing the role-specific workspace model.",
        },
      ]}
      notes={[
        "The founder overview is still the place to register a subject and store encrypted MRR today.",
        "This dedicated module makes the information architecture feel product-grade without faking extra functionality.",
      ]}
    />
  );
}

