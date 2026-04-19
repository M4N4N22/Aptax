export const founderStages = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Growth",
] as const;

export const founderCategories = [
  "B2B SaaS",
  "Fintech",
  "Developer tools",
  "AI",
  "Healthtech",
  "Climate",
  "Consumer",
] as const;

export const investorTypes = [
  "Angel",
  "Venture fund",
  "Family office",
  "Syndicate",
  "Corporate venture",
  "PE or growth",
] as const;

export const focusStages = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Multi-stage",
  "Growth",
] as const;

export type DilixRole = "founder" | "investor";

export type DilixFounderProfile = {
  role: "founder";
  fullName: string;
  startupName: string;
  startupStage: string;
  startupCategory: string;
  roleAtCompany: string;
  website?: string;
  region?: string;
  completedAt: string;
};

export type DilixInvestorProfile = {
  role: "investor";
  fullName: string;
  firmName: string;
  investorType: string;
  roleAtFirm: string;
  focusStage?: string;
  website?: string;
  region?: string;
  completedAt: string;
};

export type DilixOnboardingProfile = DilixFounderProfile | DilixInvestorProfile;

export type DilixFounderDraft = Omit<DilixFounderProfile, "completedAt" | "role">;
export type DilixInvestorDraft = Omit<DilixInvestorProfile, "completedAt" | "role">;

export function getDilixWorkspaceRoot(role: DilixRole) {
  return role === "founder" ? "/app/founder" : "/app/investor";
}

export function getDilixWorkspaceLabel(profile: DilixOnboardingProfile) {
  return profile.role === "founder" ? profile.startupName : profile.firmName;
}

export function getDilixMemberLabel(profile: DilixOnboardingProfile) {
  return profile.role === "founder" ? profile.roleAtCompany : profile.roleAtFirm;
}

export function isDilixRole(value: unknown): value is DilixRole {
  return value === "founder" || value === "investor";
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseDilixOnboardingProfile(value: unknown): DilixOnboardingProfile | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const role = record.role;
  const completedAt = cleanString(record.completedAt);

  if (!isDilixRole(role) || !completedAt) {
    return null;
  }

  const fullName = cleanString(record.fullName);
  const website = cleanString(record.website);
  const region = cleanString(record.region);

  if (!fullName) {
    return null;
  }

  if (role === "founder") {
    const startupName = cleanString(record.startupName);
    const startupStage = cleanString(record.startupStage);
    const startupCategory = cleanString(record.startupCategory);
    const roleAtCompany = cleanString(record.roleAtCompany);

    if (!startupName || !startupStage || !startupCategory || !roleAtCompany) {
      return null;
    }

    return {
      role,
      fullName,
      startupName,
      startupStage,
      startupCategory,
      roleAtCompany,
      website: website || undefined,
      region: region || undefined,
      completedAt,
    };
  }

  const firmName = cleanString(record.firmName);
  const investorType = cleanString(record.investorType);
  const roleAtFirm = cleanString(record.roleAtFirm);
  const focusStageValue = cleanString(record.focusStage);

  if (!firmName || !investorType || !roleAtFirm) {
    return null;
  }

  return {
    role,
    fullName,
    firmName,
    investorType,
    roleAtFirm,
    focusStage: focusStageValue || undefined,
    website: website || undefined,
    region: region || undefined,
    completedAt,
  };
}

