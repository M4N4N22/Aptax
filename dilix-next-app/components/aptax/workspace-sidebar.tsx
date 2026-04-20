"use client";

import {
  BellDot,
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

import { Button } from "@/components/ui/button";
import {
  getDilixMemberLabel,
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
        label: "Company Profile",
        detail: "Profile",
        icon: <Building2 className="h-4 w-4" />,
        state: "live",
      },
      {
        href: "/app/founder/metrics",
        label: "Company Data",
        detail: "Encrypted data",
        icon: <ChartNoAxesColumn className="h-4 w-4" />,
        state: "live",
      },
      {
        href: "/app/founder/requests",
        label: "Requests",
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

export function WorkspaceSidebar({
  role,
  profile,
}: {
  role: DilixRole;
  profile: DilixOnboardingProfile;
}) {
  const pathname = usePathname();
  const navItems = getRoleNavItems(role);
  const memberLabel = getDilixMemberLabel(profile);

  return (
    <aside className="border-b border-[rgba(255,255,255,0.05)] bg-black/50 lg:sticky lg:top-0 lg:h-screen lg:w-[320px] lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-4 py-4 sm:px-5">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <Link href={role === "founder" ? "/app/founder" : "/app/investor"} className="block">
                <p className="text-lg font-[510] text-[#f7f8f8]">Dilix by Aptax</p>
              </Link>
              <p className="text-xs leading-6 text-[#62666d]">{memberLabel} Workspace</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex-1 space-y-5">
          <div className="p-2">
            <nav className="grid gap-1">
              {navItems.map((item) => {
                const active = isActiveItem(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "group rounded-full p-2 transition",
                      active
                        ? "bg-primary"
                        : "hover:bg-[rgba(255,255,255,0.03)]",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center ">
                        <span
                          className={[
                            "grid h-9 w-9 place-items-center rounded-xl",
                            active
                              ? " text-[#cfd2ff]"
                              : " text-[#8a8f98]",
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

        <div className="rounded-[24px] bg-[rgba(255,255,255,0.02)] p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 place-items-center text-[#d0d6e0]">
              <Layers3 className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-[510] text-[#f7f8f8]">Built on Aptax</p>
              <p className="mt-1 text-xs text-[#8a8f98]">
                Learn more about the platform that powers Dilix.
              </p>
            </div>
          </div>
          <Link href="/platform" className="mt-4 inline-flex">
            <Button variant="default" className="rounded-xl">
              Explore the platform
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
