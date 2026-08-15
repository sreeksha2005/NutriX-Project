import { colors } from "@/theme";
import type { Meal } from "@/types";

export const MEALS: Meal[] = [
  {
    id: "breakfast",
    icon: "🍳",
    title: "Breakfast",
    food: "Oats Bowl & Banana",
    kcal: 320,
    time: "8:00 AM",
    tint: colors.mint,
    macros: { protein: 12, carbs: 48, fat: 8 },
  },
  {
    id: "lunch",
    icon: "🍛",
    title: "Lunch",
    food: "Rice, Dal & Curry",
    kcal: 540,
    time: "1:00 PM",
    tint: colors.amber,
    macros: { protein: 22, carbs: 78, fat: 14 },
  },
  {
    id: "snack",
    icon: "🥗",
    title: "Snack",
    food: "Fruit Salad & Nuts",
    kcal: 180,
    time: "5:00 PM",
    tint: colors.berry,
    macros: { protein: 6, carbs: 22, fat: 9 },
  },
  {
    id: "dinner",
    icon: "🌙",
    title: "Dinner",
    food: "Soup & Grilled Veggies",
    kcal: 420,
    time: "8:30 PM",
    tint: colors.sky,
    macros: { protein: 18, carbs: 40, fat: 12 },
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

export const DAILY_TIPS = [
  "Fill half your plate with vegetables at lunch and dinner.",
  "Drink a glass of water before every meal — it helps portion control.",
  "Aim for 25–30 g of protein per main meal to stay full longer.",
];
