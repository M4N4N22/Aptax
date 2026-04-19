import type { Metadata } from "next";

import { InvestorDashboard } from "@/components/aptax/investor-dashboard";
import { requireDilixProfile } from "@/server/aptax/onboarding";

export const metadata: Metadata = {
  title: "Dilix Investor Workspace",
  description: "Manage private diligence requests inside Dilix.",
};

export default async function InvestorWorkspacePage() {
  const profile = await requireDilixProfile("investor");

  return <InvestorDashboard profile={profile} />;
}

