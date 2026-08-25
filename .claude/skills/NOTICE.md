# NOTICE — repo-level skills

## What is in here

`native-core.md` and the four discipline skills (`investigate-first`,
`lean-build`, `surgical-patch`, `verify-and-stop`) are **prompt-discipline**
skills: they constrain how a change is made, not what the change is. They are
plain Markdown, loaded automatically at session start because they live in
`.claude/skills/`. No install step, no network call — which is the whole point
in an ephemeral cloud container.

## Provenance — read this before citing a licence

The idea, the names and the division of labour come from **Caveman** by Julius
Brussee, whose `skills/` tree is MIT licensed. This repository's copies are
**not** verbatim Caveman files: this session had no network access to the
Caveman repository (GitHub access is scoped to `akadirr1/app_seng`), so the
files here were **written from scratch for this project** against the described
behaviour of each skill, and then adapted to this codebase — Expo SDK 57 /
React Native 0.86 / expo-router, Turkish UI copy, `npm run typecheck` as the
gate.

So: **inspired by Caveman, authored here.** If you later want the genuine
upstream text, fetch it from the Caveman repository and replace these files —
and update this notice to a real MIT attribution with the copyright line at
that point.

## What is deliberately NOT here

Caveman's **Engine / proxy** component is licensed BSL-1.1. It is not vendored,
not referenced, and not used. Only the prompt-discipline layer is modelled here.
Keep that separation if you extend this directory.

## `agents/openai.yaml`

Each skill carries a small `agents/openai.yaml`. It is a **portable export** of
the same discipline as a system prompt, for running the skill through an
OpenAI-compatible agent runner outside Claude Code. Nothing in this repository
reads it — Claude Code reads `SKILL.md`. If you have no such runner, these files
are inert and can be deleted without affecting anything.

## Keeping the two in sync

`SKILL.md` is the source of truth. If you edit a skill, edit `SKILL.md` first
and mirror the change into `agents/openai.yaml`, not the other way round.
