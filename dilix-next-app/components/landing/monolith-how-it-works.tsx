type Step = {
  number: string;
  title: string;
  body: string;
};

type MonolithHowItWorksProps = {
  steps: Step[];
};

export function MonolithHowItWorks({ steps }: MonolithHowItWorksProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-32 text-center">
      <h2 className="text-gradient font-headline mb-8 text-5xl font-extrabold tracking-[-0.06em]">
        Encrypted in. Verified out.
      </h2>
      <p className="mb-16 text-xl leading-relaxed text-[var(--text-soft)]">
        Private data is encrypted at the source. Aptax evaluates verification
        requests against that encrypted state and returns only the bounded
        result. No raw numbers. No full disclosure. No unnecessary access.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className=" bg-[var(--bg-soft)] p-8 text-left"
          >
            <div className="mb-4 font-label text-2xl font-bold text-[var(--heading)]">
              {step.number}
            </div>
            <h4 className="mb-2 font-headline text-lg font-bold text-[var(--heading)]">
              {step.title}
            </h4>
            <p className="text-sm text-[var(--text-soft)]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
