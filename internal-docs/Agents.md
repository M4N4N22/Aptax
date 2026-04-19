# AGENTS.md

## Working rules

- Read `roadmap.md` for long-term product context.
- Treat `phase-1.md` as the implementation source of truth.
- Read any files under `docs/` that are relevant to the current task before implementation.
- Do not assume framework or SDK behavior when the API may have changed.
- For Fhenix / CoFHE integration, prefer official docs and migration notes over memory.
- If a required implementation detail is unclear or appears version-sensitive, stop and ask for the exact official documentation.
- When blocked by missing or uncertain docs, update `phase-1.md`:
  - mark the task as `blocked`
  - add a short note describing what documentation is needed
- After receiving docs, summarize the implementation-relevant conclusions before continuing.
- Do not use deprecated Fhenix decrypt flow.
- Use `@cofhe/sdk`, `decryptForView`, and `decryptForTx` according to repo docs and official migration guidance.