import type { Metadata } from "next";

import { FounderDashboard } from "@/components/aptax/founder-dashboard";
import { requireDilixProfile } from "@/server/aptax/onboarding";

export const metadata: Metadata = {
  title: "Dilix Founder Workspace",
  description: "Manage your company diligence workspace inside Dilix.",
};

export default async function FounderWorkspacePage() {
  const profile = await requireDilixProfile("founder");

  return <FounderDashboard profile={profile} />;
}

