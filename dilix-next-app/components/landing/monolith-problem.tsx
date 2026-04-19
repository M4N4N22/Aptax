export function MonolithProblem() {
  return (
    <section id="problem" className="px-6 py-24 md:py-28">
       <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="font-label text-xs uppercase tracking-[0.3em] text-[#ffb4ab]">
          The Problem
        </div>
      <div className="max-w-3xl space-y-6">
      
        <h2 className="font-headline text-4xl font-extrabold tracking-[-0.05em] text-[var(--heading)] md:text-5xl">
          Today, verification requires overexposure.
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-soft)]">
          Most systems can only verify sensitive information by revealing it to
          someone else first. That creates friction, privacy risk, and
          unnecessary trust assumptions across apps, agents, and teams.
        </p>
      </div>
      </div>
    </section>
  );
}
