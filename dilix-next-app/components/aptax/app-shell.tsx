"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type { DilixOnboardingProfile, DilixRole } from "@/lib/aptax/onboarding";

import { WorkspaceOverview } from "./workspace-overview";
import { WorkspaceSidebar } from "./workspace-sidebar";

export function AptaxWorkspaceShell({
  role,
  profile,
  children,
}: {
  role: DilixRole;
  profile: DilixOnboardingProfile;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#08090a] text-[#f7f8f8]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <WorkspaceSidebar role={role} profile={profile} />

        <section className="min-w-0 flex-1">
          <WorkspaceOverview role={role} />
          <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

export function WorkspacePageHeader({

  title,
  description,
  actions,
}: {

  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-[30px]">
      <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl space-y-1">
        
          <h1 className="text-[2.4rem] font-[510] leading-[0.98] tracking-[-0.05em] text-[#f7f8f8] sm:text-[3.25rem]">
            {title}
          </h1>
          <p className="max-w-3xl text-[15px]  text-[#8a8f98]">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)]  px-5 py-5">
      <p className="text-sm font-[510] text-[#62666d]">{label}</p>
      <p className="mt-4 text-3xl font-[510] tracking-[-0.05em] text-[#f7f8f8]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{detail}</p>
    </div>
  );
}

export function SectionCard({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-[30px]  bg-[rgba(255,255,255,0.02)] px-6 py-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-[24px] font-[510] tracking-[-0.03em] text-[#f7f8f8]">{title}</h2>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "success" | "warning" | "accent";
}) {
  const toneClass =
    tone === "success"
      ? " bg-[rgba(16,185,129,0.1)] text-[#9af5be]"
      : tone === "warning"
        ? "border-[rgba(255,216,112,0.26)] bg-[rgba(255,216,112,0.08)] text-[#ffe39a]"
        : tone === "accent"
          ? "bg-[rgba(113,112,255,0.12)] text-[#cfd2ff]"
          : " bg-[rgba(255,255,255,0.04)] text-[#d0d6e0]";

  return (
    <span
      className={`inline-flex items-center rounded-full  px-3 py-1 text-[11px] font-[510] ${toneClass}`}
    >
      {label}
    </span>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title?: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] px-5 py-6">
      {title ? <p className="text-sm font-[510] text-[#f7f8f8]">{title}</p> : null}
      <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function SurfaceLink({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-5 py-4 transition hover:border-[rgba(130,143,255,0.35)] hover:bg-[rgba(113,112,255,0.08)]"
    >
      <p className="text-sm font-[510] text-[#f7f8f8]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{detail}</p>
    </Link>
  );
}
