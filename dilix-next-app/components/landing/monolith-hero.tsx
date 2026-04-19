import type { ReactNode } from "react";

import { MonolithIcon } from "@/components/landing/monolith-icon";

function HeroAction({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      className={[
        "px-8 py-4 font-headline text-sm font-bold uppercase tracking-[-0.03em] transition-colors duration-150",
        variant === "primary"
          ? "bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent-hover)]"
          : "border border-[rgba(255,255,255,0.2)] text-[var(--heading)] hover:bg-[var(--bg-soft)]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function MonolithHero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2  bg-[var(--bg-soft)] px-3 py-1">
          <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]">
            <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 animate-ping" />
          </span>
          <span className="font-label text-[10px] uppercase tracking-widest text-[var(--text-soft)]">
            Infrastructure Grade Verification
          </span>
        </div>
        <h1 className="text-gradient font-headline text-3xl font-extrabold leading-[0.9] tracking-[-0.06em] md:text-5xl">
          Verify sensitive claims without exposing raw data.
        </h1>
        <p className="max-w-xl leading-relaxed text-[var(--text-soft)] md:text-base">
          Aptax is a confidential verification infrastructure layer powered by
          Fhenix. It gives apps, agents, and workflows a new way to verify
          conditions against private data.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <HeroAction>Explore Aptax</HeroAction>
          <HeroAction variant="secondary">Read Docs</HeroAction>
        </div>
      </div>

      <div className="group relative">
        <div className="absolute -inset-4 rounded-full bg-white/5 blur-3xl opacity-50 transition-opacity group-hover:opacity-100" />
        <div className="surface-glow relative flex h-[500px] flex-col items-center justify-center space-y-12  bg-[var(--bg-soft)] p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="flex items-center justify-between opacity-40">
              <span className="font-label text-[10px] uppercase tracking-widest">
                Input: Encrypted State
              </span>
              <MonolithIcon name="lock" className="h-4 w-4" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="relative overflow-hidden border border-white/10 bg-[var(--surface-raised)] p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="border border-white/20 px-3 py-1 font-label text-[10px] uppercase tracking-widest text-[var(--heading)]">
                  Aptax Compute
                </div>
                <div className="text-center font-headline text-2xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                  CONFIDENTIAL EVALUATION
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
