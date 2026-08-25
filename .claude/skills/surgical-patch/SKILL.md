---
name: surgical-patch
description: Fix a bug whose cause is already known, in the narrowest layer responsible, with proof of the regression before and after. Use for bug fixes - not for new features, not for refactors, not when the cause is still unknown.
---

# surgical-patch

Preconditions: **the cause is known and located.** If it is not, run
`investigate-first` and come back.

The goal is a diff a reviewer can accept without reading the rest of the file.

## Procedure

### 1. Name the responsible layer

Where the symptom appears is usually not where the bug lives. Fix the layer that
is *wrong*, not the layer that is *visible*.

| Symptom surfaces in | The bug often lives in |
|---|---|
| A screen renders wrong | the state feeding it, or the theme token |
| Wrong data displayed | the fetch/persist layer, or a stale cache key |
| Works, then breaks on return | mount/unmount, focus effects, navigation lifecycle |
| Breaks only on one platform | a platform branch or an SDK behaviour difference |

Patching the visible layer produces a fix that holds until the next caller.

### 2. Reproduce the failure *first*

Before editing anything, get the failure on screen or in output. This is the
red half of red-green, and it is not optional: without it you cannot tell a
working fix from a coincidence.

Write down exactly how you triggered it.

### 3. Write the narrowest change that is correct

- Touch the responsible layer only.
- Do not rename, reformat, reorder imports, or tidy surrounding code. Every
  unrelated line makes the fix harder to review and harder to revert.
- Do not add a config flag, an option, or an abstraction "in case". Fix the case
  in front of you.
- If the correct fix turns out to be large or structural, **stop and say so**
  with the smaller options and their costs. That is a decision, not a patch.

### 4. Prove it, both directions

- Re-run the exact reproduction. It must now pass.
- Revert the fix, confirm the failure returns, re-apply it. If reverting does
  not bring the bug back, you did not fix the thing you think you fixed.

### 5. Check the neighbours

The fix must not change behaviour for the cases that already worked. Name the
adjacent cases and check them — the other tab, the empty state, the other
platform, the logged-out path.

Then run the repo gate: `npm run typecheck`. For anything touching imports,
routes or assets, also `npx expo export --platform ios`.

### 6. Record the why

If the cause was non-obvious, add one or two sentences to `AGENTS.md` next to
the relevant rule, explaining the mechanism — not the fix, the *reason*. The
useful form:

> Never put `scroll-behavior` on `html`. It also applies to the router's scroll
> reset, so product pages opened next to their own footer and crawled upward
> for 1.7 seconds.

## What to hand back

- Cause, in one sentence.
- The diff, and why that layer.
- The reproduction, before and after.
- The neighbouring cases you checked.
- Whether `AGENTS.md` gained a line, and which.

## Never

- Never delete, skip or loosen a check to make something pass.
- Never widen the fix beyond the reported defect on your own judgement.
- Never claim a fix you have not run.
- Never leave the reproduction undocumented — the next regression needs it.
