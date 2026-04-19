import { cookies } from "next/headers";

import {
  parseDilixOnboardingProfile,
  getDilixWorkspaceRoot,
} from "@/lib/aptax/onboarding";
import {
  DILIX_ONBOARDING_COOKIE,
  dilixOnboardingCookieOptions,
} from "@/server/aptax/onboarding";

export async function POST(request: Request) {
  const payload = (await request.json()) as unknown;
  const profile = parseDilixOnboardingProfile(payload);

  if (!profile) {
    return Response.json(
      { error: "Dilix onboarding details are incomplete." },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    DILIX_ONBOARDING_COOKIE,
    JSON.stringify(profile),
    dilixOnboardingCookieOptions
  );

  return Response.json({
    ok: true,
    destination: getDilixWorkspaceRoot(profile.role),
    profile,
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(DILIX_ONBOARDING_COOKIE);

  return Response.json({ ok: true });
}

