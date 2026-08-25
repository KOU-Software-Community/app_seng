# native-core — the standing directive

Read by every session. The four skills in this directory are specialisations of
what follows; when one of them contradicts this file, the skill wins for the
duration of that task.

## 1. Context is a budget, not a resource

Reading the codebase again to re-derive something you already know is the most
common way this project wastes a session.

- Before opening files, ask what you already have: this conversation, `AGENTS.md`,
  a previous answer in the same session.
- Prefer one targeted `grep`/`glob` over a directory walk. Read the matching
  span, not the whole file.
- If `graphify-out/` exists, architecture and file-relationship questions are
  **graph queries first**, file scans second.
- Do not open a subagent unless the task is large and genuinely parallel. A
  subagent re-reads everything you already read.
- Do not run a workflow or deep research unless asked.

## 2. Measure, do not assume

A claim about runtime behaviour is worth nothing until something printed it.

- "It should work" is not a result. Run it.
- "It's probably a flake" is not a diagnosis. Reproduce it.
- "The file is named `x`, so it does `x`" is a guess. Open it.
- If the environment blocks you — no network, no device, no credential — say
  it is blocked. Never assert an outcome you did not observe, and never route
  around a network policy to get one.

## 3. An assertion that cannot fail is worse than no assertion

It reports green. This is the single discipline that has paid off most.

When you add a check, **watch it go red first.** Break the thing it guards, see
the failure, then fix the thing and see it pass. A check that has never failed
has not been tested — it has only been written. Real examples of checks that
passed while measuring nothing: reading `opacity` on a `display:none`
pseudo-element (always `1`), and screenshotting before the overlay had painted.

## 4. The smallest change that is actually correct

Not the smallest diff — the smallest *correct* one.

- Fix the layer responsible, not the layer where the symptom surfaced.
- Do not widen a change because you happened to be in the file. Note the other
  thing, finish the task, mention it.
- Do not "improve" code you were not asked to touch.
- Deleting a check to get green is never a fix.

## 5. Write down why, not just what

When a bug is fixed and the cause was not obvious, the reason belongs in
`AGENTS.md` next to the rule, in one or two sentences. The test: *would the next
session, with no memory of this one, make the same mistake?* If yes, it goes in
the file. **A mistake made twice has earned a line in `AGENTS.md`.**

## 6. Report faithfully

State what passed, what failed, and what you did not run. If part of the task is
blocked, finish everything else and say plainly what was left and why. Do not
round a partial result up to a finished one.

## This repository specifically

- `npm run typecheck` must pass before any push. `npx expo export --platform ios`
  catches bundling and import errors without Xcode.
- Colours, gradients, fonts, radii and spacing live in `src/theme.ts` and
  nowhere else.
- `Txt` / `PixelTxt` from `src/components/ui.tsx`, never raw `Text`.
- UI copy is Turkish; case changes use the `'tr'` locale.
- Only publishable/anon keys reach the app. Service-role keys never do. Secrets
  live in gitignored `.env.local`; values that are public by design live in the
  committed `.env`.
