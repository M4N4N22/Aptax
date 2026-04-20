"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import {
  SectionCard,
  StatusBadge,
  WorkspacePageHeader,
} from "@/components/aptax/app-shell";
import { Button } from "@/components/ui/button";
import { aptaxVerifierViemAbi } from "@/lib/aptax/abis";
import type { DilixFounderProfile } from "@/lib/aptax/onboarding";
import {
  abbreviateAddress,
  makeMetricKey,
  makeSubjectId,
} from "@/lib/aptax/browser";
import {
  createBrowserSession,
  decryptFounderMetricForView,
  ensureSubjectRegistered,
  getAptaxConfig,
  getSubjects,
  storeFounderMetric,
} from "@/lib/aptax/client";
import type { AptaxMetricSlug, AptaxPublicConfig } from "@/lib/aptax/types";

const WalletConnectButton = dynamic(
  () =>
    import("@/components/providers/wallet-connect-button").then(
      (mod) => mod.WalletConnectButton
    ),
  { ssr: false }
);

type UploadMetricDefinition = {
  slug: AptaxMetricSlug;
  label: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  helperText: string;
};

type UploadMetricStatus = UploadMetricDefinition & {
  uploaded: boolean;
  updatedAt?: bigint;
};

type MetricRecord = {
  handle: `0x${string}`;
  isSet: boolean;
  updatedAt: bigint;
};

const metricDefinitions: UploadMetricDefinition[] = [
  {
    slug: "mrr",
    label: "MRR",
    description: "Monthly recurring revenue used to support revenue-related diligence requests.",
    inputLabel: "Monthly recurring revenue",
    placeholder: "25000",
    helperText: "Enter the monthly recurring revenue as a whole number.",
  },
  {
    slug: "runway_months",
    label: "Runway",
    description: "The number of months the company can keep operating before it needs more capital.",
    inputLabel: "Runway in months",
    placeholder: "18",
    helperText: "Enter the runway as a whole number of months.",
  },
  {
    slug: "cash_balance",
    label: "Cash balance",
    description: "Current available company cash used for common diligence questions.",
    inputLabel: "Cash balance",
    placeholder: "500000",
    helperText: "Enter the cash balance as a whole number.",
  },
  {
    slug: "gross_margin_bps",
    label: "Gross margin",
    description: "Revenue remaining after direct costs, stored as basis points.",
    inputLabel: "Gross margin in basis points",
    placeholder: "6500",
    helperText: "Use basis points. Example: 6500 = 65.00%.",
  },
  {
    slug: "customer_concentration_bps",
    label: "Customer concentration",
    description: "How dependent the company is on a small number of customers, stored as basis points.",
    inputLabel: "Customer concentration in basis points",
    placeholder: "2800",
    helperText: "Use basis points. Example: 2800 = 28.00%.",
  },
];

function makeStartupSlug(startupName?: string) {
  return (
    startupName
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "aptax-labs"
  );
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

export function FounderDataUpload({ profile }: { profile: DilixFounderProfile }) {
  const { address, chainId } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const startupSlug = makeStartupSlug(profile.startupName);
  const subjectId = makeSubjectId(startupSlug);
  const [config, setConfig] = useState<AptaxPublicConfig | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<AptaxMetricSlug>("mrr");
  const [metricValue, setMetricValue] = useState("");
  const [subjectRegistered, setSubjectRegistered] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Choose a company metric, enter the value, and upload it from the workspace owner account."
  );
  const [decryptedMetricValue, setDecryptedMetricValue] = useState<string | null>(null);
  const [decryptedMetricLabel, setDecryptedMetricLabel] = useState<string | null>(null);
  const [metricStatuses, setMetricStatuses] = useState<UploadMetricStatus[]>(
    metricDefinitions.map((metric) => ({
      ...metric,
      uploaded: false,
    }))
  );
  const [isPending, startTransition] = useTransition();

  const loadMetricStatuses = useCallback(async () => {
    if (!publicClient) {
      return;
    }

    const nextConfig = config ?? (await getAptaxConfig());
    setConfig(nextConfig);

    if (!nextConfig.configured) {
      setStatusMessage(nextConfig.error ?? "Aptax contracts are not configured.");
      return;
    }

    const subjects = await getSubjects();
    const currentSubject = subjects.find((subject) => subject.subjectId === subjectId);
    setSubjectRegistered(Boolean(currentSubject));

    if (!currentSubject) {
      setMetricStatuses(
        metricDefinitions.map((metric) => ({
          ...metric,
          uploaded: false,
        }))
      );
      return;
    }

    const statuses = await Promise.all(
      metricDefinitions.map(async (metric) => {
        const metricKey = makeMetricKey(metric.slug);
        const metricRecord = await publicClient.readContract({
          address: nextConfig.verifierAddress as `0x${string}`,
          abi: aptaxVerifierViemAbi,
          functionName: "getMetricRecordForKey",
          args: [subjectId as `0x${string}`, metricKey as `0x${string}`],
        }) as MetricRecord;

        return {
          ...metric,
          uploaded: Boolean(metricRecord.isSet),
          updatedAt: metricRecord.updatedAt,
        };
      })
    );

    setMetricStatuses(statuses);
  }, [config, publicClient, subjectId]);

  useEffect(() => {
    startTransition(() => {
      void loadMetricStatuses().catch((error) => {
        setStatusMessage(
          error instanceof Error ? error.message : "Could not load company data coverage."
        );
      });
    });
  }, [loadMetricStatuses]);

  const selectedMetricDefinition =
    metricDefinitions.find((metric) => metric.slug === selectedMetric) ?? metricDefinitions[0];

  const uploadMetric = () => {
    startTransition(() => {
      void (async () => {
        const nextConfig = config ?? (await getAptaxConfig());
        const session = await createBrowserSession(nextConfig, {
          account: address,
          chainId,
          publicClient,
          walletClient,
        });

        const metadataUri = `ipfs://${startupSlug}`;
        await ensureSubjectRegistered(session, subjectId, metadataUri);
        const result = await storeFounderMetric(session, subjectId, selectedMetric, metricValue);

        setMetricValue("");
        setDecryptedMetricLabel(selectedMetricDefinition.label);
        setDecryptedMetricValue(result.founderOnlyValue.toString());
        setStatusMessage(
          `${selectedMetricDefinition.label} was uploaded for ${profile.startupName} and decrypted for founder view.`
        );
        await loadMetricStatuses();
      })().catch((error) => {
        setStatusMessage(
          error instanceof Error ? error.message : "Could not upload company data."
        );
      });
    });
  };

  const decryptSelectedMetric = () => {
    startTransition(() => {
      void (async () => {
        const nextConfig = config ?? (await getAptaxConfig());
        const session = await createBrowserSession(nextConfig, {
          account: address,
          chainId,
          publicClient,
          walletClient,
        });

        const result = await decryptFounderMetricForView(session, subjectId, selectedMetric);
        setDecryptedMetricLabel(selectedMetricDefinition.label);
        setDecryptedMetricValue(result.founderOnlyValue.toString());
        setStatusMessage(
          `${selectedMetricDefinition.label} was decrypted for founder view.`
        );
      })().catch((error) => {
        setStatusMessage(
          error instanceof Error ? error.message : "Could not decrypt this metric for founder view."
        );
      });
    });
  };

  return (
    <div className="space-y-6">
      <WorkspacePageHeader
      
        title="Upload data"
        description="Add company data that supports diligence and verification requests."
        actions={
          <>
            <WalletConnectButton />
            <Link href="/app/founder/metrics">
              <Button variant="outline" className="rounded-xl border-[rgba(255,255,255,0.08)]">
                Back to data room
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Choose data to upload">
          <div className="grid gap-3">
            {metricStatuses.map((metric) => (
              <button
                key={metric.slug}
                type="button"
                onClick={() => setSelectedMetric(metric.slug)}
                className={[
                  "rounded-[22px] border px-4 py-4 text-left transition",
                  selectedMetric === metric.slug
                    ? "border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.08)]"
                    : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] hover:border-[rgba(255,255,255,0.14)]",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-[510] text-[#f7f8f8]">{metric.label}</p>
                  <StatusBadge
                    label={metric.uploaded ? "Uploaded" : "Not yet uploaded"}
                    tone={metric.uploaded ? "success" : "neutral"}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{metric.description}</p>
                {metric.updatedAt && metric.updatedAt > 0n ? (
                  <p className="mt-2 text-xs leading-6 text-[#62666d]">
                    Last uploaded {formatTimestamp(Number(metric.updatedAt))}
                  </p>
                ) : null}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
            <div>
              <p className="text-sm font-[510] text-[#f7f8f8]">{selectedMetricDefinition.label}</p>
              <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                {selectedMetricDefinition.description}
              </p>
            </div>

            <label className="grid gap-2 text-sm">
              <span className="text-sm font-[510] text-[#62666d]">
                {selectedMetricDefinition.inputLabel}
              </span>
              <input
                value={metricValue}
                onChange={(event) => setMetricValue(event.target.value)}
                className="rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(130,143,255,0.38)]"
                inputMode="numeric"
                placeholder={selectedMetricDefinition.placeholder}
              />
              <p className="text-xs leading-6 text-[#62666d]">
                {selectedMetricDefinition.helperText}
              </p>
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge
                label={subjectRegistered ? "Company subject ready" : "Subject will be created on first upload"}
                tone={subjectRegistered ? "success" : "accent"}
              />
              {address ? (
                <StatusBadge label={abbreviateAddress(address)} tone="accent" />
              ) : (
                <StatusBadge label="Wallet not connected" tone="warning" />
              )}
            </div>

            <p className="text-sm leading-7 text-[#8a8f98]">{statusMessage}</p>

            <div className="flex flex-wrap items-center gap-3">
              <ConnectButton.Custom>
                {({ account, chain, mounted, openChainModal, openConnectModal }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <Button
                      type="button"
                      variant="default"
                      className="w-fit rounded-xl"
                      disabled={isPending || !metricValue.trim()}
                      onClick={() => {
                        if (!connected) {
                          setStatusMessage("Connect your wallet to upload company data.");
                          openConnectModal?.();
                          return;
                        }

                        if (chain.unsupported || (config && chain.id !== config.networkChainId)) {
                          setStatusMessage(
                            `Switch your wallet to network ${config?.networkChainId ?? "84532"} to continue.`
                          );
                          openChainModal?.();
                          return;
                        }

                        uploadMetric();
                      }}
                    >
                      {isPending ? "Uploading..." : `Upload ${selectedMetricDefinition.label}`}
                    </Button>
                  );
                }}
              </ConnectButton.Custom>

              <ConnectButton.Custom>
                {({ account, chain, mounted, openChainModal, openConnectModal }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-fit rounded-xl border-[rgba(255,255,255,0.08)]"
                      disabled={isPending}
                      onClick={() => {
                        if (!connected) {
                          setStatusMessage("Connect your wallet to decrypt company data.");
                          openConnectModal?.();
                          return;
                        }

                        if (chain.unsupported || (config && chain.id !== config.networkChainId)) {
                          setStatusMessage(
                            `Switch your wallet to network ${config?.networkChainId ?? "84532"} to continue.`
                          );
                          openChainModal?.();
                          return;
                        }

                        decryptSelectedMetric();
                      }}
                    >
                      {isPending ? "Decrypting..." : `Decrypt ${selectedMetricDefinition.label}`}
                    </Button>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            {decryptedMetricValue ? (
              <div className="rounded-[22px] border border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.08)] px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-[510] text-[#f7f8f8]">
                    Founder-only view
                  </p>
                  <StatusBadge label={decryptedMetricLabel ?? "Metric"} tone="accent" />
                </div>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                  This value is shown only to the workspace owner after decrypting for view.
                </p>
                <p className="mt-3 text-2xl font-[510] text-[#f7f8f8]">{decryptedMetricValue}</p>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="How uploads work">
            <div className="grid gap-3">
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#f7f8f8]">For this demo</p>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                  The workspace owner enters a metric manually and uploads it directly from this page
                  for speed and clarity during the demo.
                </p>
              </div>
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#f7f8f8]">In production</p>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                  Dilix will add an attestation layer that combines third-party sources such as
                  Stripe or QuickBooks with manual review by a diligence expert, auditor, or
                  accountant before a metric is added.
                </p>
              </div>
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4">
                <p className="text-sm font-[510] text-[#f7f8f8]">Why that matters</p>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                  That review helps confirm the authenticity of claimed metrics, limits repeated
                  exposure, and lets one verified result be shared with multiple investors without
                  repeating the same verification again.
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Current coverage">
            <div className="grid gap-3">
              {metricStatuses.map((metric) => (
                <div
                  key={metric.slug}
                  className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-[510] text-[#f7f8f8]">{metric.label}</p>
                    <StatusBadge
                      label={metric.uploaded ? "Uploaded" : "Missing"}
                      tone={metric.uploaded ? "success" : "neutral"}
                    />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{metric.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
