import { ButtonLink } from "@/components/landing/button-link";

type SiteHeaderProps = {
  navItems: Array<{ label: string; href: string }>;
  ctaHref: string;
};

function Wordmark() {
  return (
    <a href="#top" className="inline-flex items-center gap-3 text-[var(--heading)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_18px_40px_-30px_rgba(19,40,78,0.26)]">
        <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-[var(--heading)]">
          <span className="h-2.5 w-2.5 rounded-[4px] bg-[var(--accent)]" />
        </span>
      </span>
      <span className="flex flex-col">
        <span className="text-[0.72rem] font-semibold tracking-[0.24em] text-[color:var(--text)] uppercase">
          Aptax
        </span>
        <span className="text-sm font-medium tracking-[-0.02em] text-[var(--heading)]">
          Confidential verification infrastructure
        </span>
      </span>
    </a>
  );
}

export function SiteHeader({ navItems, ctaHref }: SiteHeaderProps) {
  return (
    <header className="sticky top-4 z-50 px-4 pt-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.35rem] border border-[rgba(215,224,236,0.92)] bg-[rgba(247,249,252,0.86)] px-5 py-4 shadow-[0_18px_44px_-34px_rgba(17,33,64,0.34)] backdrop-blur-xl lg:px-7">
        <Wordmark />
        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--text)] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-[var(--heading)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href={ctaHref}>Request access</ButtonLink>
        </div>
      </div>
    </header>
  );
}
