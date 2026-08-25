---
name: investigate-first
description: Diagnose before editing. Use when a bug's cause is unclear, behaviour is intermittent, performance regressed, or a symptom appears far from any recent change. Produces a located, evidenced cause - not a fix.
---

# investigate-first

**This skill does not edit code.** Its output is a diagnosis. Editing is the
next task, and it starts from what this one produced.

Use it when the cause is unknown. If you already know the cause, skip straight
to `surgical-patch`.

## Why it exists

The expensive failure is not a wrong fix — it is a fix applied to a symptom,
which appears to work, and moves the bug somewhere less obvious. Every hour
spent here is repaid the first time it stops that.

## Procedure

### 1. State the symptom as something observable

Write one sentence with a trigger and an observation:

> "On the events tab, pulling to refresh twice within a second leaves the list
> empty until the tab is switched away and back."

If you cannot write that sentence, you do not have a bug report yet. Get the
exact steps, the device/platform, and what was expected instead.

### 2. Reproduce it

Do not proceed on a symptom you have not seen.

- Reproduced reliably → good, continue.
- Reproduced intermittently → find what varies between runs (timing, order,
  cache state, network, cold vs. warm start). *That variable is the lead.*
- Cannot reproduce → say so and stop. Ask for a recording, a log, exact steps,
  or the build number. Do not guess a fix for a bug you cannot trigger.

### 3. Bound the search space

Cheap cuts before expensive reading:

- **When did it start?** `git log` the suspect area; if a commit is implicated,
  read that diff before anything else.
- **Where can it possibly live?** Which module owns this state? Narrow to a
  layer — render, state, persistence, navigation, platform — before opening
  files.
- **Is it one layer or the seam between two?** Symptoms that appear only on a
  transition (mount, navigation, resume, orientation) are usually seams.

### 4. Form one hypothesis and try to kill it

One at a time, phrased so it can be false:

> "The list is empty because the second refresh resolves before the first and
> the first's stale response overwrites it."

Then find the evidence that would *disprove* it — a log line, a value, a
timestamp, a rendered count. Confirming evidence is easy to find for wrong
hypotheses; disconfirming evidence is what separates them.

If the hypothesis survives, you have a cause. If it dies, you have a fact — use
it to bound the next one.

### 5. Prove the cause before proposing a fix

The proof is: **make it happen on demand, and make it stop, by touching only the
suspected cause.** Toggle it both ways. A cause you can only turn on is a
correlation.

## What to hand back

- The symptom sentence, and whether it reproduces reliably.
- The cause: file and line, and the mechanism in one or two sentences.
- The evidence that pins it there — what you observed, not what you reasoned.
- What you ruled out, and how. This is what stops the next session re-treading it.
- The narrowest layer a fix should touch.

## Stop conditions

Stop and report when you have a proved cause — do not carry on into the fix.

Also stop, and say so, when: the bug will not reproduce; the cause is outside
this codebase (SDK, platform, backend); or the fix is clearly a design decision
rather than a defect. Those are the user's calls to make.

## Traps seen in practice

- **Fixing the first suspicious thing you find.** Suspicious ≠ responsible.
  Prove it drives the symptom.
- **Reading widely instead of bisecting.** Ten files skimmed teaches less than
  one commit range narrowed.
- **Accepting "race condition" as a diagnosis.** Which two things, in which
  order, on which thread?
- **Losing the reproduction.** Once you have steps that work, write them down
  before you start changing anything.
