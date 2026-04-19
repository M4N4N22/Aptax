import Link from "next/link";

type HeaderItem = {
  label: string;
  href: string;
  active?: boolean;
};

type MonolithHeaderProps = {
  items: HeaderItem[];
};

export function MonolithHeader({ items }: MonolithHeaderProps) {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[rgba(255,255,255,0.08)] bg-[var(--surface)] px-6 py-4">
      <div className="font-headline text-xl font-black uppercase tracking-[-0.04em] text-[var(--heading)]">
        Aptax
      </div>
      <div className="hidden items-center gap-8 md:flex">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={[
              "font-headline text-sm font-bold uppercase tracking-[-0.03em] transition-colors duration-200",
              item.active
                ? "border-b-2 border-[var(--heading)] pb-1 text-[var(--heading)]"
                : "text-[var(--text-soft)] hover:text-[var(--heading)]",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Link
        href="/app"
        className="bg-[var(--accent)] px-5 py-2 font-headline text-sm font-bold uppercase tracking-[-0.03em] text-[var(--bg)] transition-colors duration-150 hover:bg-[var(--accent-hover)] active:scale-[0.98]"
      >
        Enter App
      </Link>
    </nav>
  );
}
