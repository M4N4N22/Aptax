type FooterLink = {
  label: string;
  href: string;
};

type MonolithFooterProps = {
  links: FooterLink[];
};

export function MonolithFooter({ links }: MonolithFooterProps) {
  return (
    <footer className="flex w-full flex-col items-start justify-between gap-8 border-t border-[rgba(255,255,255,0.08)] bg-[var(--bg-soft)] px-8 py-12 md:flex-row">
      <div className="space-y-4">
        <div className="font-headline text-lg font-black tracking-[-0.04em] text-[var(--heading)]">
          APTAX
        </div>
        <p className="font-label text-[10px] uppercase tracking-widest text-[#919191]">
          (c) 2024 Aptax Infrastructure. Sovereign Monolith Grade.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-label text-[10px] uppercase tracking-widest text-[#919191] underline decoration-1 transition-all duration-300 hover:text-[var(--heading)]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
