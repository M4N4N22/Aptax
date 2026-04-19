import { redirectToDilixModule } from "@/server/aptax/onboarding";

export default async function LegacyResultsPage() {
  await redirectToDilixModule("results");
}

