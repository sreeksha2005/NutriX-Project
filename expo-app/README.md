# NutriX — Expo files (copy into your project)

These are the redesigned React Native / Expo Router screens matching the live web preview
("Midnight Nutri" dark theme: `#101418` base, `#1A2129` surfaces, `#38E08A` mint, `#FFB84D` amber).

## Where each file goes

| File here | Goes in your Expo project |
| --- | --- |
| `theme.ts` | `theme.ts` (project root) |
| `data.ts` | `data.ts` (project root) |
| `components/ui.tsx` | `components/ui.tsx` |
| `app/_layout.tsx` | `app/_layout.tsx` |
| `app/index.tsx` | `app/index.tsx` |
| `app/login.tsx` | `app/login.tsx` |
| `app/register.tsx` | `app/register.tsx` |
| `app/result.tsx` | `app/result.tsx` |
| `app/edit-profile.tsx` | `app/edit-profile.tsx` |
| `app/(tabs)/_layout.tsx` | `app/(tabs)/_layout.tsx` |
| `app/(tabs)/index.tsx` | `app/(tabs)/index.tsx` |
| `app/(tabs)/detect.tsx` | `app/(tabs)/detect.tsx` |
| `app/(tabs)/diet.tsx` | `app/(tabs)/diet.tsx` |
| `app/(tabs)/profile.tsx` | `app/(tabs)/profile.tsx` |

If you keep `theme.ts` / `data.ts` / `components/` somewhere else, just fix the relative imports
(`../theme`, `../../theme`).

## One extra dependency

The animated calorie ring uses SVG:

```bash
npx expo install react-native-svg expo-status-bar
```

`expo-image-picker`, `@react-native-async-storage/async-storage` and `@expo/vector-icons`
you already have.

## What changed vs your original code

**Design**
- Dark "Midnight Nutri" theme with one shared token file (`theme.ts`) — no more hardcoded hex per screen.
- Floating pill tab bar with a mint capsule behind the active tab, instead of the default white bar.
- Cards get consistent radius (24), 1px hairline borders and soft shadows — the "real app" look.
- Sora-ish heavy headings via `fontWeight: 800` + negative letter spacing.

**Animations**
- `FadeIn` — staggered slide-up entrance on every section (this alone makes it feel native).
- `Press` — spring scale-down on every tappable element.
- `Progress` / `Ring` — animate from 0 to their value on mount.
- Login logo breathes; Detect screen has a scan sweep line while analyzing.
- Stack transitions: slide from right, modal-style slide-up for result & edit-profile.

**Content / UX suggestions I implemented**
- Home is now a real dashboard: calorie ring, burned/water/steps stat strip, quick actions, "up next" meals, tip.
- Diet screen: tap a meal to mark it eaten (calories total updates live), water +/- stepper, macro split.
- Profile: real BMI calculated from height/weight, weekly activity bars, settings list, logout.
- Edit profile: gender/goal chip pickers instead of free-text, numeric keyboards, save confirmation.
- Detect: analyze button is disabled until an image is picked, then routes to the result screen.

## Ideas for your next milestone (backend team)

1. Replace `DETECTION_RESULT` in `data.ts` with the real model response from your Flask/FastAPI endpoint.
2. Send the image with `FormData` from `detect.tsx` and pass the response to `/result` via router params.
3. Compute daily calorie targets from BMI + goal instead of the hardcoded 1800 kcal.
4. Store the food diary in AsyncStorage (or your DB) so the Home ring reflects real logged meals.
5. Add a splash/onboarding screen — good for the demo/viva.
