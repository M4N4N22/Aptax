import type { ReactNode } from "react";

import {
  type CalloutItem,
} from "@/components/landing/monolith-callout-strip";
import { MonolithCta } from "@/components/landing/monolith-cta";
import { MonolithFaq } from "@/components/landing/monolith-faq";
import { MonolithFlagshipApplication } from "@/components/landing/monolith-flagship-application";
import { MonolithFooter } from "@/components/landing/monolith-footer";
import { MonolithHeader } from "@/components/landing/monolith-header";
import { MonolithHero } from "@/components/landing/monolith-hero";
import { MonolithHowItWorks } from "@/components/landing/monolith-how-it-works";
import { MonolithPlatformVision } from "@/components/landing/monolith-platform-vision";
import { MonolithProblem } from "@/components/landing/monolith-problem";
import { MonolithShift } from "@/components/landing/monolith-shift";
import {
  MonolithSurfaces,
  type SurfaceCard,
} from "@/components/landing/monolith-surfaces";

const topNavItems = [
  { label: "Platform", href: "#platform", active: true },
  { label: "Application", href: "#flagship" },
  { label: "Due Diligence App", href: "/app" },
  { label: "Platform Page", href: "/platform" },
  { label: "Vision", href: "#vision" },
  { label: "FAQ", href: "#faq" },
];

const apiSnippet = 'POST /v1/verify { "claim": "credit_score > 700", "id": "user_4921" }';

const callouts: CalloutItem[] = [
  { icon: "api", label: "Verification", title: "API" },
  { icon: "terminal", label: "Developer", title: "SDK" },
  { icon: "hub", label: "Universal", title: "MCP Server" },
  { icon: "bolt", label: "Agentic", title: "Aptax Skill" },
];

const surfaceCards: Array<
  SurfaceCard & { footer: ReactNode; footerClassName?: string }
> = [
  {
    icon: "api",
    title: "Verification API",
    body: "A clean API for requesting confidential checks inside apps, platforms, and internal systems.",
    footer: (
      <>
        <span className="text-[var(--accent)]">POST</span>{" "}
        {apiSnippet.replace("POST ", "")}
      </>
    ),
    className: "md:col-span-7 bg-[var(--surface)]",
    footerClassName:
      "border border-[rgba(255,255,255,0.12)] bg-[var(--bg-soft)] px-4 py-4 text-[11px] text-[var(--text-soft)]",
  },
  {
    icon: "terminal",
    title: "Developer SDK",
    body: "Aptax SDKs make it easy to encrypt metrics, create verification requests, and handle permissions.",
    footer: <>npm install @aptax/sdk-core</>,
    className: "md:col-span-5 bg-[var(--bg-soft)]",
    footerClassName: "text-[11px] text-[var(--text-soft)]",
  },
  {
    icon: "hub",
    title: "MCP Server",
    body: "Expose Aptax as agent-callable tools inside modern AI environments. Let models verify claims without touching data.",
    footer: (
      <div className="flex items-center gap-2">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]">
          <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 animate-ping" />
        </span>
        <span className="font-label text-[10px] uppercase tracking-widest text-[var(--text-soft)]">
          Active Connection
        </span>
      </div>
    ),
    className: "md:col-span-5 bg-[var(--bg-soft)]",
  },
  {
    icon: "bolt",
    title: "Aptax Skill",
    body: "Install Aptax into coding assistants and developer workflows to scaffold integrations and build flows faster.",
    footer: (
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Close-up of a high-resolution laptop screen showing clean organized code with syntax highlighting in a dark studio setting"
          className="h-16 w-16 border border-[rgba(255,255,255,0.12)] object-cover grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSv8NXFK1qP79KguSCMZKuESlPHKblVk9joThAVMo_OD0xEilpK5-uOuG-4Vqt9Q-OPHBuuYGrh3bByYLso1cjjWFFWyWCcUg25Xu_PbM1x8XGxu5n7JQzVN0uAfkV-p3xF8bplOhm2sch8bRKTL0GBY170kZ9fuqYF2NwWEsv-QH-GjgR8TXyH2ltbJqpGzo-bkw1iHfJOSMPFDvkwo2lBoWpg7EaU6_fqzb94fhnmj96W3Tlaa9IZBfX-tgHhvDvz2w0apUWTsh6"
        />
        <span className="font-label text-xs uppercase tracking-widest text-[var(--text-soft)]">
          Integrated Ecosystem
        </span>
      </div>
    ),
    className: "md:col-span-7 bg-[var(--surface)]",
  },
];

const steps = [
  {
    number: "01",
    title: "Encryption",
    body: "Data is masked at the source before any transmission occurs.",
  },
  {
    number: "02",
    title: "Computation",
    body: "Confidential verification runs on the Fhenix layer.",
  },
  {
    number: "03",
    title: "Resolution",
    body: "Only the verified answer is released to the caller.",
  },
];

const whyNowCards = [
  { label: "Context", title: "Privacy First" },
  { label: "Agency", title: "Permissionless" },
  { label: "Security", title: "No Leakage" },
  { label: "Speed", title: "Real-time" },
];

const diligenceSteps = [
  {
    label: "Founder side",
    title: "Encrypt business metrics once",
    body: "Founders store MRR, runway, and growth metrics as encrypted source data instead of sending dashboards around.",
  },
  {
    label: "Investor side",
    title: "Request a threshold-based claim",
    body: "Investors ask a bounded diligence question and receive only the verification result they need.",
  },
  {
    label: "Returned answer",
    title: "Get the decision, not the number",
    body: "Aptax returns verified, not verified, pass, or fail without disclosing the underlying business metric.",
  },
];

const faqItems = [
  {
    question: "What does Aptax actually return?",
    answer:
      "Aptax returns only the bounded result needed for the workflow, such as verified, not verified, pass, fail, or another scoped response. The raw underlying data stays private.",
  },
  {
    question: "Who is Aptax built for?",
    answer:
      "Aptax is built for apps, agents, and workflows that need to verify sensitive conditions without holding the underlying data. That includes founder tools, investor workflows, treasury systems, compliance flows, and agent environments.",
  },
  {
    question: "Why start with private due diligence?",
    answer:
      "Due diligence is a concrete trust-sensitive workflow where the value is immediate. Founders can prove claims like MRR thresholds without exposing the underlying numbers, which makes the product legible from day one.",
  },
  {
    question: "How do developers integrate Aptax?",
    answer:
      "Aptax is designed as infrastructure. Teams can integrate through API, SDK, and MCP support, depending on whether the caller is an app, workflow engine, or agent environment.",
  },
];

const footerLinks = [
  { label: "Due Diligence App", href: "/app" },
  { label: "Founder", href: "/app/founder" },
  { label: "Investor", href: "/app/investor" },
  { label: "Platform", href: "/platform" },
  { label: "API", href: "#platform" },
  { label: "SDK", href: "#platform" },
  { label: "MCP", href: "#platform" },
  { label: "Skills", href: "#platform" },
  { label: "Fhenix Partnership", href: "#vision" },
];

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--dark-text)]">
      <MonolithHeader items={topNavItems} />
      <div className="pt-24">
        <MonolithHero />
        <MonolithProblem />
        <MonolithShift />
        <MonolithHowItWorks steps={steps} />
        <MonolithSurfaces id="platform" cards={surfaceCards} callouts={callouts} />
        <MonolithFlagshipApplication steps={diligenceSteps} />
        <MonolithPlatformVision cards={whyNowCards} />
        <MonolithFaq items={faqItems} />
        <MonolithCta />
      </div>
      <MonolithFooter links={footerLinks} />
    </main>
  );
}
