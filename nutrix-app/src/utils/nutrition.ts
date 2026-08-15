import { colors } from "@/theme";
import type { BmiResult, Profile } from "@/types";

export function calcBmi(profile: Profile): BmiResult | null {
  const h = parseFloat(profile.height) / 100;
  const w = parseFloat(profile.weight);
  if (!h || !w) return null;
  const value = Math.round((w / (h * h)) * 10) / 10;
  if (value < 18.5) return { value, label: "Underweight", color: colors.sky };
  if (value < 25) return { value, label: "Normal", color: colors.mint };
  if (value < 30) return { value, label: "Overweight", color: colors.amber };
  return { value, label: "Obese", color: colors.danger };
}

/** Mifflin–St Jeor BMR, adjusted by the user's goal. Falls back to 1800 kcal. */
export function calcCalorieGoal(profile: Profile): number {
  const age = parseFloat(profile.age);
  const h = parseFloat(profile.height);
  const w = parseFloat(profile.weight);
  if (!age || !h || !w) return 1800;

  const base = 10 * w + 6.25 * h - 5 * age + (profile.gender === "Female" ? -161 : 5);
  const maintenance = base * 1.375; // lightly active

  const adjust =
    profile.goal === "Lose Weight" ? -400 : profile.goal === "Gain Muscle" ? 350 : 0;

  return Math.round((maintenance + adjust) / 10) * 10;
}

export const pct = (value: number, total: number) =>
  total <= 0 ? 0 : Math.max(0, Math.min(100, Math.round((value / total) * 100)));

export const firstName = (name: string) => (name ? name.trim().split(" ")[0] : "there");
