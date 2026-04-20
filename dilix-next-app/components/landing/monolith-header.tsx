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
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between  bg-[var(--surface)] px-6 py-4">
      <div className="font-headline text-xl  tracking-[-0.04em] text-[var(--heading)]">
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
        className="bg-primary px-5 py-2 font-headline text-sm  tracking-[-0.03em] font-medium text-[var(--bg)] transition-colors duration-150 hover:bg-primary/90 rounded-full active:scale-[0.98]"
      >
        Open Dilix App
      </Link>
    </nav>
  );
}
