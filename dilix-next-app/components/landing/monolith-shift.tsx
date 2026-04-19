export function MonolithShift() {
  return (
    <section
      id="shift"
      className=" bg-[var(--bg-soft)] px-6 py-24 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="font-label text-xs uppercase tracking-[0.4em] text-emerald-300">
          The Shift
        </div>
        <div className="space-y-6">
          <h2 className="text-gradient font-headline text-4xl font-extrabold tracking-[-0.05em] md:text-5xl">
            A confidential verification layer for modern workflows.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-soft)]">
            Aptax sits between private data and the apps, agents, or workflows
            that need answers. Instead of sharing the raw data, the user
            encrypts it once. Aptax evaluates a specific verification request
            and returns only the result.
          </p>
        </div>
      </div>
    </section>
  );
}
