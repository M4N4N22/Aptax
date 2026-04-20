import { ButtonLink } from "@/components/landing/button-link";

type FlagshipStep = {
  label: string;
  title: string;
  body: string;
};

type MonolithFlagshipApplicationProps = {
  steps: FlagshipStep[];
};

export function MonolithFlagshipApplication({
  steps,
}: MonolithFlagshipApplicationProps) {
  return (
    <section id="flagship" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-[var(--heading)]">
            Flagship Application
          </div>
          <h2 className="font-headline text-5xl font-extrabold tracking-[-0.06em] text-[var(--heading)]">
            Private due diligence for founders and investors.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-soft)]">
            Founders can prove metrics like MRR thresholds without disclosing
            the underlying numbers. Investors request verification of a
            specific claim and receive only the bounded result.
          </p>
          <div className="mt-8">
            <ButtonLink href="/app" variant="primary">
              Open Dilix app
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col  divide-y divide-neutral-900">
            {steps.map((step) => (
              <article
                key={step.title}
                className=" p-8"
              >
                <div className="mb-4 font-label text-[10px] uppercase tracking-widest text-[var(--heading)]">
                  {step.label}
                </div>
                <h3 className="font-headline text-xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="bg-[var(--surface)] p-8">
            <div className="mb-4 font-label text-[10px] uppercase tracking-widest text-[var(--text-soft)]">
              Verification Receipt
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between  bg-[var(--bg-soft)] px-4 py-4 text-sm">
                <span className="text-[var(--text-soft)]">Metric</span>
                <span className="text-[var(--heading)]">MRR</span>
              </div>
              <div className="flex items-center justify-between  bg-[var(--bg-soft)] px-4 py-4 text-sm">
                <span className="text-[var(--text-soft)]">Threshold</span>
                <span className="text-[var(--heading)]">&gt;= $50k</span>
              </div>
              <div className="flex items-center justify-betwee bg-[var(--bg-soft)] px-4 py-4 text-sm">
                <span className="text-[var(--text-soft)]">Delivery</span>
                <span className="text-[var(--heading)]">result_only</span>
              </div>
              <div className="flex items-center justify-between  bg-[var(--bg-soft)] px-4 py-4 text-sm">
                <span className="text-[var(--text-soft)]">Returned result</span>
                <span className="font-medium text-[var(--heading)]">Verified</span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-[var(--text-soft)]">
              This is the first wedge, not the limit of the platform. The same
              verification primitive can extend into treasury policies,
              compliance checks, eligibility flows, and AI agent workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
