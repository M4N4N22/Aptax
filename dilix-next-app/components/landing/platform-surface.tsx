import { Section, SectionHeading } from "@/components/landing/section";

type Pillar = {
  label: string;
  title: string;
  body: string;
};

type PlatformSurfaceProps = {
  pillars: Pillar[];
  trustSignals: string[];
};

const developerSnippet = `import { AptaxClient } from "@aptax/sdk";

const aptax = new AptaxClient({ apiKey: process.env.APTAX_API_KEY });

const result = await aptax.verifyClaim({
  subject: "company:mrr",
  condition: { op: "gte", value: 50000 },
  scope: "investor:diligence",
  requester: "agent:screening-assistant",
  delivery: "result_only",
});

return result.verified ? "verified" : "not_verified";`;

function CodeSurface() {
  const lines = developerSnippet.split("\n");

  return (
    <div className="overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#0d1423] shadow-[0_28px_72px_-42px_rgba(0,0,0,0.88)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] px-5 py-4">
        <div>
          <span className="text-sm font-medium tracking-[-0.02em] text-white/88">
            Verification request
          </span>
          <p className="mt-1 text-xs text-white/42">
            A verification primitive for apps, workflows, and agents
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-[0.14em] text-white/55 uppercase">
          API + SDK
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="overflow-x-auto">
          <pre className="min-w-full px-5 py-5 text-sm leading-7 text-[#d7e2ff]">
            <code>
              {lines.map((line, index) => (
                <span
                  key={`${index + 1}-${line}`}
                  className="grid grid-cols-[2rem_1fr] gap-4"
                >
                  <span className="select-none text-right text-white/24">
                    {index + 1}
                  </span>
                  <span>{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>

        <aside className="border-t border-white/8 bg-[rgba(255,255,255,0.02)] px-5 py-5 lg:border-l lg:border-t-0">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
            Boundaries
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/36 uppercase">
                Scope
              </p>
              <p className="mt-2 text-sm text-white/78">investor:diligence</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/36 uppercase">
                Delivery
              </p>
              <p className="mt-2 text-sm text-white/78">verified or not verified</p>
            </div>
            <div className="rounded-xl border border-[rgba(132,146,255,0.2)] bg-[rgba(91,77,247,0.08)] px-4 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/36 uppercase">
                Result
              </p>
              <p className="mt-2 text-sm text-white/82">raw data never exposed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SystemStrip() {
  const nodes = [
    "App",
    "Agent",
    "Workflow",
    "Aptax",
    "Encrypted verification",
    "Result only",
  ];

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5">
      <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
        System shape
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-6">
        {nodes.map((node, index) => (
          <div
            key={node}
            className={[
              "rounded-[1.1rem] border px-3 py-3 text-center text-sm",
              index === 3
                ? "border-[rgba(132,146,255,0.24)] bg-[rgba(91,77,247,0.12)] text-white"
                : "border-white/10 bg-white/5 text-white/76",
            ].join(" ")}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlatformSurface({
  pillars,
  trustSignals,
}: PlatformSurfaceProps) {
  return (
    <Section
      id="platform"
      tone="dark"
      className="section-rule section-rule-dark"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Built for developers"
            title="Built as a verification primitive, not a point solution."
            description="Aptax is designed to be embedded into products and workflows from day one. Whether you are building a founder platform, a treasury dashboard, or an AI-assisted tool, the interface stays clean: request the claim and receive only the answer."
            tone="dark"
          />

          <div className="mt-8 grid gap-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5"
              >
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/46 uppercase">
                  {pillar.label}
                </p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <CodeSurface />
          <SystemStrip />

          <div className="rounded-[1.5rem] border border-white/10 bg-[#141d31] px-5 py-5">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
              Trust surface
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {trustSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/78"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
