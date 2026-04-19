"use client";

import {
  BellDot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesColumn,
  ClipboardList,
  Compass,
  Home,
  Layers3,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { WalletConnectButton } from "@/components/providers/wallet-connect-button";
import { Button } from "@/components/ui/button";
import {
  getDilixMemberLabel,
  getDilixWorkspaceLabel,
  type DilixOnboardingProfile,
  type DilixRole,
} from "@/lib/aptax/onboarding";

type WorkspaceNavItem = {
  href: string;
  label: string;
  detail: string;
  icon: ReactNode;
  state?: "live" | "preview";
};

function getRoleNavItems(role: DilixRole): WorkspaceNavItem[] {
  if (role === "founder") {
    return [
      {
        href: "/app/founder",
        label: "Overview",
        detail: "Workspace",
        icon: <Home className="h-4 w-4" />,
        state: "live",
      },
      {
        href: "/app/founder/company",
        label: "Company",
        detail: "Profile",
        icon: <Building2 className="h-4 w-4" />,
        state: "live",
      },
      {
        href: "/app/founder/metrics",
        label: "Metrics",
        detail: "Encrypted data",
        icon: <ChartNoAxesColumn className="h-4 w-4" />,
        state: "live",
      },
      {
        href: "/app/founder/requests",
        label: "Verification requests",
        detail: "Inbound",
        icon: <ClipboardList className="h-4 w-4" />,
        state: "live",
      },
      {
        href: "/app/founder/activity",
        label: "Activity",
        detail: "Timeline",
        icon: <BellDot className="h-4 w-4" />,
        state: "preview",
      },
      {
        href: "/app/founder/settings",
        label: "Settings",
        detail: "Workspace",
        icon: <Settings className="h-4 w-4" />,
        state: "preview",
      },
    ];
  }

  return [
    {
      href: "/app/investor",
      label: "Overview",
      detail: "Workspace",
      icon: <Home className="h-4 w-4" />,
      state: "live",
    },
    {
      href: "/app/investor/opportunities",
      label: "Opportunities",
      detail: "Pipeline",
      icon: <Compass className="h-4 w-4" />,
      state: "live",
    },
    {
      href: "/app/investor/requests",
      label: "Requests",
      detail: "Diligence",
      icon: <ClipboardList className="h-4 w-4" />,
      state: "live",
    },
    {
      href: "/app/investor/results",
      label: "Results",
      detail: "Resolved",
      icon: <Search className="h-4 w-4" />,
      state: "live",
    },
    {
      href: "/app/investor/activity",
      label: "Activity",
      detail: "Timeline",
      icon: <BellDot className="h-4 w-4" />,
      state: "preview",
    },
    {
      href: "/app/investor/settings",
      label: "Settings",
      detail: "Workspace",
      icon: <Settings className="h-4 w-4" />,
      state: "preview",
    },
  ];
}

function isActiveItem(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AptaxWorkspaceShell({
  role,
  profile,
  children,
}: {
  role: DilixRole;
  profile: DilixOnboardingProfile;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const navItems = getRoleNavItems(role);
  const workspaceLabel = getDilixWorkspaceLabel(profile);
  const memberLabel = getDilixMemberLabel(profile);

  return (
    <main className="min-h-screen bg-[#08090a] text-[#f7f8f8]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-[rgba(255,255,255,0.05)] bg-black/50 lg:sticky lg:top-0 lg:h-screen lg:w-[320px] lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col px-4 py-4 sm:px-5">
            <div className="rounded-[26px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[#f7f8f8]">
                  {role === "founder" ? (
                    <Building2 className="h-5 w-5" />
                  ) : (
                    <BriefcaseBusiness className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0">
                  <Link href={role === "founder" ? "/app/founder" : "/app/investor"} className="block">
                    <p className="text-lg font-[510] text-[#f7f8f8]">Dilix by Aptax</p>
                  </Link>
                  <p className="mt-1 truncate text-sm text-[#d0d6e0]">{workspaceLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-[#62666d]">{memberLabel}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex-1 space-y-5">
              <div className="rounded-[24px] border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] p-2">
                <p className="px-3 pb-2 text-sm font-[510] text-[#62666d]">Workspace</p>
                <nav className="grid gap-1">
                  {navItems.map((item) => {
                    const active = isActiveItem(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "group rounded-2xl border px-3 py-3 transition",
                          active
                            ? "border-[rgba(113,112,255,0.22)] bg-[rgba(113,112,255,0.11)]"
                            : "border-transparent hover:border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.03)]",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={[
                                "grid h-9 w-9 place-items-center rounded-xl border",
                                active
                                  ? "border-[rgba(113,112,255,0.22)] bg-[rgba(113,112,255,0.18)] text-[#cfd2ff]"
                                  : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] text-[#8a8f98]",
                              ].join(" ")}
                            >
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={[
                                  "truncate text-sm font-[510]",
                                  active ? "text-[#f7f8f8]" : "text-[#d0d6e0]",
                                ].join(" ")}
                              >
                                {item.label}
                              </p>
                              <p className="truncate text-xs text-[#62666d]">{item.detail}</p>
                            </div>
                          </div>
                          {item.state === "preview" ? (
                            <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-[11px] text-[#8a8f98]">
                              Soon
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-[#d0d6e0]">
                  <Layers3 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-[510] text-[#f7f8f8]">Built on Aptax</p>
                  <p className="mt-1 text-sm leading-6 text-[#8a8f98]">
                    See the verification platform that powers Dilix without pulling platform navigation into your daily workspace.
                  </p>
                </div>
              </div>
              <Link href="/platform" className="mt-4 inline-flex">
                <Button variant="ghost" size="sm" className="rounded-xl">
                  Explore the platform
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(8,9,10,0.92)] backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-[16px] font-[510] leading-none text-[#f7f8f8]">Dilix by Aptax</p>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                  {role === "founder"
                    ? "A private workspace for preparing and sharing diligence-ready company proofs."
                    : "A focused investor workspace for private diligence requests and bounded results."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/platform">
                  <Button variant="ghost" size="sm" className="rounded-xl">
                    Built on Aptax
                  </Button>
                </Link>
                <WalletConnectButton />
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

export function WorkspacePageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-6 sm:px-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl space-y-3">
          <p className="text-sm font-[510] text-[#62666d]">{eyebrow}</p>
          <h1 className="text-[2.4rem] font-[510] leading-[0.98] tracking-[-0.05em] text-[#f7f8f8] sm:text-[3.25rem]">
            {title}
          </h1>
          <p className="max-w-3xl text-[15px] leading-7 text-[#8a8f98]">{description}</p>
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
    <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-5">
      <p className="text-sm font-[510] text-[#62666d]">{label}</p>
      <p className="mt-4 text-3xl font-[510] tracking-[-0.05em] text-[#f7f8f8]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{detail}</p>
    </div>
  );
}

export function SectionCard({
  title,
  eyebrow,
  children,
  actions,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-[510] text-[#62666d]">{eyebrow}</p>
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
      ? "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-[#9af5be]"
      : tone === "warning"
        ? "border-[rgba(255,216,112,0.26)] bg-[rgba(255,216,112,0.08)] text-[#ffe39a]"
        : tone === "accent"
          ? "border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.12)] text-[#cfd2ff]"
          : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[#d0d6e0]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-[510] ${toneClass}`}
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
