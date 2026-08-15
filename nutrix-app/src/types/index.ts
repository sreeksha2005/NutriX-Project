export type Gender = "Male" | "Female" | "Other";
export type Goal = "Lose Weight" | "Stay Fit" | "Gain Muscle";

export type Profile = {
  name: string;
  email: string;
  age: string;
  gender: Gender | "";
  height: string; // cm
  weight: string; // kg
  goal: Goal;
  profileImage: string;
};

export type Macros = { protein: number; carbs: number; fat: number };

export type Meal = {
  id: string;
  icon: string;
  title: string;
  food: string;
  kcal: number;
  time: string;
  tint: string;
  macros: Macros;
};

export type MacroBar = {
  key: string;
  value: number;
  unit: string;
  pct: number;
  color: string;
};

export type DetectionResult = {
  name: string;
  confidence: number;
  kcal: number;
  serving: string;
  macros: MacroBar[];
  verdict: string;
  tips: string[];
};

export type BmiResult = { value: number; label: string; color: string };
