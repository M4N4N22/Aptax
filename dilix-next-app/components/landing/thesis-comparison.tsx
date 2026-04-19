import { Section, SectionHeading } from "@/components/landing/section";

type ComparisonRow = {
  label: string;
  before: string;
  after: string;
};

type ThesisComparisonProps = {
  rows: ComparisonRow[];
};

export function ThesisComparison({ rows }: ThesisComparisonProps) {
  return (
    <Section id="why-now" className="section-rule">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Why current workflows break"
            title="Today, verification requires overexposure."
            description="Most systems can only verify sensitive information by revealing it to someone else first. That creates privacy risk, friction, and unnecessary trust assumptions."
          />

          <div className="mt-8 rounded-[1.8rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,245,251,0.88))] px-6 py-6 shadow-[var(--shadow-card)]">
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-[color:var(--text)] uppercase">
              New interface model
            </p>
            <p className="mt-4 text-[1.55rem] font-light leading-[1.15] tracking-[-0.05em] text-[var(--heading)]">
              Aptax turns verification into a product surface instead of a data
              handoff.
            </p>
            <p className="mt-4 text-sm leading-7 text-[color:var(--text-soft)]">
              This is not a generic privacy feature. It is a better operating
              model for apps, agents, and workflows that need answers without
              broad access to the source.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {rows.map((row, index) => (
            <article
              key={row.label}
              className="overflow-hidden rounded-[1.8rem] border border-[color:var(--border)] bg-white shadow-[var(--shadow-card)]"
            >
              <div className="border-b border-[color:var(--border)] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--surface-alt)] text-xs font-semibold text-[var(--heading)]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium tracking-[-0.02em] text-[var(--heading)]">
                    {row.label}
                  </p>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                <div className="border-b border-[color:var(--border)] bg-[var(--surface-alt)] px-5 py-5 md:border-b-0 md:border-r">
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[color:var(--text)] uppercase">
                    Old model
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--heading)]">
                    {row.before}
                  </p>
                </div>
                <div className="bg-[rgba(91,77,247,0.04)] px-5 py-5">
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
                    With Aptax
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--heading)]">
                    {row.after}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
