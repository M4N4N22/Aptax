import { MonolithIcon } from "@/components/landing/monolith-icon";

export type CalloutItem = {
  icon: "api" | "terminal" | "hub" | "bolt";
  label: string;
  title: string;
};

type MonolithCalloutStripProps = {
  items: CalloutItem[];
};

export function MonolithCalloutStrip({ items }: MonolithCalloutStripProps) {
  return (
    <section className="border-y border-[rgba(255,255,255,0.08)] bg-[var(--bg-soft)] px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="space-y-2">
            <MonolithIcon name={item.icon} className="mb-2 h-6 w-6 text-[var(--heading)]" />
            <div className="font-label text-[10px] uppercase tracking-widest text-[var(--text-soft)]">
              {item.label}
            </div>
            <div className="font-headline text-sm font-bold uppercase tracking-[-0.03em] text-[var(--heading)]">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
