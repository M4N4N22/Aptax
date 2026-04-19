import { redirectToDilixModule } from "@/server/aptax/onboarding";

export default async function LegacySettingsPage() {
  await redirectToDilixModule("settings");
}
