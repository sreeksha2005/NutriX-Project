export type Profile = {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  profileImage: string;
};

export const EMPTY_PROFILE: Profile = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  goal: "Stay Fit",
  profileImage: "",
};

const KEY = "nutrix.profile";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY_PROFILE, ...JSON.parse(raw) } : EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

export function saveProfile(p: Profile) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function bmi(profile: Profile) {
  const h = parseFloat(profile.height) / 100;
  const w = parseFloat(profile.weight);
  if (!h || !w) return null;
  const value = w / (h * h);
  const label =
    value < 18.5 ? "Underweight" : value < 25 ? "Normal" : value < 30 ? "Overweight" : "Obese";
  return { value: Math.round(value * 10) / 10, label };
}

export const MEALS = [
  {
    id: "breakfast",
    icon: "🍳",
    title: "Breakfast",
    food: "Oats Bowl & Banana",
    kcal: 320,
    tint: "mint" as const,
    time: "8:00 AM",
    macros: { p: 12, c: 48, f: 8 },
  },
  {
    id: "lunch",
    icon: "🍛",
    title: "Lunch",
    food: "Rice, Dal & Curry",
    kcal: 540,
    tint: "amber" as const,
    time: "1:00 PM",
    macros: { p: 22, c: 78, f: 14 },
  },
  {
    id: "snack",
    icon: "🥗",
    title: "Snack",
    food: "Fruit Salad & Nuts",
    kcal: 180,
    tint: "berry" as const,
    time: "5:00 PM",
    macros: { p: 6, c: 22, f: 9 },
  },
  {
    id: "dinner",
    icon: "🌙",
    title: "Dinner",
    food: "Soup & Grilled Veggies",
    kcal: 420,
    tint: "sky" as const,
    time: "8:30 PM",
    macros: { p: 18, c: 40, f: 12 },
  },
];

export const DETECTABLE = [
  { emoji: "🍎", label: "Fruits" },
  { emoji: "🥗", label: "Salads" },
  { emoji: "🍛", label: "Indian Meals" },
  { emoji: "🍞", label: "Bakery" },
  { emoji: "🍗", label: "Proteins" },
  { emoji: "🥤", label: "Beverages" },
];

export const DETECTION_RESULT = {
  name: "Grilled Paneer Salad Bowl",
  confidence: 94,
  kcal: 412,
  serving: "1 bowl · 320 g",
  macros: [
    { key: "Protein", value: 26, unit: "g", pct: 72, color: "mint" as const },
    { key: "Carbs", value: 38, unit: "g", pct: 55, color: "amber" as const },
    { key: "Fat", value: 17, unit: "g", pct: 40, color: "berry" as const },
    { key: "Fiber", value: 9, unit: "g", pct: 66, color: "sky" as const },
  ],
  verdict: "Great choice — high protein, moderate carbs.",
  tips: [
    "Pair with a glass of buttermilk for extra probiotics.",
    "Skip the dressing to save around 90 kcal.",
    "Add pumpkin seeds for iron and zinc.",
  ],
};
