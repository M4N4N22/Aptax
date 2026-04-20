import { ButtonLink } from "@/components/landing/button-link";
import { MonolithIcon } from "@/components/landing/monolith-icon";

export function MonolithHero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-">
        <h1 className="text-gradient font-headline text-3xl font-extrabold  tracking-[-0.06em] md:text-5xl py-4">
          Verify sensitive claims without exposing raw data.
        </h1>
        <p className="max-w-xl  text-[var(--text-soft)] md:text-base">
          Aptax is a confidential verification infrastructure layer powered by
          Fhenix. It gives apps, agents, and workflows a new way to verify
          conditions against private data.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <ButtonLink href="/app" variant="primary">
            Try Dilix
          </ButtonLink>
          <ButtonLink
            href="https://github.com/M4N4N22/Aptax"
            variant="secondary"
          >
            GitHub
          </ButtonLink>
        </div>
      </div>

      <div className="group relative">
        <div className="absolute -inset-4 rounded-full   opacity-50 transition-opacity group-hover:opacity-100" />
        <div className="surface-glow relative flex h-[500px] flex-col items-center justify-center space-y-12   rounded-4xl p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="flex items-center justify-between opacity-40">
              <span className="font-label text-[10px] uppercase tracking-widest">
                Input: Encrypted State
              </span>
              <MonolithIcon name="lock" className="h-4 w-4" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="relative overflow-hidden rounded-3xl bg-foreground/2 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                
                <div className="text-center font-headline text-2xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                  CONFIDENTIAL EVALUATION
                </div>
                <div className="  font-label text-[10px]">
                  Powered by Fhenix
                </div>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="flex items-center justify-between text-[var(--heading)]">
              <span className="font-label text-[10px] uppercase tracking-widest">
                Output: Bounded Result
              </span>
              <div className="flex items-center gap-2">
                <MonolithIcon name="verified" className="h-4 w-4" />
                <span className="font-label text-xs">TRUE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
