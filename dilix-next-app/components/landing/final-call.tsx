import { ButtonLink } from "@/components/landing/button-link";
import { Section } from "@/components/landing/section";

type FinalCallProps = {
  primaryHref: string;
  secondaryHref: string;
};

export function FinalCall({ primaryHref, secondaryHref }: FinalCallProps) {
  return (
    <Section tone="dark" className="section-rule section-rule-dark pt-0">
      <div className="rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-8 py-10 shadow-[0_30px_80px_-44px_rgba(9,20,40,0.78)] sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/50 uppercase">
              Final call
            </p>
            <h2 className="mt-4 max-w-[15ch] text-4xl font-light tracking-[-0.05em] text-white sm:text-5xl">
              Make verification the default interface to sensitive data.
            </h2>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/64">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Built for apps, agents, and modern decision workflows
            </div>
          </div>

          <div>
            <p className="max-w-2xl text-lg leading-8 text-white/72">
              Sensitive workflows should not require broad data exposure. Aptax
              makes confidential verification practical for AI-native and
              Web3-native systems, starting with due diligence and expanding
              into the rest of the stack.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryHref} className="sm:min-w-[174px]">
                Request early access
              </ButtonLink>
              <ButtonLink
                href={secondaryHref}
                variant="darkSecondary"
                className="sm:min-w-[148px]"
              >
                View demo
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-white/52">
              Launching with private due diligence. Expanding to broader
              verification workflows next.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
