import type { Metadata } from "next";

import { RoleModulePage } from "@/components/aptax/role-module-page";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Founder Activity",
  description: "Founder activity and workflow notes in Dilix.",
};

export default async function FounderActivityPage() {
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
      title="Company activity"
      description="A calmer founder-side timeline helps the workspace feel operational without overbuilding collaboration depth in Phase 1."
      primaryHref="/app/founder/requests"
      primaryLabel="Open request queue"
      summary={[
        {
          label: "Subjects",
          value: snapshot.subjects.length.toString(),
          detail: "Potential company records in the live environment.",
        },
        {
          label: "Requests",
          value: snapshot.requests.length.toString(),
          detail: "Visible diligence checks across the current workspace.",
        },
        {
          label: "Resolved",
          value: snapshot.computedRequests.length.toString(),
          detail: "Checks already returned as bounded answers.",
        },
        {
          label: "Pending",
          value: snapshot.pendingRequests.length.toString(),
          detail: "Requests still waiting for review or resolution.",
        },
      ]}
      highlights={[
        {
          label: "Founder-side timeline",
          body: "Registration, metric updates, and inbound request changes will naturally consolidate here over time.",
        },
        {
          label: "Current MVP depth",
          body: "The live operational details still appear most strongly on the overview and request pages today.",
          tone: "accent",
        },
      ]}
      notes={[
        "This module is intentionally calm and scoped so it supports the flagship flow without pretending to be a full collaboration suite.",
      ]}
    />
  );
}

