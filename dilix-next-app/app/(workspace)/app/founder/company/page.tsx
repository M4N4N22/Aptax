import type { Metadata } from "next";
import Link from "next/link";

import {
  SectionCard,
  StatusBadge,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import { Button } from "@/components/ui/button";
import type { DilixFounderProfile } from "@/lib/aptax/onboarding";
import { requireDilixProfile } from "@/server/aptax/onboarding";

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Company profile details for the founder diligence workspace.",
};

type MissingField = {
  label: string;
  detail: string;
};

function getMissingFields(profile: DilixFounderProfile) {
  const missingFields: MissingField[] = [];

  if (!profile.website) {
    missingFields.push({
      label: "Add website",
      detail: "Share the company website used across the workspace.",
    });
  }

  if (!profile.region) {
    missingFields.push({
      label: "Add company region",
      detail: "Add the region your company primarily operates in.",
    });
  }

  // TODO: Add companyDescription to DilixFounderProfile once profile editing is supported.
  missingFields.push({
    label: "Add company description",
    detail: "Write a short overview to help investors quickly understand the business.",
  });

  return missingFields;
}

export default async function FounderCompanyPage() {
  const profile = await requireDilixProfile("founder");
  const missingFields = getMissingFields(profile);
  const profileComplete = missingFields.length === 0;

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
       
        title="Company profile"
        description="Manage the company details used across your diligence workspace."
        actions={
          <>
            <Button
              variant="outline"
              className="rounded-xl border-[rgba(255,255,255,0.08)] text-[#8a8f98]"
              disabled
            >
              Editing coming soon
            </Button>
            <Link href="/app/founder">
              <Button variant="outline" className="rounded-xl border-[rgba(255,255,255,0.08)]">
                Back to overview
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Business details">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <p className="text-sm font-[510] text-[#62666d]">Company name</p>
              <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">{profile.startupName}</p>
            </div>
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <p className="text-sm font-[510] text-[#62666d]">Website</p>
              <p className="mt-3 text-sm text-[#8a8f98]">
                {profile.website ? profile.website : "Not added yet"}
              </p>
            </div>
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <p className="text-sm font-[510] text-[#62666d]">Stage</p>
              <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">{profile.startupStage}</p>
            </div>
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <p className="text-sm font-[510] text-[#62666d]">Category</p>
              <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">{profile.startupCategory}</p>
            </div>
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4 sm:col-span-2">
              <p className="text-sm font-[510] text-[#62666d]">Region</p>
              <p className="mt-3 text-sm text-[#8a8f98]">
                {profile.region ? profile.region : "Not added yet"}
              </p>
            </div>
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4 sm:col-span-2">
              <p className="text-sm font-[510] text-[#62666d]">Company description</p>
              <p className="mt-3 text-sm leading-6 text-[#8a8f98]">
                Not added yet
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Founder details" >
            <div className="grid gap-3">
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#62666d]">Your role at the company</p>
                <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">{profile.roleAtCompany}</p>
              </div>
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#62666d]">Founder name</p>
                <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">{profile.fullName}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Profile status" >
            <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Profile status</p>
                <StatusBadge
                  label={profileComplete ? "Profile complete" : "Missing fields"}
                  tone={profileComplete ? "success" : "warning"}
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                Keep these details up to date so your company profile stays clear and complete across the workspace.
              </p>
            </div>

            {missingFields.length === 0 ? (
              <div className="mt-4 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm text-[#8a8f98]">
                  All key profile details are in place.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid gap-3">
                {missingFields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                  >
                    <p className="text-sm font-[510] text-[#f7f8f8]">{field.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{field.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
