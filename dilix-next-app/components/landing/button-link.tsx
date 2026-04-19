import type { ReactNode } from "react";

import { cn } from "@/components/landing/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "darkSecondary";
  className?: string;
};

const variants = {
  primary:
    "border border-[rgba(91,77,247,0.88)] bg-[var(--accent)] text-white shadow-[0_18px_42px_-24px_rgba(91,77,247,0.72)] hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]",
  secondary:
    "border border-[color:var(--border)] bg-white/90 text-[var(--heading)] shadow-[0_14px_36px_-28px_rgba(24,47,89,0.26)] hover:-translate-y-0.5 hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-soft)]",
  darkSecondary:
    "border border-white/12 bg-white/5 text-white hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-xl px-5 py-3.5 text-sm font-medium tracking-[-0.01em] transition-all duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
