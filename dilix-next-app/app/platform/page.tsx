import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aptax Platform",
  description: "The underlying verification platform that powers the flagship Aptax Due Diligence app.",
};

const platformSurfaces = [
  {
    title: "Verification API",
    body: "The future programmatic request surface for products, backends, and internal systems that need confidential checks without raw data exposure.",
  },
  {
    title: "Developer SDK",
    body: "Typed helpers for encrypting metrics, creating verification requests, and consuming bounded results inside real applications.",
  },
  {
    title: "MCP",
    body: "Agent-callable verification tools that let AI systems invoke Aptax without treating the due diligence app as the integration boundary.",
  },
  {
    title: "Aptax Skill",
    body: "A future acceleration layer for coding assistants that helps teams scaffold safe, correct Aptax integrations faster.",
  },
];

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-[#08090a] px-6 py-10 text-[#f7f8f8] sm:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-6 py-8">
          <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[#4a4ace]">
            Built on Aptax
          </p>
          <h1 className="mt-3 text-5xl font-[510] leading-none tracking-[-0.06em] text-[#f7f8f8]">
            The platform beneath the flagship app
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#8a8f98]">
            Aptax Due Diligence is the first flagship product built on Aptax. The platform itself is
            the underlying confidential verification layer that can later power API, SDK, MCP, and
            Aptax Skill surfaces.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="border border-[rgba(130,143,255,0.35)] bg-[rgba(113,112,255,0.14)] px-4 py-3 text-xs font-[510] uppercase tracking-[0.18em] text-[#f7f8f8] transition hover:bg-[rgba(113,112,255,0.2)]"
            >
              Open due diligence app
            </Link>
            <Link
              href="/"
              className="border border-[rgba(255,255,255,0.08)] px-4 py-3 text-xs font-[510] uppercase tracking-[0.18em] text-[#d0d6e0] transition hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.04)]"
            >
              Back to landing
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {platformSurfaces.map((surface) => (
            <section
              key={surface.title}
              className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-5 py-5"
            >
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-[#62666d]">
                Platform surface
              </p>
              <h2 className="mt-3 text-[24px] font-[510] tracking-[-0.03em] text-[#f7f8f8]">
                {surface.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#8a8f98]">{surface.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
