"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { usePublicClient } from "wagmi";

import {
  EmptyState,
  SectionCard,
  StatusBadge,
  SummaryCard,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import { Button } from "@/components/ui/button";
import { aptaxVerifierViemAbi } from "@/lib/aptax/abis";
import type { DilixFounderProfile } from "@/lib/aptax/onboarding";
import {
  abbreviateAddress,
  diligenceMetricSlugs,
  makeMetricKey,
  makeSubjectId,
} from "@/lib/aptax/browser";
import {
  getAptaxConfig,
  getSubjectRequests,
  getSubjects,
} from "@/lib/aptax/client";
import type {
  AptaxMetricSlug,
  AptaxPublicConfig,
  SubjectSummary,
  VerificationRequestSummary,
} from "@/lib/aptax/types";

type VerificationClaim = {
  slug: AptaxMetricSlug;
  label: string;
  description: string;
  status: "not_uploaded" | "not_verified" | "verified";
  updatedAt?: bigint;
};

function makeStartupSlug(startupName?: string) {
  return (
    startupName
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "aptax-labs"
  );
}

function formatSubjectLabel(subjectId: string) {
  return `${subjectId.slice(0, 10)}...${subjectId.slice(-6)}`;
}

function formatTimestamp(value: number) {
  const timestamp = value > 10_000_000_000 ? value : value * 1000;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function getRequestStatusCopy(status: VerificationRequestSummary["status"]) {
  return status === "computed"
    ? { label: "Ready to share", tone: "success" as const }
    : { label: "Needs review", tone: "warning" as const };
}

function getClaimStatusCopy(status: VerificationClaim["status"]) {
  if (status === "verified") {
    return { label: "Verified", tone: "success" as const };
  }

  if (status === "not_verified") {
    return { label: "Not verified", tone: "warning" as const };
  }

  return { label: "Not yet uploaded", tone: "neutral" as const };
}

const claimDefinitions: Array<Pick<VerificationClaim, "slug" | "label" | "description">> = [
  {
    slug: "mrr",
    label: "MRR",
    description:
      "Monthly recurring revenue shows the predictable revenue your company brings in each month.",
  },
  {
    slug: "runway_months",
    label: "Runway",
    description:
      "Runway estimates how many months the company can keep operating before it needs more capital.",
  },
  {
    slug: "cash_balance",
    label: "Cash balance",
    description: "Cash balance reflects the liquid funds the company currently has available.",
  },
  {
    slug: "gross_margin_bps",
    label: "Gross margin",
    description:
      "Gross margin shows how much revenue remains after direct delivery costs, expressed as a percentage.",
  },
  {
    slug: "customer_concentration_bps",
    label: "Customer concentration",
    description:
      "Customer concentration indicates how dependent the business is on a small number of customers.",
  },
];

export function FounderDashboard({ profile }: { profile?: DilixFounderProfile }) {
  const publicClient = usePublicClient();
  const [config, setConfig] = useState<AptaxPublicConfig | null>(null);
  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);
  const [requests, setRequests] = useState<VerificationRequestSummary[]>([]);
  const startupSlug = makeStartupSlug(profile?.startupName);
  const onboardedSubjectId = makeSubjectId(startupSlug);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [verificationClaims, setVerificationClaims] = useState<VerificationClaim[]>(
    claimDefinitions.map((claim) => ({
      ...claim,
      status: "not_uploaded",
    }))
  );
  const [, startTransition] = useTransition();

  const loadSubjects = useCallback(async () => {
    const nextSubjects = (await getSubjects()).filter(
      (subject) => subject.subjectId === onboardedSubjectId
    );
    setSubjects(nextSubjects);
    setSelectedSubjectId(nextSubjects[0]?.subjectId ?? "");
  }, [onboardedSubjectId]);

  const loadRequests = useCallback(async (subjectId: string) => {
    if (!subjectId) {
      setRequests([]);
      return;
    }

    const nextRequests = await getSubjectRequests(subjectId);
    setRequests(nextRequests.sort((left, right) => right.createdAt - left.createdAt));
  }, []);

  useEffect(() => {
    startTransition(() => {
      void (async () => {
        const nextConfig = await getAptaxConfig();
        setConfig(nextConfig);

        if (!nextConfig.configured) {
          return;
        }

        await loadSubjects();
      })().catch(() => {});
    });
  }, [loadSubjects]);

  useEffect(() => {
    if (!selectedSubjectId) {
      return;
    }

    startTransition(() => {
      void loadRequests(selectedSubjectId).catch(() => {});
    });
  }, [loadRequests, selectedSubjectId]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (!config?.configured || !publicClient || !selectedSubjectId) {
        if (!cancelled) {
          setVerificationClaims(
            claimDefinitions.map((claim) => ({
              ...claim,
              status: "not_uploaded",
            }))
          );
        }
        return;
      }

      const claimRecords = await Promise.all(
        diligenceMetricSlugs.map(async (slug) => {
          const metricKey = makeMetricKey(slug);
          const metricRecord = await publicClient.readContract({
            address: config.verifierAddress as `0x${string}`,
            abi: aptaxVerifierViemAbi,
            functionName: "getMetricRecordForKey",
            args: [selectedSubjectId as `0x${string}`, metricKey as `0x${string}`],
          });

          return {
            slug,
            metricKey,
            metricRecord: metricRecord as {
              handle: `0x${string}`;
              isSet: boolean;
              updatedAt: bigint;
            },
          };
        })
      );

      if (cancelled) {
        return;
      }

      setVerificationClaims(
        claimDefinitions.map((claim) => {
          const record = claimRecords.find((entry) => entry.slug === claim.slug);
          const uploaded = Boolean(record?.metricRecord.isSet);
          const verified =
            uploaded &&
            requests.some(
              (request) => request.metricKey === record?.metricKey && request.status === "computed"
            );

          return {
            ...claim,
            status: !uploaded ? "not_uploaded" : verified ? "verified" : "not_verified",
            updatedAt: record?.metricRecord.updatedAt,
          };
        })
      );
    })().catch(() => {
      if (!cancelled) {
        setVerificationClaims(
          claimDefinitions.map((claim) => ({
            ...claim,
            status: "not_uploaded",
          }))
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, [config, publicClient, requests, selectedSubjectId]);

  const selectedSubject =
    subjects.find((subject) => subject.subjectId === selectedSubjectId) ?? null;
  const openRequests = requests.filter((request) => request.status !== "computed");
  const pendingRequests = openRequests;
  const activeInvestors = Array.from(new Set(requests.map((request) => request.requester)));
  const activeInvestorRooms = activeInvestors
    .map((requester) => {
      const investorRequests = requests
        .filter((request) => request.requester === requester)
        .sort((left, right) => right.createdAt - left.createdAt);
      const completedCount = investorRequests.filter((request) => request.status === "computed").length;
      const openCount = investorRequests.length - completedCount;

      return {
        requester,
        completedCount,
        openCount,
        latestActivity: investorRequests[0]?.createdAt ?? 0,
      };
    })
    .sort((left, right) => right.latestActivity - left.latestActivity);
  const readinessItems = [
    {
      label: "Company profile",
      description: profile?.startupName && profile.startupStage && profile.startupCategory && profile.roleAtCompany
        ? "Your company basics are in place and ready for diligence."
        : "Add your company details so investors have the right context.",
      complete: Boolean(
        profile?.startupName &&
        profile.startupStage &&
        profile.startupCategory &&
        profile.roleAtCompany
      ),
    },
    {
      label: "Company data",
      description: selectedSubject
        ? "Core company data is available for verification."
        : "Add company data to start preparing claims investors can verify.",
      complete: Boolean(selectedSubject),
    },
    {
      label: "Verification readiness",
      description: config?.configured && selectedSubject
        ? "Your workspace is ready to support verification requests."
        : "Finish setting up your workspace before sending verification results.",
      complete: Boolean(config?.configured && selectedSubject),
    },
    {
      label: "Investor activity",
      description: requests.length
        ? "Investor requests are already moving through this workspace."
        : "No investor requests yet. Once requests arrive, they’ll appear here.",
      complete: requests.length > 0,
    },
  ];

  const readyClaims = verificationClaims.filter((claim) => claim.status !== "not_uploaded").length;

  const eventFeed = [
    requests[0]
      ? `New request received from ${abbreviateAddress(requests[0].requester)} for an MRR threshold check.`
      : null,
    selectedSubject
      ? `Company subject ${formatSubjectLabel(selectedSubject.subjectId)} is linked to this workspace.`
      : null,
    activeInvestorRooms[0]
      ? `Access updated for ${abbreviateAddress(activeInvestorRooms[0].requester)}.`
      : null,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
        title={profile?.startupName ?? "Founder workspace"}
        description="Run diligence with more control"
        actions={
          <>
            <Link href="/app/founder/upload">
              <Button variant="default" >
                Upload company data
              </Button>
            </Link>
            <Link href="/app/founder/requests">
              <Button variant="outline"  >
                Review requests
              </Button>
            </Link>
          </>
        }
      />

      <p className="max-w-3xl text-sm leading-7 text-[#8a8f98]">
        Manage investor requests, track what&apos;s ready to verify, and keep sensitive company
        data protected.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Open requests"
          value={openRequests.length.toString()}
          detail="Active diligence checks still moving through this company workspace."
        />
        <SummaryCard
          label="Ready to verify"
          value={`${readyClaims} claim${readyClaims === 1 ? "" : "s"}`}
          detail="Claims with a configured founder-side data path right now."
        />
        <SummaryCard
          label="Pending review"
          value={pendingRequests.length.toString()}
          detail="Requests that still need founder attention before moving forward."
        />
        <SummaryCard
          label="Active investors"
          value={activeInvestors.length.toString()}
          detail="Investor counterparties currently active in this diligence flow."
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-6 flex gap-6">
          <SectionCard title="Investor requests" >
            <div id="investor-requests" className="grid gap-3">
              {!selectedSubjectId ? (
                <EmptyState message="Register your company subject first so investor requests can route into this workspace." />
              ) : requests.length === 0 ? (
                <EmptyState message="No investor requests are active yet. Once investors begin requesting checks, this list becomes your live operating queue." />
              ) : (
                requests.map((request) => {
                  const requestStatus = getRequestStatusCopy(request.status);

                  return (
                    <div
                      key={request.id}
                      className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-sm font-[510] text-[#f7f8f8]">
                            {abbreviateAddress(request.requester)}
                          </p>
                          <p className="text-sm text-[#d0d6e0]">MRR threshold check</p>
                          <p className="text-xs text-[#62666d]">
                            Threshold {request.threshold} • Updated {formatTimestamp(request.createdAt)}
                          </p>
                        </div>
                        <StatusBadge label={requestStatus.label} tone={requestStatus.tone} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </SectionCard>

          <SectionCard title="Recent activity" >
            {eventFeed.length === 0 ? (
              <EmptyState message="Activity will appear here as founder data is uploaded, investor requests arrive, and verification results are prepared." />
            ) : (
              <div className="grid gap-3">
                {eventFeed.map((event, index) => (
                  <div
                    key={`${event}-${index}`}
                    className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                  >
                    <p className="text-sm leading-6 text-[#8a8f98]">{event}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <div className="flex gap-6">
            <SectionCard title="Diligence readiness" >
              <div className="grid gap-3">
                {readinessItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-[510] text-[#f7f8f8]">{item.label}</p>
                      <StatusBadge
                        label={item.complete ? "Complete" : "In progress"}
                        tone={item.complete ? "success" : "warning"}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{item.description}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="What investors can verify">
              <div className="grid gap-3">
                {verificationClaims.map((claim) => (
                  <div
                    key={claim.label}
                    className="rounded-[22px]  bg-[rgba(255,255,255,0.015)] px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-[510] text-[#f7f8f8]">{claim.label}</p>
                      <StatusBadge
                        label={getClaimStatusCopy(claim.status).label}
                        tone={getClaimStatusCopy(claim.status).tone}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{claim.description}</p>
                    {claim.updatedAt && claim.updatedAt > 0n ? (
                      <p className="mt-2 text-xs leading-6 text-[#62666d]">
                        Last uploaded {formatTimestamp(Number(claim.updatedAt))}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      <SectionCard title="Active investors">
        {activeInvestorRooms.length === 0 ? (
          <EmptyState message="No investor rooms are active yet. As requests begin to flow, this section will show your live diligence counterparties." />
        ) : (
          <div className="grid gap-3 lg:grid-cols-3">
            {activeInvestorRooms.map((room) => (
              <div
                key={room.requester}
                className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-[510] text-[#f7f8f8]">
                    {abbreviateAddress(room.requester)}
                  </p>
                  <StatusBadge
                    label={
                      room.openCount > 0
                        ? `${room.openCount} open request${room.openCount === 1 ? "" : "s"}`
                        : `${room.completedCount} completed`
                    }
                    tone={room.openCount > 0 ? "warning" : "success"}
                  />
                </div>
                <p className="mt-3 text-sm text-[#8a8f98]">
                  {room.completedCount > 0
                    ? `${room.completedCount} request${room.completedCount === 1 ? "" : "s"} completed`
                    : "No completed requests yet"}
                </p>
                <p className="mt-1 text-xs leading-6 text-[#62666d]">
                  Last active {formatTimestamp(room.latestActivity)}
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
