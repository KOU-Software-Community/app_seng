---
name: verify-and-stop
description: Prove the current work meets its acceptance conditions, without widening scope. Use before committing, pushing or reporting done - and whenever the honest answer to "is this finished?" is "probably".
---

# verify-and-stop

Two jobs, and the second is as important as the first: **prove what was asked
for works**, and **stop there**.

This skill fixes nothing. If verification fails, that is the finding; the repair
is a separate task under `surgical-patch`.

## Procedure

### 1. Recover the acceptance condition

What exactly was asked for? Use the stop condition from `lean-build`, or the
original request. Write it down before testing, so you cannot quietly re-aim at
what you happened to build.

If it was never stated, state it now and say you are stating it.

### 2. Run the gates

- `npm run typecheck` — mandatory, always, before any push.
- `npx expo export --platform ios` — whenever imports, routes or assets changed.
  Catches bundling and import errors without Xcode.
- Any `check:*` scripts in `package.json`.

Paste real output for anything that fails. Do not summarise a failure into
"minor issue".

### 3. Exercise the actual path

Gates prove it compiles, not that it works. Walk the acceptance sentence
literally — every clause, including the ones after "and":

- The happy path, as a user would do it.
- The empty state. The loading state. The error state.
- Persistence: does it survive an app restart?
- Navigation: leave the screen and come back.
- Both platforms, if the change has a platform branch.
- Turkish case handling, if the change touches text transforms.

### 4. Audit your own assertions

**An assertion that cannot fail is worse than none — it reports green.**

For each check you added or relied on, ask: *have I seen this fail?* If not,
break the thing it guards and watch it go red. Specific things that have passed
while measuring nothing:

- Reading `opacity` from a `display:none` pseudo-element — always `1`, so an
  implementation that hid the effect entirely *passed*.
- Screenshotting before the overlay had painted — a flat 1.00:1 contrast
  reading that looked like a bug but measured nothing.
- Sampling seven frames of a video that had not started — the same frame seven
  times, clean pass. Fixed by hashing sampled frames and requiring them to
  differ.

### 5. Report honestly, then stop

Three lists, no rounding:

1. **Verified** — checked, with how.
2. **Failed** — with real output.
3. **Not checked** — and why (no device, no backend, no credential).

The third list is the one that builds trust. "Not verified" is a legitimate
result; "probably fine" is not.

### 6. Stop

When the acceptance condition is met, the task is over.

Things noticed along the way — a nearby bug, an ugly function, a missing test —
get **listed, not fixed**. Fixing them here means the diff no longer matches
what was reviewed, and a regression in that extra work is a regression nobody
was looking for.

The only exception: the change you made is itself broken. Then it is not extra
work, it is the same work, unfinished.

## Never

- Never report done on a check you did not run.
- Never call a failure a flake without reproducing it twice and finding what
  differs.
- Never delete, skip or weaken a check to reach green.
- Never claim behaviour you did not observe. If the environment blocked you,
  say it blocked you.
