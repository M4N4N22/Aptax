type PlatformVisionCard = {
  label: string;
  title: string;
};

type MonolithPlatformVisionProps = {
  cards: PlatformVisionCard[];
};

export function MonolithPlatformVision({
  cards,
}: MonolithPlatformVisionProps) {
  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-[var(--bg-soft-2)] px-6 py-32"
    >
      <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-white/5" />
      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <div className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-[var(--heading)]">
              Platform Vision
            </div>
            <h2 className="mb-8 font-headline text-5xl font-extrabold leading-tight tracking-[-0.06em] text-[var(--heading)]">
              Intelligent systems need a new trust layer.
            </h2>
            <p className="text-xl leading-relaxed text-[var(--text-soft)]">
              As AI agents and programmable workflows become more autonomous,
              they also require more context, more permissions, and more
              access. Aptax gives modern systems a safer way to act on
              sensitive information without holding the information itself.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="flex aspect-square flex-col justify-end bg-[var(--surface)] p-6"
              >
                <span className="mb-2 font-label text-[10px] uppercase tracking-widest text-[var(--text-soft)]">
                  {card.label}
                </span>
                <div className="font-headline text-xl font-bold text-[var(--heading)]">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-12 border-y border-[rgba(255,255,255,0.08)] py-16 md:flex-row md:items-center">
          <div className="flex flex-col gap-4">
            <div className="font-label text-xs uppercase tracking-[0.4em] text-[var(--text-soft)]">
              Core Technology
            </div>
            <h3 className="font-headline text-3xl font-black uppercase italic tracking-[-0.04em] text-[var(--heading)]">
              Fhenix Enabled
            </h3>
          </div>
          <div className="md:max-w-xl">
            <p className="leading-relaxed text-[var(--text-soft)]">
              Aptax is built on Fhenix and encrypted computation primitives
              that make confidential verification possible at the
              infrastructure layer. We leverage the power of FHE to ensure data
              remains sovereign even during processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
