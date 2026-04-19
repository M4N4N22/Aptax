import { AptaxWorkspaceShell } from "@/components/aptax/app-shell";
import { requireDilixProfile } from "@/server/aptax/onboarding";

export default async function InvestorWorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await requireDilixProfile("investor");

  return (
    <AptaxWorkspaceShell role="investor" profile={profile}>
      {children}
    </AptaxWorkspaceShell>
  );
}

