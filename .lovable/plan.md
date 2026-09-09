# NutriX Header and Bottom-Overlap Fix

## What will change
- Create a distinctive transparent NutriX logo mark suited to nutrition and AI.
- Add a reusable top-left brand header with the logo and “NutriX” across Home, Detect, Diet, Profile, Result, Edit Profile, Login, and Register.
- Preserve the current Midnight Nutri colors, page content, interactions, and bottom navigation appearance.

## Bottom navigation fix
- Move the existing floating tab bar measurements into shared navigation constants without changing their values or styling.
- Update the shared scrollable screen wrapper to distinguish tab pages from standalone pages.
- For tab pages, calculate bottom content space from the exact tab bar height, floating offset, device safe-area inset, and a small visibility gap.
- Apply the tab-aware wrapper consistently to Home, Detect, Diet, and Profile; keep safe-area-aware padding on Result, Edit Profile, Login, and Register.
- Preserve keyboard behavior, scrolling, cards, images, buttons, and navigation.

## Verification
- Run the Expo TypeScript checks.
- Confirm every scrollable screen uses the corrected shared wrapper and that the final content can move fully above the floating navigation on different inset sizes.
