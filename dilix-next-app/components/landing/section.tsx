import type { ElementType, ReactNode } from "react";

import { cn } from "@/components/landing/utils";

type Tone = "light" | "soft" | "dark";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: Tone;
  as?: ElementType;
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

const sectionToneStyles: Record<Tone, string> = {
  light: "bg-transparent",
  soft: "bg-[var(--bg-soft)]",
  dark: "bg-[var(--dark)]",
};

export function Section({
  id,
  children,
  className,
  innerClassName,
  tone = "light",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-24 sm:py-28 lg:py-32",
        sectionToneStyles[tone],
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-[0.7rem] font-medium tracking-[0.22em] uppercase",
            isDark ? "text-white/55" : "text-[color:var(--text)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-[2.4rem] font-light leading-[1.04] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.35rem]",
          isDark ? "text-white" : "text-[var(--heading)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-[40rem] text-[1.02rem] leading-8 sm:text-lg",
            align === "center" && "mx-auto",
            isDark ? "text-white/68" : "text-[color:var(--text)]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
