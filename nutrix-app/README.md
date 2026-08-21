# NutriX — AI-Based Nutrition Analysis & Diet Recommendation (Mobile App)

Complete Expo + React Native + TypeScript rebuild with a layered architecture:
**routes → features → store → services → utils/theme**.
Theme is the same "Midnight Nutri" dark palette (`#101418` base, `#38E08A` mint, `#FFB84D` amber).

---

## 1. Folder structure

```text
nutrix-app/
├── app/                                # expo-router routes ONLY (thin, 1-line files)
│   ├── _layout.tsx                     # Stack + global providers (Profile, Diary)
│   ├── index.tsx                       # entry gate → /login or /(tabs)
│   ├── login.tsx
│   ├── register.tsx
│   ├── result.tsx                      # modal-style detection result
│   ├── edit-profile.tsx                # modal-style profile editor
│   └── (tabs)/
│       ├── _layout.tsx                 # floating pill tab bar
│       ├── index.tsx                   # Home
│       ├── detect.tsx
│       ├── diet.tsx
│       └── profile.tsx
│
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   │   └── TabBarIcon.tsx
│   │   └── ui/                         # reusable design-system kit
│   │       ├── Card.tsx                # Card, Chip, SectionTitle
│   │       ├── FadeIn.tsx              # staggered entrance animation
│   │       ├── Field.tsx               # Field, ChipPicker, PrimaryButton
│   │       ├── Press.tsx               # spring press feedback
│   │       ├── Progress.tsx            # animated bar
│   │       ├── Ring.tsx                # animated SVG calorie ring
│   │       ├── Screen.tsx              # standard scroll screen
│   │       └── index.ts
│   │
│   ├── constants/
│   │   ├── config.ts                   # API base URL, storage keys, feature flags
│   │   └── meals.ts                    # meal plan, detectable categories, tips
│   │
│   ├── features/                       # one folder per feature = screens + hooks
│   │   ├── auth/
│   │   │   ├── BreathingLogo.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── detect/
│   │   │   ├── DetectScreen.tsx
│   │   │   ├── ResultScreen.tsx
│   │   │   └── useFoodDetection.ts     # pick → analyze → result flow
│   │   ├── diet/
│   │   │   └── DietScreen.tsx
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   └── profile/
│   │       ├── EditProfileScreen.tsx
│   │       └── ProfileScreen.tsx
│   │
│   ├── services/                       # all I/O lives here
│   │   ├── apiClient.ts                # fetch wrapper + multipart upload
│   │   ├── detectionService.ts         # /predict call (mock flag for demo)
│   │   ├── profileService.ts           # profile persistence
│   │   └── storage.ts                  # typed AsyncStorage wrapper
│   │
│   ├── store/                          # app state (React Context)
│   │   ├── DiaryProvider.tsx           # meals eaten, water, calories, macros
│   │   └── ProfileProvider.tsx         # profile, BMI, calorie goal
│   │
│   ├── theme/
│   │   ├── colors.ts                   # palette + tint() helper
│   │   ├── tokens.ts                   # radius, spacing, typography, shadow, motion
│   │   └── index.ts
│   │
│   ├── types/
│   │   └── index.ts                    # Profile, Meal, DetectionResult, ...
│   │
│   └── utils/
│       └── nutrition.ts                # BMI, Mifflin–St Jeor calorie goal, helpers
│
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json                       # "@/*" → "src/*" path alias
└── .gitignore
```

---

## 2. Run it on your laptop

```bash
cd nutrix-app
npm install
npx expo start
```

Scan the QR code with **Expo Go**, or press `a` (Android) / `i` (iOS).

---

## 3. Architecture rules (why it's structured this way)

| Layer | Rule |
| --- | --- |
| `app/` | Routing only. Every file just re-exports a screen — no UI logic. |
| `features/` | One folder per feature. Screens are presentational; logic goes in a hook. |
| `store/` | Shared state via Context. Screens read `useProfile()` / `useDiary()` — never AsyncStorage directly. |
| `services/` | The only place that talks to network or storage. Swap mock → real API in one file. |
| `theme/` | No hardcoded hex anywhere else. Change the palette once, the whole app follows. |

---

## 4. Connecting your team's ML model

1. Set your server address in `app.json`:
   ```json
   "extra": { "apiBaseUrl": "http://192.168.1.10:5000" }
   ```
   Use your laptop's LAN IP (not `localhost`) so the phone can reach it.
2. In `src/constants/config.ts` set `USE_MOCK_DETECTION = false`.
3. `src/services/detectionService.ts` will then POST the photo as multipart
   `image` to `POST /predict` and expect this JSON:

```json
{
  "name": "Grilled Paneer Salad Bowl",
  "confidence": 94,
  "kcal": 412,
  "serving": "1 bowl · 320 g",
  "macros": [{ "key": "Protein", "value": 26, "unit": "g", "pct": 72, "color": "#38E08A" }],
  "verdict": "Great choice — high protein, moderate carbs.",
  "tips": ["Skip the dressing to save around 90 kcal."]
}
```

Nothing else in the app needs to change.

---

## 5. Features included

- **Auth** — animated login / register, goal picker, profile persisted locally.
- **Home** — live calorie ring from the diary, stat strip, quick actions, "up next" meals, daily tip.
- **Detect** — camera or gallery pick, animated scan sweep, error handling, routes to result.
- **Result** — confidence chip, calorie hero, animated macro bars, smart tips.
- **Diet** — tap meals to log them (calories + macros update live), water stepper, macro split.
- **Profile** — real BMI, Mifflin–St Jeor calorie target, weekly bars, settings, logout.

## 6. Suggested next milestones

1. Move the diary to a real backend so data syncs across devices.
2. Add a history screen (past scans + weekly calorie trend chart).
3. Push notifications for meal reminders (`expo-notifications`).
4. A splash/onboarding screen — looks great in the viva demo.
