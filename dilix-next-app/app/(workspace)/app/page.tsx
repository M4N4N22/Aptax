import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DilixOnboarding } from "@/components/aptax/dilix-onboarding";
import { getDilixWorkspaceRoot } from "@/lib/aptax/onboarding";
import { getDilixOnboardingProfile } from "@/server/aptax/onboarding";

export const metadata: Metadata = {
  title: "Dilix Setup",
  description: "Start Dilix with a role-specific due diligence workspace.",
};

export default async function AppEntryPage() {
  const profile = await getDilixOnboardingProfile();

  if (profile) {
    redirect(getDilixWorkspaceRoot(profile.role));
  }

  return <DilixOnboarding />;
}

