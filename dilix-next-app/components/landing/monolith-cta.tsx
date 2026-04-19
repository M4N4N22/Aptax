import type { ReactNode } from "react";

function CtaButton({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}) {
  if (variant === "tertiary") {
    return (
      <button className="border-b border-[rgba(255,255,255,0.12)] pb-1 font-label text-xs uppercase tracking-widest text-[var(--heading)] transition-colors hover:border-[var(--heading)]">
        {children}
      </button>
    );
  }

  return (
    <button
      className={[
        "px-10 py-5 font-headline text-sm font-extrabold uppercase tracking-[-0.03em] transition-all duration-150",
        variant === "primary"
          ? "bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent-hover)] active:scale-[0.98]"
          : "border border-[rgba(255,255,255,0.18)] text-[var(--heading)] hover:bg-[var(--bg-soft)]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function MonolithCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-40 text-center">
      <div className="surface-glow group relative border border-white/10 bg-[var(--surface-raised)] p-20">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-50" />
        <div className="relative z-10 space-y-10">
          <h2 className="font-headline text-5xl font-black leading-none tracking-[-0.06em] text-[var(--heading)] md:text-7xl">
            Build with confidential verification from day one.
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[var(--text-soft)]">
            Use Aptax through API, SDK, MCP, or Aptax Skill and give your
            systems a safer way to verify what matters.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <CtaButton>Explore Aptax</CtaButton>
            <CtaButton variant="secondary">View Platform</CtaButton>
            <CtaButton variant="tertiary">Read the docs</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
