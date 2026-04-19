import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  getDilixWorkspaceRoot,
  parseDilixOnboardingProfile,
  type DilixFounderProfile,
  type DilixInvestorProfile,
  type DilixOnboardingProfile,
  type DilixRole,
} from "@/lib/aptax/onboarding";

export const DILIX_ONBOARDING_COOKIE = "dilix_onboarding";

export const dilixOnboardingCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function getDilixOnboardingProfile(): Promise<DilixOnboardingProfile | null> {
  const raw = (await cookies()).get(DILIX_ONBOARDING_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return parseDilixOnboardingProfile(parsed);
  } catch {
    return null;
  }
}

export async function requireDilixProfile(role: "founder"): Promise<DilixFounderProfile>;
export async function requireDilixProfile(role: "investor"): Promise<DilixInvestorProfile>;
export async function requireDilixProfile(): Promise<DilixOnboardingProfile>;
export async function requireDilixProfile(role?: DilixRole) {
  const profile = await getDilixOnboardingProfile();

  if (!profile) {
    redirect("/app");
  }

  if (role && profile.role !== role) {
    redirect(getDilixWorkspaceRoot(profile.role));
  }

  return profile;
}

export async function redirectToDilixModule(
  moduleName?: "requests" | "results" | "activity" | "settings"
) {
  const profile = await getDilixOnboardingProfile();

  if (!profile) {
    redirect("/app");
  }

  if (!moduleName) {
    redirect(getDilixWorkspaceRoot(profile.role));
  }

  if (profile.role === "founder") {
    const target =
      moduleName === "results"
        ? "/app/founder/requests"
        : `/app/founder/${moduleName}`;
    redirect(target);
  }

  redirect(`/app/investor/${moduleName}`);
}
