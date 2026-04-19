function DetailRow({
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

function SignalCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.1rem] border border-[color:var(--border)] bg-white/92 px-4 py-3 shadow-[0_18px_38px_-30px_rgba(24,47,89,0.24)]">
      <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium tracking-[-0.02em] text-[var(--heading)]">
        {value}
      </p>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative fade-up fade-up-delay-2">
      <div className="pointer-events-none absolute -inset-8 rounded-[2.8rem] bg-[radial-gradient(circle_at_top,rgba(91,77,247,0.16),transparent_54%)] blur-3xl" />
      <div className="subtle-grid relative overflow-hidden rounded-[2.25rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,245,251,0.94))] p-6 shadow-[var(--shadow-panel)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0))]" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-[color:var(--text)] uppercase">
              Verification request
            </p>
            <h2 className="mt-2 text-[1.7rem] font-medium tracking-[-0.04em] text-[var(--heading)] sm:text-[1.95rem]">
              Product-grade result-only verification
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/84 px-4 py-2 text-sm text-[var(--heading)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Data never revealed
          </span>
        </div>

        <div className="relative mt-8 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[1.7rem] border border-[color:var(--border)] bg-white/96 p-5">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
              Request payload
            </p>
            <div className="mt-4 rounded-[1.3rem] border border-[color:var(--border)] bg-[var(--surface-alt)] p-4">
              <p className="text-sm font-medium tracking-[-0.02em] text-[var(--heading)]">
                Agent screening assistant
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                Verify whether startup MRR is above the diligence threshold for
                this workflow.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              <DetailRow label="Metric" value="company:mrr" />
              <DetailRow label="Condition" value="gte 50000" />
              <DetailRow label="Scope" value="investor:diligence" />
              <DetailRow label="Delivery" value="result_only" accent />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.7rem] border border-[rgba(132,146,255,0.22)] bg-[var(--heading)] p-5 text-white shadow-[0_26px_58px_-36px_rgba(9,20,40,0.68)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
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
                <div className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3.5">
                  <p className="text-[0.68rem] tracking-[0.18em] text-white/38 uppercase">
                    Policy gate
                  </p>
                  <p className="mt-2 text-sm text-white/82">
                    Scope, requester, and expiry are checked before evaluation.
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3.5">
                  <p className="text-[0.68rem] tracking-[0.18em] text-white/38 uppercase">
                    Source data
                  </p>
                  <p className="mt-2 text-sm text-white/82">
                    Encrypted business metrics stay protected at the source.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[color:var(--border)] bg-white/96 p-5">
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
                  The workflow receives a decision it can act on without access
                  to the underlying metric.
                </p>
              </div>
              <div className="mt-4 space-y-3">
                <DetailRow label="Result" value="Verified" accent />
                <DetailRow label="Raw metric" value="Never exposed" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
          <SignalCard label="Input" value="Apps, agents, workflows" />
          <SignalCard label="Surface" value="API, SDK, MCP ready" />
          <SignalCard label="First wedge" value="Private due diligence" />
        </div>
      </div>
    </div>
  );
}
