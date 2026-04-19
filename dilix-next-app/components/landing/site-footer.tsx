const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Why now", href: "#why-now" },
      { label: "Private due diligence", href: "#diligence" },
      { label: "Use cases", href: "#use-cases" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Platform surface", href: "#platform" },
      { label: "API + SDK + MCP", href: "#platform" },
      { label: "Architecture", href: "#platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Request access", href: "mailto:hello@aptax.xyz" },
      { label: "View demo", href: "mailto:hello@aptax.xyz" },
      { label: "Contact", href: "mailto:hello@aptax.xyz" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[var(--dark)]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/10">
                <span className="h-2.5 w-2.5 rounded-[4px] bg-[var(--accent)]" />
              </span>
            </span>
            <span className="text-lg font-medium tracking-[-0.03em]">Aptax</span>
          </a>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
            Confidential verification infrastructure for AI-native and
            Web3-native workflows.
          </p>
          <p className="mt-4 text-sm text-white/45">hello@aptax.xyz</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-medium tracking-[0.16em] text-white/55 uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/72">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>(c) 2026 Aptax. All rights reserved.</p>
          <p>Verify the claim. Reveal nothing else.</p>
        </div>
      </div>
    </footer>
  );
}
