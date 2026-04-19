"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import {
  EmptyState,
  SectionCard,
  StatusBadge,
  SummaryCard,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import { Button } from "@/components/ui/button";
import type { DilixFounderProfile } from "@/lib/aptax/onboarding";
import { abbreviateAddress, makeSubjectId } from "@/lib/aptax/browser";
import {
  createBrowserSession,
  ensureSubjectRegistered,
  getAptaxConfig,
  getSubjectRequests,
  getSubjects,
  storeFounderMrr,
} from "@/lib/aptax/client";
import type {
  AptaxPublicConfig,
  SubjectSummary,
  VerificationRequestSummary,
} from "@/lib/aptax/types";

const WalletConnectButton = dynamic(
  () =>
    import("@/components/providers/wallet-connect-button").then(
      (mod) => mod.WalletConnectButton
    ),
  { ssr: false }
);

type FounderFormState = {
  slug: string;
  metadataUri: string;
  mrr: string;
};

function formatSubjectLabel(subjectId: string) {
  return `${subjectId.slice(0, 10)}...${subjectId.slice(-6)}`;
}

export function FounderDashboard({ profile }: { profile?: DilixFounderProfile }) {
  const { address, chainId, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [config, setConfig] = useState<AptaxPublicConfig | null>(null);
  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);
  const [requests, setRequests] = useState<VerificationRequestSummary[]>([]);
  const [form, setForm] = useState<FounderFormState>({
    slug:
      profile?.startupName
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "aptax-labs",
    metadataUri:
      profile?.startupName
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        ? `ipfs://${profile.startupName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")}`
        : "ipfs://aptax-labs",
    mrr: "25000",
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "Connect a wallet to register a startup subject and store encrypted MRR."
  );
  const [lastMetricCheck, setLastMetricCheck] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadSubjects = async () => {
    const nextSubjects = await getSubjects();
    setSubjects(nextSubjects);
    setSelectedSubjectId((current) => current || nextSubjects[0]?.subjectId || "");
  };

  const loadRequests = async (subjectId: string) => {
    if (!subjectId) {
      setRequests([]);
      return;
    }

    setRequests(await getSubjectRequests(subjectId));
  };

  useEffect(() => {
    startTransition(() => {
      void (async () => {
        const nextConfig = await getAptaxConfig();
        setConfig(nextConfig);

        if (!nextConfig.configured) {
          setStatusMessage(nextConfig.error ?? "Aptax contracts are not configured.");
          return;
        }

        await loadSubjects();
      })().catch((error) => {
        setStatusMessage(error instanceof Error ? error.message : "Failed to load Aptax config.");
      });
    });
  }, []);

  useEffect(() => {
    if (!selectedSubjectId) {
      return;
    }

    startTransition(() => {
      void loadRequests(selectedSubjectId).catch((error) => {
        setStatusMessage(
          error instanceof Error ? error.message : "Could not load verification requests."
        );
      });
    });
  }, [selectedSubjectId]);

  const storeEncryptedMetric = () => {
    startTransition(() => {
      void (async () => {
        const nextConfig = config ?? (await getAptaxConfig());
        const session = await createBrowserSession(nextConfig, {
          account: address,
          chainId,
          publicClient,
          walletClient,
        });

        const subjectId = makeSubjectId(form.slug);
        setSelectedSubjectId(subjectId);
        const metadataUri = form.metadataUri.trim() || `ipfs://${form.slug.trim()}`;
        const created = await ensureSubjectRegistered(session, subjectId, metadataUri);
        const { mrr, founderOnlyValue } = await storeFounderMrr(session, subjectId, form.mrr);

        setLastMetricCheck(
          founderOnlyValue === mrr
            ? "Founder-only decrypt check passed for the stored MRR handle."
            : "Stored metric did not round-trip through decryptForView as expected."
        );
        setStatusMessage(
          created
            ? `Subject registered and encrypted MRR stored on-chain for ${abbreviateAddress(session.account)}.`
            : `Encrypted MRR stored on-chain for the existing subject owned by ${abbreviateAddress(session.account)}.`
        );
        await loadSubjects();
        await loadRequests(subjectId);
      })().catch((error) => {
        setStatusMessage(
          error instanceof Error ? error.message : "Could not store the encrypted metric."
        );
      });
    });
  };

  const selectedSubject =
    subjects.find((subject) => subject.subjectId === selectedSubjectId) ?? null;
  const pendingRequests = requests.filter((request) => request.status !== "computed");

  const eventFeed = [
    selectedSubject
      ? `Focused on subject ${formatSubjectLabel(selectedSubject.subjectId)} for diligence review.`
      : null,
    lastMetricCheck || null,
    requests[0]
      ? `Most recent request ${requests[0].id} is ${requests[0].status} at threshold ${requests[0].threshold}.`
      : null,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
        eyebrow="Founder workflow"
        title={
          profile?.startupName
            ? `${profile.startupName} founder workspace`
            : "Store encrypted metrics and manage diligence visibility"
        }
        description={
          profile
            ? `Dilix is set up for ${profile.fullName} as ${profile.roleAtCompany}. Register your company subject, encrypt MRR client-side, and keep investor diligence focused on bounded answers instead of raw data.`
            : "This founder module stays inside the flagship Aptax Due Diligence workspace. Register a subject, encrypt MRR client-side, and monitor investor requests without exposing raw business data."
        }
        actions={
          <>
            <WalletConnectButton />
            <StatusBadge
              label={config?.configured ? `network ${config.networkChainId}` : "config needed"}
              tone={config?.configured ? "accent" : "warning"}
            />
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Registered companies"
          value={subjects.length.toString()}
          detail="Startup profiles available to this founder workspace."
        />
        <SummaryCard
          label="Selected requests"
          value={requests.length.toString()}
          detail="Verification checks targeting the currently selected company."
        />
        <SummaryCard
          label="Awaiting review"
          value={pendingRequests.length.toString()}
          detail="Open diligence requests still visible to the founder."
        />
        <SummaryCard
          label="Metric validation"
          value={lastMetricCheck ? "Passed" : "Pending"}
          detail="A quick founder-only decrypt check after storing encrypted MRR."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard eyebrow="Session" title="Founder session and deployment context">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge
              label={address ? abbreviateAddress(address) : "not connected"}
              tone={address ? "success" : "warning"}
            />
            <StatusBadge
              label={isConnected ? "connected" : "disconnected"}
              tone={isConnected ? "success" : "warning"}
            />
            <StatusBadge
              label={selectedSubject ? "subject selected" : "no subject selected"}
              tone={selectedSubject ? "accent" : "neutral"}
            />
          </div>

          <p className="mt-4 text-sm leading-7 text-[#8a8f98]">{statusMessage}</p>

          {selectedSubject ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#62666d]">Subject owner</p>
                <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">
                  {abbreviateAddress(selectedSubject.owner)}
                </p>
              </div>
              <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#62666d]">Registered metadata</p>
                <p className="mt-3 break-all text-sm text-[#8a8f98]">
                  {selectedSubject.metadataUri}
                </p>
              </div>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard eyebrow="Encrypted metric" title="Register startup and store MRR">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm">
              <span className="text-sm font-[510] text-[#62666d]">Startup slug</span>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(130,143,255,0.38)]"
                placeholder="aptax-labs"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-sm font-[510] text-[#62666d]">Metadata URI</span>
              <input
                value={form.metadataUri}
                onChange={(event) =>
                  setForm((current) => ({ ...current, metadataUri: event.target.value }))
                }
                className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(130,143,255,0.38)]"
                placeholder="ipfs://aptax-labs"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-sm font-[510] text-[#62666d]">Monthly recurring revenue</span>
              <input
                value={form.mrr}
                onChange={(event) => setForm((current) => ({ ...current, mrr: event.target.value }))}
                className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(130,143,255,0.38)]"
                inputMode="numeric"
                placeholder="25000"
              />
            </label>

            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isPending}
              onClick={storeEncryptedMetric}
              className="mt-2 rounded-xl border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.14)] px-4 text-[#f7f8f8] hover:bg-[rgba(113,112,255,0.2)] hover:text-[#f7f8f8]"
            >
              {isPending ? "Encrypting and storing..." : "Register and store encrypted MRR"}
            </Button>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard eyebrow="Company overview" title="Registered startup subjects">
          {subjects.length === 0 ? (
            <EmptyState message="No startup subjects are registered yet. Store a metric to create the first company profile in the due diligence workspace." />
          ) : (
            <div className="grid gap-3">
              {subjects.map((subject) => {
                const active = subject.subjectId === selectedSubjectId;

                return (
                  <button
                    key={subject.subjectId}
                    type="button"
                    onClick={() => setSelectedSubjectId(subject.subjectId)}
                  className={[
                      "rounded-[22px] border px-4 py-4 text-left transition",
                      active
                        ? "border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.08)]"
                        : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.03)]",
                    ].join(" ")}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-lg font-[510] tracking-[-0.03em] text-[#f7f8f8]">
                        {formatSubjectLabel(subject.subjectId)}
                      </p>
                      <StatusBadge
                        label={active ? "Selected" : "Startup"}
                        tone={active ? "accent" : "neutral"}
                      />
                    </div>
                    <p className="mt-3 text-sm text-[#8a8f98]">
                      Owner {abbreviateAddress(subject.owner)}
                    </p>
                    <p className="mt-1 break-all text-xs leading-6 text-[#62666d]">
                      {subject.metadataUri}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </SectionCard>

        <SectionCard eyebrow="Verification requests" title="Diligence checks targeting this company">
          {!selectedSubjectId ? (
            <EmptyState message="Choose a subject to inspect the threshold verification requests targeting it." />
          ) : requests.length === 0 ? (
            <EmptyState message="No investor requests yet for the selected startup subject." />
          ) : (
            <div className="grid gap-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-[510] text-[#f7f8f8]">Request {request.id}</p>
                      <p className="mt-1 text-xs text-[#62666d]">
                        Threshold {request.threshold}
                      </p>
                    </div>
                    <StatusBadge
                      label={request.status}
                      tone={request.status === "computed" ? "success" : "warning"}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#8a8f98]">
                    Requester {abbreviateAddress(request.requester)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Permissions" title="Access policy">
          <div className="grid gap-3">
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Raw business metrics</p>
                <StatusBadge label="Founder-only" tone="success" />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                The flagship app never exposes raw MRR to investors. Verification requests only
                resolve to bounded answers.
              </p>
            </div>
            <div className="border border-dashed border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.01)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Granular sharing controls</p>
                <StatusBadge label="In development" tone="neutral" />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                Future workspace controls can define richer permissioning without moving platform
                surfaces into the primary due diligence sidebar.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Activity" title="Recent founder-side events">
          {eventFeed.length === 0 ? (
            <EmptyState message="Founder activity will appear here after subject registration, encrypted metric storage, or incoming investor requests." />
          ) : (
            <div className="grid gap-3">
              {eventFeed.map((event, index) => (
                <div
                  key={`${event}-${index}`}
                  className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                >
                  <p className="text-sm font-[510] text-[#62666d]">Event {index + 1}</p>
                  <p className="mt-3 text-sm leading-6 text-[#8a8f98]">{event}</p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
