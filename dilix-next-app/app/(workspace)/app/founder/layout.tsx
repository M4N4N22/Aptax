import { AptaxWorkspaceShell } from "@/components/aptax/app-shell";
import { requireDilixProfile } from "@/server/aptax/onboarding";

export default async function FounderWorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await requireDilixProfile("founder");

  return (
    <AptaxWorkspaceShell role="founder" profile={profile}>
      {children}
    </AptaxWorkspaceShell>
  );
}

