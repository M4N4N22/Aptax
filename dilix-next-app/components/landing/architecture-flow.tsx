const surfaceNodes = ["Frontend app", "Agent workflow", "Internal tool"];
const coreNodes = [
  "API",
  "SDK",
  "MCP server",
  "Verification engine",
  "Encrypted data layer",
];

function SurfaceNode({
  label,
  muted = false,
}: {
  label: string;
  muted?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-[1.15rem] border px-4 py-4 text-center text-sm tracking-[-0.01em]",
        muted
          ? "border-white/8 bg-[#1a2540] text-white/74"
          : "border-white/10 bg-white/5 text-white/84",
      ].join(" ")}
    >
      {label}
    </div>
  );
}

export function ArchitectureFlow() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] shadow-[0_30px_80px_-46px_rgba(0,0,0,0.82)]">
      <div className="border-b border-white/8 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/45 uppercase">
              Verification graph
            </p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-white/68">
              Product surfaces route a bounded request into Aptax, which
              evaluates the claim against encrypted data and returns only the
              result.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/64">
              for product teams
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/64">
              for developers
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/64">
              for agent workflows
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {surfaceNodes.map((label) => (
            <SurfaceNode key={label} label={label} muted />
          ))}
        </div>

        <div className="mx-auto my-5 h-8 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(91,77,247,0.95),rgba(255,255,255,0.08))]" />

        <div className="grid gap-4 xl:grid-cols-[0.92fr_auto_1.16fr_auto_0.92fr] xl:items-stretch">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#18233b] px-5 py-5">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
              Input contract
            </p>
            <p className="mt-3 text-sm leading-7 text-white/78">
              Requests arrive with explicit scope, requester identity,
              threshold, and delivery rules.
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-white/76">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                scope: investor:diligence
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                requester: agent:screening-assistant
              </div>
            </div>
          </div>

          <div className="hidden w-10 items-center justify-center xl:flex">
            <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(91,77,247,0.95),rgba(255,255,255,0.06))]" />
          </div>

          <div className="rounded-[1.75rem] border border-[rgba(132,146,255,0.22)] bg-[rgba(91,77,247,0.08)] px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
                  Aptax layer
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-white">
                  Permissioned encrypted verification
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/68">
                result only
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {coreNodes.map((label) => (
                <SurfaceNode key={label} label={label} />
              ))}
            </div>
          </div>

          <div className="hidden w-10 items-center justify-center xl:flex">
            <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(91,77,247,0.95),rgba(255,255,255,0.06))]" />
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#18233b] px-5 py-5">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
              Output contract
            </p>
            <p className="mt-3 text-sm leading-7 text-white/78">
              The caller receives verified, not verified, pass, fail, or a
              bounded response instead of raw source data.
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-white/76">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                verified
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                raw metric never exposed
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-[#151f35] px-5 py-5">
          <p className="font-mono text-[12px] leading-7 text-[#d2defe]">
            app / agent / workflow {"->"} Aptax {"->"} encrypted verification
            {"->"} bounded result
          </p>
        </div>
      </div>
    </div>
  );
}
