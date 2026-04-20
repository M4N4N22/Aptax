import type { Metadata } from "next";

import { FounderDataUpload } from "@/components/aptax/founder-data-upload";
import { requireDilixProfile } from "@/server/aptax/onboarding";

export const metadata: Metadata = {
  title: "Upload Data",
  description: "Upload company data that supports diligence and verification requests.",
};

export default async function FounderUploadPage() {
  const profile = await requireDilixProfile("founder");

  return <FounderDataUpload profile={profile} />;
}
