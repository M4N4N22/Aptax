"use client";

import { ArrowRight, BriefcaseBusiness, Building2, ChevronLeft, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  focusStages,
  founderCategories,
  founderStages,
  investorTypes,
  type DilixFounderDraft,
  type DilixInvestorDraft,
  type DilixOnboardingProfile,
  type DilixRole,
} from "@/lib/aptax/onboarding";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const founderDefaults: DilixFounderDraft = {
  fullName: "",
  startupName: "",
  startupStage: founderStages[1],
  startupCategory: founderCategories[0],
  roleAtCompany: "Founder",
  website: "",
  region: "",
};

const investorDefaults: DilixInvestorDraft = {
  fullName: "",
  firmName: "",
  investorType: investorTypes[1],
  roleAtFirm: "Partner",
  focusStage: focusStages[1],
  website: "",
  region: "",
};

type SubmitState = {
  error: string;
};

function SetupInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "url";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-[510] text-[#d0d6e0]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[#f7f8f8] outline-none transition placeholder:text-[#62666d] focus:border-[rgba(113,112,255,0.4)] focus:bg-[rgba(255,255,255,0.05)]"
      />
    </label>
  );
}

function SetupSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-[510] text-[#d0d6e0]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#141516] px-4 text-sm text-[#f7f8f8] outline-none transition focus:border-[rgba(113,112,255,0.4)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function buildPayload(
  role: DilixRole,
  founder: DilixFounderDraft,
  investor: DilixInvestorDraft
): DilixOnboardingProfile {
  const completedAt = new Date().toISOString();

  if (role === "founder") {
    return {
      role,
      ...founder,
      fullName: founder.fullName.trim(),
      startupName: founder.startupName.trim(),
      startupStage: founder.startupStage.trim(),
      startupCategory: founder.startupCategory.trim(),
      roleAtCompany: founder.roleAtCompany.trim(),
      website: founder.website?.trim() || undefined,
      region: founder.region?.trim() || undefined,
      completedAt,
    };
  }

  return {
    role,
    ...investor,
    fullName: investor.fullName.trim(),
    firmName: investor.firmName.trim(),
    investorType: investor.investorType.trim(),
    roleAtFirm: investor.roleAtFirm.trim(),
    focusStage: investor.focusStage?.trim() || undefined,
    website: investor.website?.trim() || undefined,
    region: investor.region?.trim() || undefined,
    completedAt,
  };
}

function isDraftComplete(role: DilixRole | null, founder: DilixFounderDraft, investor: DilixInvestorDraft) {
  if (role === "founder") {
    return Boolean(
      founder.fullName.trim() &&
        founder.startupName.trim() &&
        founder.startupStage.trim() &&
        founder.startupCategory.trim() &&
        founder.roleAtCompany.trim()
    );
  }

  if (role === "investor") {
    return Boolean(
      investor.fullName.trim() &&
        investor.firmName.trim() &&
        investor.investorType.trim() &&
        investor.roleAtFirm.trim()
    );
  }

  return false;
}

export function DilixOnboarding() {
  const router = useRouter();
  const [role, setRole] = useState<DilixRole | null>(null);
  const [founderDraft, setFounderDraft] = useState(founderDefaults);
  const [investorDraft, setInvestorDraft] = useState(investorDefaults);
  const [submitState, setSubmitState] = useState<SubmitState>({ error: "" });
  const [isPending, startTransition] = useTransition();

  const canContinue = isDraftComplete(role, founderDraft, investorDraft);

  const submitOnboarding = () => {
    if (!role || !canContinue) {
      setSubmitState({ error: "Complete the required setup details before continuing." });
      return;
    }

    setSubmitState({ error: "" });

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/aptax/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildPayload(role, founderDraft, investorDraft)),
        });

        const payload = (await response.json()) as { destination?: string; error?: string };

        if (!response.ok || !payload.destination) {
          throw new Error(payload.error ?? "Dilix setup could not be completed.");
        }

        router.push(payload.destination);
        router.refresh();
      })().catch((error) => {
        setSubmitState({
          error: error instanceof Error ? error.message : "Dilix setup could not be completed.",
        });
      });
    });
  };

  return (
    <main className="min-h-screen bg-[#08090a] px-5 py-8 text-[#f7f8f8] sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3 text-sm text-[#8a8f98]">
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1">
              Dilix by Aptax
            </span>
            <span>Private diligence workspaces</span>
          </div>

          <div className="mt-8 space-y-5">
            <h1 className="max-w-xl text-[2.6rem] font-[510] leading-[0.98] tracking-[-0.05em] text-[#f7f8f8] sm:text-[3.6rem]">
              Start with a workspace that fits how you run diligence.
            </h1>
            <p className="max-w-xl text-[1rem] leading-7 text-[#8a8f98] sm:text-[1.05rem]">
              Dilix sets up a focused workspace for founders and investors from the first visit, so the product feels intentional instead of generic.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Confidential by default",
                body: "Move through diligence with bounded answers instead of oversharing raw metrics.",
              },
              {
                icon: Sparkles,
                title: "Role-specific experience",
                body: "Founders and investors each get a calm, focused workspace with only the navigation they need.",
              },
              {
                icon: Building2,
                title: "Ready for real workflows",
                body: "Set up once, then land inside a workspace that preserves the current due diligence flow.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.025)] p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(113,112,255,0.28)] bg-[rgba(113,112,255,0.12)] text-[#cfd2ff]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-[510] text-[#f7f8f8]">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#8a8f98]">{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[#101112] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-[510] text-[#d0d6e0]">Workspace setup</p>
              <p className="mt-1 text-sm leading-6 text-[#62666d]">
                Step {role ? "2" : "1"} of 2
              </p>
            </div>
            {role ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRole(null)}
                className="rounded-xl text-[#d0d6e0]"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Change role
              </Button>
            ) : null}
          </div>

          {!role ? (
            <div className="mt-8 grid gap-4">
              <button
                type="button"
                onClick={() => setRole("founder")}
                className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] p-5 text-left transition hover:border-[rgba(113,112,255,0.28)] hover:bg-[rgba(113,112,255,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[#f7f8f8]">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-lg font-[510] text-[#f7f8f8]">Founder</p>
                        <p className="text-sm text-[#8a8f98]">Set up a company workspace</p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#8a8f98]">
                      Register your company profile, prepare encrypted metrics, and manage incoming verification requests with a founder-first workflow.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-[#62666d]" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("investor")}
                className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] p-5 text-left transition hover:border-[rgba(113,112,255,0.28)] hover:bg-[rgba(113,112,255,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[#f7f8f8]">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-lg font-[510] text-[#f7f8f8]">Investor</p>
                        <p className="text-sm text-[#8a8f98]">Set up an investment workspace</p>
                      </div>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#8a8f98]">
                      Organize opportunities, request bounded diligence checks, and keep decision-ready results in one investor-focused workspace.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-[#62666d]" />
                </div>
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-[1.8rem] font-[510] tracking-[-0.04em] text-[#f7f8f8]">
                  {role === "founder" ? "Create your founder workspace" : "Create your investor workspace"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#8a8f98]">
                  We’ll use these details to personalize your Dilix workspace and route you into the right flow.
                </p>
              </div>

              {role === "founder" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <SetupInput
                    label="Full name"
                    value={founderDraft.fullName}
                    onChange={(value) => setFounderDraft((current) => ({ ...current, fullName: value }))}
                    placeholder="Avery Singh"
                  />
                  <SetupInput
                    label="Startup name"
                    value={founderDraft.startupName}
                    onChange={(value) => setFounderDraft((current) => ({ ...current, startupName: value }))}
                    placeholder="Northstar Labs"
                  />
                  <SetupSelect
                    label="Startup stage"
                    value={founderDraft.startupStage}
                    onChange={(value) => setFounderDraft((current) => ({ ...current, startupStage: value }))}
                    options={founderStages}
                  />
                  <SetupSelect
                    label="Startup category"
                    value={founderDraft.startupCategory}
                    onChange={(value) =>
                      setFounderDraft((current) => ({ ...current, startupCategory: value }))
                    }
                    options={founderCategories}
                  />
                  <SetupInput
                    label="Role at company"
                    value={founderDraft.roleAtCompany}
                    onChange={(value) =>
                      setFounderDraft((current) => ({ ...current, roleAtCompany: value }))
                    }
                    placeholder="Founder and CEO"
                  />
                  <SetupInput
                    label="Website"
                    type="url"
                    value={founderDraft.website ?? ""}
                    onChange={(value) => setFounderDraft((current) => ({ ...current, website: value }))}
                    placeholder="https://northstarlabs.com"
                  />
                  <div className="md:col-span-2">
                    <SetupInput
                      label="Jurisdiction or region"
                      value={founderDraft.region ?? ""}
                      onChange={(value) => setFounderDraft((current) => ({ ...current, region: value }))}
                      placeholder="Singapore"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <SetupInput
                    label="Full name"
                    value={investorDraft.fullName}
                    onChange={(value) => setInvestorDraft((current) => ({ ...current, fullName: value }))}
                    placeholder="Jordan Lee"
                  />
                  <SetupInput
                    label="Firm name"
                    value={investorDraft.firmName}
                    onChange={(value) => setInvestorDraft((current) => ({ ...current, firmName: value }))}
                    placeholder="North Ridge Ventures"
                  />
                  <SetupSelect
                    label="Investor type"
                    value={investorDraft.investorType}
                    onChange={(value) =>
                      setInvestorDraft((current) => ({ ...current, investorType: value }))
                    }
                    options={investorTypes}
                  />
                  <SetupInput
                    label="Role at firm"
                    value={investorDraft.roleAtFirm}
                    onChange={(value) => setInvestorDraft((current) => ({ ...current, roleAtFirm: value }))}
                    placeholder="Partner"
                  />
                  <SetupSelect
                    label="Focus stage"
                    value={investorDraft.focusStage ?? focusStages[0]}
                    onChange={(value) => setInvestorDraft((current) => ({ ...current, focusStage: value }))}
                    options={focusStages}
                  />
                  <SetupInput
                    label="Website"
                    type="url"
                    value={investorDraft.website ?? ""}
                    onChange={(value) => setInvestorDraft((current) => ({ ...current, website: value }))}
                    placeholder="https://northridge.vc"
                  />
                  <div className="md:col-span-2">
                    <SetupInput
                      label="Geography or region"
                      value={investorDraft.region ?? ""}
                      onChange={(value) => setInvestorDraft((current) => ({ ...current, region: value }))}
                      placeholder="India and Southeast Asia"
                    />
                  </div>
                </div>
              )}

              <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-[510] text-[#f7f8f8]">
                      Your workspace will open as {role === "founder" ? "Founder workspace" : "Investor workspace"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#8a8f98]">
                      You can refine details later from workspace settings without reworking the product flow.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={submitOnboarding}
                    disabled={!canContinue || isPending}
                    className={cn(
                      "rounded-2xl bg-[#8B5CF6] px-5 text-white hover:bg-[#828fff]",
                      "disabled:bg-[rgba(255,255,255,0.08)] disabled:text-[#62666d]"
                    )}
                  >
                    {isPending ? "Creating workspace..." : "Enter Dilix"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {submitState.error ? (
            <p className="mt-4 text-sm text-[#ffb4b4]">{submitState.error}</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
