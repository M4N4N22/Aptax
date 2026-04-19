import type { ReactNode } from "react";

import type { CalloutItem } from "@/components/landing/monolith-callout-strip";
import { MonolithIcon } from "@/components/landing/monolith-icon";

export type SurfaceCard = {
  icon: "api" | "terminal" | "hub" | "bolt";
  title: string;
  body: string;
  footer: ReactNode;
  className: string;
  footerClassName?: string;
};

type MonolithSurfacesProps = {
  id: string;
  cards: SurfaceCard[];
  callouts?: CalloutItem[];
};

function SurfaceCardBlock({
  card,
}: {
  card: SurfaceCard;
}) {
  return (
    <div
      className={[
        "flex h-[400px] flex-col justify-between  p-10",
        card.className,
      ].join(" ")}
    >
      <div>
        <MonolithIcon name={card.icon} className="mb-6 h-8 w-8 text-[var(--heading)]" />
        <h3 className="mb-4 font-headline text-3xl font-bold tracking-[-0.04em] text-[var(--heading)]">
          {card.title}
        </h3>
        <p className="max-w-md text-[var(--text-soft)]">{card.body}</p>
      </div>
      <div className={card.footerClassName}>{card.footer}</div>
    </div>
  );
}

export function MonolithSurfaces({
  id,
  cards,
  callouts,
}: MonolithSurfacesProps) {
  return (
    <section id={id} className="bg-[var(--bg-soft)] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {callouts ? (
          <div className="mb-16 grid grid-cols-2 gap-8 border-y border-[rgba(255,255,255,0.08)] py-10 md:grid-cols-4">
            {callouts.map((item) => (
              <div key={item.title} className="space-y-2">
                <MonolithIcon
                  name={item.icon}
                  className="mb-2 h-6 w-6 text-[var(--heading)]"
                />
                <div className="font-label text-[10px] uppercase tracking-widest text-[var(--text-soft)]">
                  {item.label}
                </div>
                <div className="font-headline text-sm font-bold uppercase tracking-[-0.03em] text-[var(--heading)]">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mb-16">
          <h2 className="mb-4 font-headline text-5xl font-extrabold tracking-[-0.06em] text-[var(--heading)]">
            Infrastructure Surfaces
          </h2>
          <div className="h-1 w-20 bg-[var(--heading)]" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {cards.map((card) => (
            <SurfaceCardBlock key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
