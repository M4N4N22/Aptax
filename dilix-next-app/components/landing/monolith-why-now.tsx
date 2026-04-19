type WhyNowCard = {
  label: string;
  title: string;
};

type MonolithWhyNowProps = {
  cards: WhyNowCard[];
};

export function MonolithWhyNow({ cards }: MonolithWhyNowProps) {
  return (
    <section
      id="developers"
      className="relative overflow-hidden bg-[var(--bg-soft-2)] px-6 py-32"
    >
      <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-white/5" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-8 font-headline text-5xl font-extrabold leading-tight tracking-[-0.06em] text-[var(--heading)]">
            Intelligent systems need a new trust layer.
          </h2>
          <p className="text-xl leading-relaxed text-[var(--text-soft)]">
            As AI agents and programmable workflows become more autonomous, they
            also require more context, more permissions, and more access. Aptax
            gives modern systems a safer way to act on sensitive information
            without holding the information itself.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="aspect-square border border-[rgba(255,255,255,0.1)] bg-[var(--surface)] p-6 flex flex-col justify-end"
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
    </section>
  );
}
