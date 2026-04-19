export function MonolithProblemShift() {
  return (
    <section
      id="solutions"
      className="mx-auto grid max-w-7xl grid-cols-1 gap-24 px-6 py-32 md:grid-cols-2"
    >
      <div className="space-y-6">
        <div className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-[#ffb4ab]">
          The Problem
        </div>
        <h2 className="font-headline text-4xl font-extrabold tracking-[-0.05em] text-[var(--heading)]">
          Software still verifies by overexposing.
        </h2>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          Most systems can only validate sensitive information by revealing it
          first. That approach slows workflows, widens access, and creates
          unnecessary trust assumptions across apps, agents, and teams.
        </p>
      </div>

      <div className="space-y-6 border border-[rgba(255,255,255,0.1)] bg-[var(--bg-soft)] p-8">
        <div className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-[var(--heading)]">
          The Shift
        </div>
        <h2 className="text-gradient font-headline text-4xl font-extrabold tracking-[-0.05em]">
          A better interface to private information.
        </h2>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          Aptax replaces raw data access with bounded verification. Instead of
          exposing the secret, software can ask a specific question and receive
          only the answer it needs.
        </p>
      </div>
    </section>
  );
}
