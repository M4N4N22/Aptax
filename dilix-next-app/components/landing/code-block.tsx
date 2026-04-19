type CodeBlockProps = {
  title: string;
  badge?: string;
  code: string;
  footer?: string;
};

export function CodeBlock({ title, badge, code, footer }: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1423] shadow-[0_28px_72px_-42px_rgba(0,0,0,0.88)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] px-5 py-4">
        <div>
          <span className="text-sm font-medium tracking-[-0.02em] text-white/88">
            {title}
          </span>
          <p className="mt-1 text-xs text-white/42">
            Result-only verification flow
          </p>
        </div>
        {badge ? (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-[0.14em] text-white/55 uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="overflow-x-auto">
          <pre className="min-w-full px-5 py-5 text-sm leading-7 text-[#d7e2ff]">
            <code>
              {lines.map((line, index) => (
                <span
                  key={`${index + 1}-${line}`}
                  className="grid grid-cols-[2rem_1fr] gap-4"
                >
                  <span className="select-none text-right text-white/24">
                    {index + 1}
                  </span>
                  <span>{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
        <aside className="border-t border-white/8 bg-[rgba(255,255,255,0.02)] px-5 py-5 lg:border-l lg:border-t-0">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
            Request contract
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/36 uppercase">
                Scope
              </p>
              <p className="mt-2 text-sm text-white/78">investor:diligence</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/36 uppercase">
                Delivery
              </p>
              <p className="mt-2 text-sm text-white/78">verified or not verified</p>
            </div>
            <div className="rounded-xl border border-[rgba(132,146,255,0.2)] bg-[rgba(91,77,247,0.08)] px-4 py-3">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/36 uppercase">
                Surface
              </p>
              <p className="mt-2 text-sm text-white/82">API, SDK, and MCP compatible</p>
            </div>
          </div>
        </aside>
      </div>
      {footer ? (
        <div className="border-t border-white/8 px-5 py-4 text-sm leading-7 text-white/60">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
