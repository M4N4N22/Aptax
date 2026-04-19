type FaqItem = {
  question: string;
  answer: string;
};

type MonolithFaqProps = {
  items: FaqItem[];
};

export function MonolithFaq({ items }: MonolithFaqProps) {
  return (
    <section id="faq" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <div className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-[var(--heading)]">
            FAQ
          </div>
          <h2 className="font-headline text-5xl font-extrabold tracking-[-0.06em] text-[var(--heading)]">
            Questions teams will ask before they trust the layer.
          </h2>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.question}
              className="bg-[var(--bg-soft)] p-8"
            >
              <h3 className="font-headline text-2xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                {item.question}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-soft)]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
