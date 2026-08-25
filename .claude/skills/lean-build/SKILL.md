---
name: lean-build
description: Build a new feature at the smallest size that satisfies the request. Use when starting new functionality and the risk is over-building - inventing abstractions, adding options nobody asked for, or writing what the repo already has. Reuse first, narrow scope, state the stop condition up front.
---

# lean-build

The failure mode here is not writing too little. It is writing a configurable,
extensible, three-layer version of something that needed twenty lines — and a
second copy of a helper that already exists in `src/`.

## Procedure

### 1. Write the stop condition before writing code

One sentence, checkable, agreed before you start:

> "Done when a member can open the event detail from the events tab, register,
> and see the registration reflected after an app restart."

If you cannot state it, the request is ambiguous — ask now, not after building
the wrong thing. This sentence is what `verify-and-stop` will later check
against, and it is what stops scope creep mid-task.

### 2. Search for what already exists — before designing anything

The order matters; the first hit ends the search.

1. `src/theme.ts` — every colour, gradient, font, radius and spacing value.
   Never define a new one inline.
2. `src/components/ui.tsx` — `Txt`, `PixelTxt` and the shared primitives.
3. `src/store.tsx` — persisted state. New persisted state extends this; it does
   not get its own AsyncStorage key.
4. `src/data.ts` — seed content shape.
5. `app/` — an existing route doing something structurally similar. Copy its
   shape; consistency beats novelty.

Two targeted greps here routinely remove half the work.

### 3. Design to the request, not to the general case

- Build for the cases named. Not the ones you can imagine.
- No option, prop or flag without a caller using it *now*.
- No abstraction over fewer than three real uses. Two similar things are two
  things.
- No new dependency when the SDK, the platform or an existing file does it. If
  one is genuinely needed, say why before adding it.
- No new file when an existing one is the honest home for the code.

### 4. Build it end to end, then stop

A thin path that actually works beats three polished layers that do not connect.
Get the whole flow running first; refine after it does.

When the stop condition is met, **stop.** Things you noticed along the way get
mentioned, not built.

### 5. Verify against the stop condition

Run `npm run typecheck`. Run `npx expo export --platform ios` if you touched
imports, routes or assets. Walk the stop-condition sentence literally, including
the part after "and" — the restart, the second tab, the empty state.

## House rules that apply to every build here

- `Txt` / `PixelTxt`, never raw `Text` — React Native does not synthesise font
  weights, so each weight is its own family.
- `fonts.pixel` (Press Start 2P) is for badge labels, group headings, empty
  states and loading copy **only**. Never body text, forms or buttons.
- Gradients are non-empty tuples (`GradientStops`), passed straight from
  `gradients.*` to `LinearGradient`. Never cast to `string[]`.
- UI copy is Turkish. Case changes use `toLocaleLowerCase('tr')` /
  `toLocaleUpperCase('tr')` so İ/ı behave.
- Read the versioned Expo SDK 57 docs before using an API from memory:
  https://docs.expo.dev/versions/v57.0.0/

## What to hand back

- The stop condition, and that it is met.
- What you reused, and what you added — the second list should be short.
- Anything deliberately not built, and why.
- Check results, verbatim if anything failed.

## Never

- Never add configurability with no current caller.
- Never duplicate a theme token, a primitive or a store field.
- Never keep building past the stop condition because something nearby looked
  unfinished. Say it instead.
