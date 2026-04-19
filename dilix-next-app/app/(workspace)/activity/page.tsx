import { redirectToDilixModule } from "@/server/aptax/onboarding";

export default async function LegacyActivityPage() {
  await redirectToDilixModule("activity");
}

