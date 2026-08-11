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
