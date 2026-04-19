import { redirectToDilixModule } from "@/server/aptax/onboarding";

export default async function LegacyRequestsPage() {
  await redirectToDilixModule("requests");
}

