import { Section, SectionHeading } from "@/components/landing/section";

type Moment = {
  title: string;
  body: string;
};

type Card = {
  label: string;
  title: string;
  body: string;
  featured?: boolean;
};

type SpotlightGridProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  moments?: Moment[];
  cards?: Card[];
  variant?: "dark" | "light";
};

export function SpotlightGrid({
  id,
  eyebrow,
  title,
  description,
  moments,
  cards,
  variant = "dark",
}: SpotlightGridProps) {
  if (variant === "light" && cards) {
    const [featured, ...rest] = cards;

    return (
      <Section id={id} tone="soft" className="section-rule">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {featured ? (
            <article className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(235,240,248,0.9))] shadow-[var(--shadow-panel)]">
              <div className="px-6 py-6 sm:px-7 sm:py-7">
                <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-[color:var(--text)] uppercase">
                  {featured.label}
                </p>
                <h3 className="mt-4 max-w-[16ch] text-[2.35rem] font-light leading-[1.02] tracking-[-0.05em] text-[var(--heading)]">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-[1rem] leading-8 text-[color:var(--text)]">
                  {featured.body}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.15rem] border border-[color:var(--border)] bg-white/92 px-4 py-4">
                    <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                      Metric
                    </p>
                    <p className="mt-2 text-sm text-[var(--heading)]">MRR</p>
                  </div>
                  <div className="rounded-[1.15rem] border border-[color:var(--border)] bg-white/92 px-4 py-4">
                    <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                      Threshold
                    </p>
                    <p className="mt-2 text-sm text-[var(--heading)]">&gt;= $50k</p>
                  </div>
                  <div className="rounded-[1.15rem] border border-[color:var(--border)] bg-white/92 px-4 py-4">
                    <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                      Result
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                      Verified
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-5">
            {rest.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.6rem] border border-[color:var(--border)] bg-white px-6 py-6 shadow-[var(--shadow-card)]"
              >
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                  {card.label}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-[var(--heading)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-soft)]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id={id} tone="dark" className="section-rule section-rule-dark">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-center">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone="dark"
        />

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_28px_70px_-44px_rgba(0,0,0,0.7)]">
          <div className="border-b border-white/8 px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/46 uppercase">
                  Proof wedge
                </p>
                <h3 className="mt-2 text-[1.9rem] font-light tracking-[-0.05em] text-white">
                  A workflow people can trust immediately
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                result-only investor checks
              </span>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 lg:grid-cols-3">
            {moments?.map((moment, index) => (
              <article
                key={moment.title}
                className="rounded-[1.45rem] border border-white/10 bg-white/5 px-5 py-5"
              >
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/44 uppercase">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">
                  {moment.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {moment.body}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 border-t border-white/8 px-6 py-6 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="rounded-[1.5rem] border border-[rgba(132,146,255,0.2)] bg-[rgba(91,77,247,0.08)] px-5 py-5">
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/46 uppercase">
                Verification receipt
              </p>
              <div className="mt-4 space-y-3 text-sm text-white/82">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Metric</span>
                  <span>MRR</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Threshold</span>
                  <span>&gt;= $50k</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Scope</span>
                  <span>investor:diligence</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Result</span>
                  <span className="font-medium text-[rgba(173,166,255,0.96)]">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#172238] px-5 py-5">
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/46 uppercase">
                Why it converts
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                Private due diligence is the right first proof because it is
                immediate, legible, and trust-sensitive. If Aptax can make this
                workflow cleaner, it can expand into the rest of the stack.
              </p>
              <div className="mt-5 rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4">
                <p className="font-mono text-[12px] leading-7 text-[#d6defc]">
                  founder data {"->"} Aptax {"->"} investor result only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
