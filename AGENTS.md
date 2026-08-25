# KOÜ Yazılım Kulübü — agent notes

Expo SDK 57 / React Native 0.86 / expo-router. Read the exact versioned docs at
https://docs.expo.dev/versions/v57.0.0/ before writing any code — Expo has changed.

## Layout

- `app/` — expo-router routes. `app/(tabs)/` holds the four root screens plus a custom
  tab bar; everything else is a stack route.
- `src/theme.ts` — the only place colours, gradients, fonts, radii and spacing live.
- `src/data.ts` — seed content. Swap for a real API when the backend exists.
- `src/store.tsx` — registrations and notification prefs, persisted via AsyncStorage.

## Conventions

- Use `Txt` / `PixelTxt` from `src/components/ui.tsx` instead of raw `Text`. React Native
  does not synthesise font weights, so every weight is its own family name.
- Press Start 2P (`fonts.pixel`) is for badge labels, group headings, empty states and
  loading copy only — never body text, forms or buttons.
- Gradients are non-empty tuples (`GradientStops`). Pass `gradients.*` straight to
  `LinearGradient`; do not cast to `string[]`.
- UI copy is Turkish. Use `toLocaleLowerCase('tr')` / `toLocaleUpperCase('tr')` for case
  changes so dotted/dotless İ/ı behave.

## Checks

`npm run typecheck` must pass. `npx expo export --platform ios` catches bundling and
import errors without needing Xcode.

## Agent setup

Three layers, and only one of them lives in this repo:

- **MCP servers** — account level (claude.ai → Customize → Connectors). Nothing to copy;
  they are just there. On 21st.dev: `search` and all listing/metadata calls are free and
  unlimited, but **`get_component` is metered — 2 code pulls per day on the free tier**.
  Search widely, spend a pull only on a component actually being built. `get_theme`
  returns CSS free, but treat pulled themes as structural reference only, never as a
  palette source — the palette is `src/theme.ts`.
- **Account skills** — `~/.claude/skills/synced/`. Downloaded per container. Do not copy
  them here.
- **This repo** — `.claude/`, below. This is the part that is version controlled.

```
.claude/
├── settings.json              registers the SessionStart hook
├── hooks/session-start.sh     restores graphify (must stay executable)
└── skills/
    ├── NOTICE.md              provenance and licence boundary — read before citing it
    ├── native-core.md         standing directive, loaded every session
    ├── investigate-first/     diagnose before editing
    ├── lean-build/            new feature, smallest correct size
    ├── surgical-patch/        bug fix, narrowest responsible layer
    └── verify-and-stop/       prove the acceptance conditions, then stop
```

Repo-level skills load automatically — no install step, no network call, which is why
they are committed rather than installed. The hook exists because the cloud container is
rebuilt every session and graphify is the one thing it does not keep.

`graphify` maps an unfamiliar codebase into a queryable graph instead of re-reading it.
It is installed but has never been run here — this codebase was written from scratch, so
there was nothing foreign to map. **If `graphify-out/` ever exists, questions about
architecture, file relationships or project content are graph queries first, file scans
second.**

## Working rules

- **Do not open subagents** unless the task is large and genuinely parallel. They re-read
  everything and burn tokens.
- **Do not run workflows or deep research** unless asked for by name.
- **Do not publish artifacts.**
- **Do not work around the environment's network policy.** If something is unreachable,
  say it is unreachable. Never assert an outcome you did not observe.
- **Keys:** only publishable/anon keys reach the app; service-role keys never do. Secrets
  go in gitignored `.env.local`; values that are public by design go in the committed
  `.env`.
- **An assertion that cannot fail is worse than no assertion** — it reports green. When
  you add a check, break the thing it guards and watch it go red before trusting it.
- Add `check:*` scripts to `package.json` when the first regression appears, not before,
  and start with the assertion that catches that regression.

## Load-bearing decisions — the why log

When a non-obvious bug is fixed, the **reason** goes here next to the rule, not just the
fix. The test: would a session with no memory of this one make the same mistake? If yes,
it belongs here. **A mistake made twice has earned a line in this file.**

- The graphify package is `graphifyy` — **two y's** — while the command is `graphify`,
  one y. Get it wrong and `uv tool install` fails silently and `/graphify` never appears.
- `graphify install` is a **separate step** from installing the package. The package
  provides the binary; that command is what registers the skill with the session.
- `$HOME/.local/bin` must be on `PATH` or the install succeeds and the command is still
  not found. The hook appends it to `CLAUDE_ENV_FILE` so later shells inherit it.
