import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  EmptyState,
  SectionCard,
  StatusBadge,
  SummaryCard,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import {
  getDilixWorkspaceLabel,
  type DilixOnboardingProfile,
  type DilixRole,
} from "@/lib/aptax/onboarding";
import type { WorkspaceSnapshot } from "@/server/aptax/workspace";

type Highlight = {
  label: string;
  body: string;
  tone?: "neutral" | "success" | "warning" | "accent";
};

export function RoleModulePage({
  role,
  profile,
  snapshot,
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  summary,
  highlights,
  notes,
}: {
  role: DilixRole;
  profile: DilixOnboardingProfile;
  snapshot: WorkspaceSnapshot;
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  summary: Array<{ label: string; value: string; detail: string }>;
  highlights: Highlight[];
  notes?: string[];
}) {
  return (
    <div className="space-y-6">
      <WorkspacePageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Link href={primaryHref}>
            <Button variant="outline" className="rounded-xl border-[rgba(255,255,255,0.08)]">
              {primaryLabel}
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <SummaryCard
            key={item.label}
            label={item.label}
            value={item.value}
            detail={item.detail}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard eyebrow="Workspace context" title={getDilixWorkspaceLabel(profile)}>
          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-[510] text-[#f7f8f8]">{item.label}</p>
                  <StatusBadge label={item.label} tone={item.tone ?? "neutral"} />
                </div>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{item.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Implementation state" title="Product-shaped, MVP depth">
          {!notes?.length ? (
            <EmptyState message="This module is structured intentionally now and will deepen as the flagship workflow expands." />
          ) : (
            <div className="grid gap-3">
              {notes.map((note, index) => (
                <div
                  key={`${note}-${index}`}
                  className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                >
                  <p className="text-sm leading-6 text-[#8a8f98]">{note}</p>
                </div>
              ))}
            </div>
          )}
          <p className="mt-4 text-sm leading-6 text-[#62666d]">
            {role === "founder" ? "Founder" : "Investor"} workspace. Visible subjects: {snapshot.subjects.length}. Visible requests: {snapshot.requests.length}.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
