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
import type { DilixInvestorProfile } from "@/lib/aptax/onboarding";
import { abbreviateAddress } from "@/lib/aptax/browser";
import {
  createBrowserSession,
  getAptaxConfig,
  getSubjectRequests,
  getSubjects,
  requestThresholdVerification,
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

function formatSubjectLabel(subjectId: string) {
  return `${subjectId.slice(0, 10)}...${subjectId.slice(-6)}`;
}

export function InvestorDashboard({ profile }: { profile?: DilixInvestorProfile }) {
  const { address, chainId, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [config, setConfig] = useState<AptaxPublicConfig | null>(null);
  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);
  const [subjectId, setSubjectId] = useState("");
  const [threshold, setThreshold] = useState("20000");
  const [requests, setRequests] = useState<VerificationRequestSummary[]>([]);
  const [statusMessage, setStatusMessage] = useState(
    "Connect a wallet, choose a startup, and request a bounded MRR threshold verification."
  );
  const [latestVerdict, setLatestVerdict] = useState("");
  const [latestRequestId, setLatestRequestId] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadRequests = async (nextSubjectId: string) => {
    if (!nextSubjectId) {
      setRequests([]);
      return;
    }

    setRequests(await getSubjectRequests(nextSubjectId));
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

        const nextSubjects = await getSubjects();
        setSubjects(nextSubjects);
        if (nextSubjects[0]) {
          setSubjectId((current) => current || nextSubjects[0].subjectId);
        }
      })().catch((error) => {
        setStatusMessage(error instanceof Error ? error.message : "Failed to load Aptax config.");
      });
    });
  }, []);

  useEffect(() => {
    if (!subjectId) {
      return;
    }

    startTransition(() => {
      void loadRequests(subjectId).catch((error) => {
        setStatusMessage(error instanceof Error ? error.message : "Could not load requests.");
      });
    });
  }, [subjectId]);

  const requestVerification = () => {
    startTransition(() => {
      void (async () => {
        const nextConfig = config ?? (await getAptaxConfig());
        const session = await createBrowserSession(nextConfig, {
          account: address,
          chainId,
          publicClient,
          walletClient,
        });

        if (!subjectId) {
          throw new Error("Pick a startup subject before requesting verification.");
        }

        const { request, verdictLabel } = await requestThresholdVerification(
          session,
          subjectId,
          threshold
        );

        setLatestRequestId(request.id);
        setLatestVerdict(verdictLabel);
        setStatusMessage(
          `Verification request ${request.id} from ${abbreviateAddress(session.account)} resolved with a bounded ${verdictLabel} result.`
        );
        await loadRequests(subjectId);
      })().catch((error) => {
        setStatusMessage(
          error instanceof Error ? error.message : "Could not create the verification request."
        );
      });
    });
  };

  const selectedSubject = subjects.find((subject) => subject.subjectId === subjectId) ?? null;
  const computedRequests = requests.filter((request) => request.status === "computed");
  const pendingRequests = requests.filter((request) => request.status !== "computed");

  const queueItems = [
    latestVerdict
      ? `Latest bounded result for request ${latestRequestId} is ${latestVerdict}.`
      : null,
    selectedSubject
      ? `Watching startup ${formatSubjectLabel(selectedSubject.subjectId)} for threshold checks.`
      : null,
    requests[0]
      ? `Most recent visible request is ${requests[0].status} at threshold ${requests[0].threshold}.`
      : null,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
     
        title={
          profile?.firmName
            ? `${profile.firmName} investor workspace`
            : "Request bounded diligence without seeing the raw metric"
        }
        description={
          profile
            ? `Dilix is set up for ${profile.fullName} as ${profile.roleAtFirm}. Choose a startup, submit a private threshold request, and receive only the bounded answer your workspace is allowed to see.`
            : "This investor module turns the Phase 1 verification loop into a more productized diligence workspace. Choose a startup, submit an `mrr >= threshold` request, and receive only the permitted result."
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
          label="Visible startups"
          value={subjects.length.toString()}
          detail="Founder-registered companies visible to the investor diligence workflow."
        />
        <SummaryCard
          label="Visible requests"
          value={requests.length.toString()}
          detail="Threshold checks tied to the currently selected startup."
        />
        <SummaryCard
          label="Resolved checks"
          value={computedRequests.length.toString()}
          detail="Requests that have already returned a bounded answer."
        />
        <SummaryCard
          label="Latest verdict"
          value={latestVerdict || "Pending"}
          detail="Session-local decrypt result from the most recent investor request."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard  title="Investor session and result spotlight">
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
              label={selectedSubject ? "startup selected" : "no startup selected"}
              tone={selectedSubject ? "accent" : "neutral"}
            />
          </div>

          <p className="mt-4 text-sm leading-7 text-[#8a8f98]">{statusMessage}</p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Latest bounded result</p>
                <StatusBadge
                  label={latestVerdict || "Pending"}
                  tone={latestVerdict ? "success" : "warning"}
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                Aptax returns only the verification outcome allowed to this wallet.
              </p>
            </div>
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Current queue</p>
                <StatusBadge label={pendingRequests.length.toString()} tone="warning" />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                Pending checks stay visible inside the flagship diligence workspace.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard  title="Create a threshold verification request">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm">
              <span className="text-sm font-[510] text-[#62666d]">Startup subject</span>
              <select
                value={subjectId}
                onChange={(event) => setSubjectId(event.target.value)}
                className="border border-[rgba(255,255,255,0.08)] bg-[#191a1b] px-4 py-3 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(130,143,255,0.38)]"
              >
                {subjects.length === 0 ? <option value="">No startup subjects available</option> : null}
                {subjects.map((subject) => (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {formatSubjectLabel(subject.subjectId)}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-sm font-[510] text-[#62666d]">Threshold</span>
              <input
                value={threshold}
                onChange={(event) => setThreshold(event.target.value)}
                inputMode="numeric"
                className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(130,143,255,0.38)]"
                placeholder="20000"
              />
            </label>

            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isPending || !subjectId}
              onClick={requestVerification}
              className="mt-2 rounded-xl border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.14)] px-4 text-[#f7f8f8] hover:bg-[rgba(113,112,255,0.2)] hover:text-[#f7f8f8]"
            >
              {isPending ? "Requesting verification..." : "Create verification request"}
            </Button>
          </div>

          {selectedSubject ? (
            <div className="mt-5 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <p className="text-sm font-[510] text-[#62666d]">Selected company</p>
              <p className="mt-3 text-sm font-[510] text-[#f7f8f8]">
                {abbreviateAddress(selectedSubject.owner)}
              </p>
              <p className="mt-2 break-all text-xs leading-6 text-[#8a8f98]">
                {selectedSubject.metadataUri}
              </p>
            </div>
          ) : null}
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard  title="Recent requests for the selected startup">
          {!subjectId ? (
            <EmptyState message="Choose a startup subject to inspect its verification history." />
          ) : requests.length === 0 ? (
            <EmptyState message="No verification requests have been recorded for this subject yet." />
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
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

        <SectionCard  title="Investor-side queue and boundaries">
          <div className="grid gap-3">
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Resolved on selected startup</p>
                <StatusBadge label={computedRequests.length.toString()} tone="success" />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                Bounded diligence results stay legible, while raw founder metrics remain private.
              </p>
            </div>
            <div className="border border-dashed border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.01)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-[510] text-[#f7f8f8]">Notes and collaboration</p>
                <StatusBadge label="Coming soon" tone="neutral" />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                Shared annotations and team collaboration can grow here later without turning the
                sidebar into a platform catalog.
              </p>
            </div>

            {queueItems.length > 0 ? (
              <div className="grid gap-3">
                {queueItems.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                  >
                    <p className="text-sm font-[510] text-[#62666d]">Queue note {index + 1}</p>
                    <p className="mt-3 text-sm leading-6 text-[#8a8f98]">{item}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
