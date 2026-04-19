import type { ReactNode } from "react";

import { ButtonLink } from "@/components/landing/button-link";
import { Section } from "@/components/landing/section";

type HeroStageProps = {
  primaryHref: string;
  secondaryHref: string;
  points: string[];
};

function ProofChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[color:var(--border)] bg-white/92 px-4 py-2 text-sm text-[var(--heading)]">
      {children}
    </span>
  );
}

function DataRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-[1rem] border border-[color:var(--border)] bg-white px-4 py-3 text-sm">
      <span className="text-[color:var(--text)]">{label}</span>
      <span
        className={
          accent ? "font-medium text-[var(--accent)]" : "text-[var(--heading)]"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function HeroStage({
  primaryHref,
  secondaryHref,
  points,
}: HeroStageProps) {
  return (
    <Section className="pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-16">
        <div className="max-w-[38rem]">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/90 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.2em] text-[color:var(--text)] uppercase shadow-[0_16px_36px_-28px_rgba(19,40,78,0.22)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Verify the claim. Reveal nothing else.
          </div>

          <p className="fade-up fade-up-delay-1 mt-8 max-w-sm text-sm leading-7 text-[color:var(--text-soft)]">
            Confidential verification infrastructure for AI-native and
            Web3-native workflows.
          </p>

          <h1 className="fade-up fade-up-delay-1 mt-4 max-w-[11ch] text-[3.5rem] font-light leading-[0.92] tracking-[-0.075em] text-[var(--heading)] sm:text-[4.8rem] lg:text-[5.7rem]">
            Give apps and agents the answer, not the data.
          </h1>

          <p className="fade-up fade-up-delay-2 mt-6 max-w-[35rem] text-[1.05rem] leading-8 text-[color:var(--text)] sm:text-[1.14rem]">
            Aptax lets apps, agents, and workflows verify sensitive claims
            without ever accessing the raw underlying data. Encrypt the source
            once, request a bounded check, and return only the result.
          </p>

          <div className="fade-up fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryHref} className="sm:min-w-[148px]">
              View demo
            </ButtonLink>
            <ButtonLink
              href={secondaryHref}
              variant="secondary"
              className="sm:min-w-[184px]"
            >
              Read the architecture
            </ButtonLink>
          </div>

          <div className="fade-up fade-up-delay-3 mt-10 grid gap-3 sm:max-w-[34rem]">
            {points.map((point) => (
              <div
                key={point}
                className="rounded-[1.25rem] border border-[color:var(--border)] bg-white/82 px-4 py-4 shadow-[var(--shadow-card)]"
              >
                <p className="text-sm leading-7 text-[var(--heading)]">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative fade-up fade-up-delay-2">
          <div className="pointer-events-none absolute -inset-8 rounded-[2.8rem] bg-[radial-gradient(circle_at_top,rgba(91,77,247,0.16),transparent_55%)] blur-3xl" />
          <div className="fine-grid relative overflow-hidden rounded-[2.25rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,245,251,0.95))] p-6 shadow-[var(--shadow-panel)] sm:p-8">
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-[color:var(--text)] uppercase">
                  Verification flow
                </p>
                <h2 className="mt-2 text-[1.7rem] font-medium tracking-[-0.04em] text-[var(--heading)] sm:text-[1.95rem]">
                  Result-only by design
                </h2>
              </div>
              <ProofChip>Data never revealed</ProofChip>
            </div>

            <div className="relative mt-8 grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
              <div className="rounded-[1.6rem] border border-[color:var(--border)] bg-white/96 p-5">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                  Request
                </p>
                <div className="mt-4 rounded-[1.3rem] border border-[color:var(--border)] bg-[var(--surface-alt)] p-4">
                  <p className="text-sm font-medium tracking-[-0.02em] text-[var(--heading)]">
                    Agent screening assistant
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                    Is MRR above $50k for this diligence request?
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  <DataRow label="Metric" value="company:mrr" />
                  <DataRow label="Threshold" value="gte 50000" />
                  <DataRow label="Scope" value="investor:diligence" />
                  <DataRow label="Delivery" value="result_only" accent />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.6rem] border border-[rgba(132,146,255,0.22)] bg-[var(--heading)] p-5 text-white shadow-[0_24px_56px_-34px_rgba(9,20,40,0.68)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
                        Aptax
                      </p>
                      <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-white">
                        Verification engine
                      </h3>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                      encrypted computation
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-[1.1rem] border border-white/10 bg-white/5 px-4 py-3.5">
                      <p className="text-[0.68rem] tracking-[0.18em] text-white/38 uppercase">
                        Policy gate
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        Scope, requester, and expiry are checked before
                        evaluation.
                      </p>
                    </div>
                    <div className="rounded-[1.1rem] border border-white/10 bg-white/5 px-4 py-3.5">
                      <p className="text-[0.68rem] tracking-[0.18em] text-white/38 uppercase">
                        Source boundary
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        Encrypted source data stays protected while the claim is
                        evaluated.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[color:var(--border)] bg-white/96 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                      Returned answer
                    </p>
                    <span className="rounded-full bg-[rgba(91,77,247,0.08)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      verified
                    </span>
                  </div>
                  <div className="mt-4 rounded-[1.25rem] border border-[color:var(--border)] bg-[var(--surface-alt)] px-4 py-4">
                    <p className="text-sm font-medium tracking-[-0.02em] text-[var(--heading)]">
                      Threshold satisfied
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                      The workflow receives the answer it needs without access
                      to the underlying number.
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <DataRow label="Result" value="Verified" accent />
                    <DataRow label="Raw value" value="Never exposed" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <ProofChip>API + SDK + MCP</ProofChip>
              <ProofChip>Private due diligence</ProofChip>
              <ProofChip>Agent-ready workflows</ProofChip>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
