import type { Metadata } from "next";
import Link from "next/link";

import {
  SectionCard,
  StatusBadge,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import { Button } from "@/components/ui/button";
import { requireDilixProfile } from "@/server/aptax/onboarding";
import { getWorkspaceSnapshot } from "@/server/aptax/workspace";

export const metadata: Metadata = {
  title: "Data Room",
  description: "Manage the company data that supports diligence and verification requests.",
};

type DataItem = {
  label: string;
  description: string;
  status: "ready" | "missing" | "needs_update";
  detail: string;
};

function getStatusTone(status: DataItem["status"]) {
  if (status === "ready") {
    return "success" as const;
  }

  if (status === "needs_update") {
    return "warning" as const;
  }

  return "neutral" as const;
}

function getStatusLabel(status: DataItem["status"]) {
  if (status === "ready") {
    return "Ready";
  }

  if (status === "needs_update") {
    return "Needs update";
  }

  return "Missing";
}

export default async function FounderMetricsPage() {
  const [profile, snapshot] = await Promise.all([
    requireDilixProfile("founder"),
    getWorkspaceSnapshot(),
  ]);

  const hasCompanyData = snapshot.subjects.length > 0;
  const hasActiveRequests = snapshot.requests.length > 0;

  const coreCompanyData: DataItem[] = [
    {
      label: "MRR",
      description: "Monthly recurring revenue used to support revenue-related diligence requests.",
      status: hasCompanyData ? "ready" : "missing",
      detail: hasCompanyData
        ? "Company revenue data has been added for this workspace."
        : "Add revenue data to support investor checks.",
    },
    {
      label: "Runway",
      description: "Cash runway helps investors understand how long the business can keep operating.",
      status: "missing",
      detail: "Add runway data to round out your core financial profile.",
    },
    {
      label: "Cash balance",
      description: "Cash balance gives a current view of available company cash.",
      status: "missing",
      detail: "Add cash balance to prepare for common diligence questions.",
    },
    {
      label: "Gross margin",
      description: "Gross margin shows how efficiently the company turns revenue into profit after direct costs.",
      status: hasActiveRequests ? "needs_update" : "missing",
      detail: hasActiveRequests
        ? "Investor activity suggests this data should be added next."
        : "Add gross margin when you are ready to deepen the data room.",
    },
    {
      label: "Customer concentration",
      description: "Customer concentration helps show how dependent the company is on a small number of customers.",
      status: "missing",
      detail: "Add this when you want a fuller picture of business risk.",
    },
  ];

  const verificationCoverage = coreCompanyData.map((item) => ({
    label: item.label,
    status: item.status === "ready" ? "Ready for requests" : "Not ready yet",
    tone: item.status === "ready" ? ("success" as const) : ("neutral" as const),
    detail:
      item.status === "ready"
        ? `${item.label} can support investor verification requests.`
        : `Add ${item.label.toLowerCase()} data before it can support verification requests.`,
  }));

  const nextSteps = coreCompanyData
    .filter((item) => item.status !== "ready")
    .slice(0, 3)
    .map((item) => ({
      title:
        item.label === "Runway"
          ? "Add runway data"
          : item.label === "Cash balance"
            ? "Add cash balance"
            : item.label === "Gross margin"
              ? "Review missing company data"
              : `Add ${item.label.toLowerCase()} data`,
      detail: item.detail,
    }));

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
        title="Data room"
        description="Manage the company data that supports diligence and verification requests."
        actions={
          <>
            <Link href="/app/founder/upload">
              <Button variant="default" className="rounded-xl">
                Upload data
              </Button>
            </Link>
            <Link href="/app/founder">
              <Button variant="outline" className="rounded-xl border-[rgba(255,255,255,0.08)]">
                Back to overview
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Core company data">
          <div className="grid gap-3">
            {coreCompanyData.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-[510] text-[#f7f8f8]">{item.label}</p>
                  <StatusBadge
                    label={getStatusLabel(item.status)}
                    tone={getStatusTone(item.status)}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{item.description}</p>
                <p className="mt-2 text-xs leading-6 text-[#62666d]">{item.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Verification coverage" >
            <div className="grid gap-3">
              {verificationCoverage.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-[510] text-[#f7f8f8]">{item.label}</p>
                    <StatusBadge label={item.status} tone={item.tone} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{item.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Next steps" >
            {nextSteps.length === 0 ? (
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm leading-6 text-[#8a8f98]">
                  Your core company data is in good shape for the current diligence flow.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {nextSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                  >
                    <p className="text-sm font-[510] text-[#f7f8f8]">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{step.detail}</p>
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
