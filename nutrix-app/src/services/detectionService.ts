import { USE_MOCK_DETECTION } from "@/constants/config";
import { colors } from "@/theme";
import type { DetectionResult } from "@/types";
import { apiClient } from "./apiClient";

const MOCK: DetectionResult = {
  name: "Grilled Paneer Salad Bowl",
  confidence: 94,
  kcal: 412,
  serving: "1 bowl · 320 g",
  macros: [
    { key: "Protein", value: 26, unit: "g", pct: 72, color: colors.mint },
    { key: "Carbs", value: 38, unit: "g", pct: 55, color: colors.amber },
    { key: "Fat", value: 17, unit: "g", pct: 40, color: colors.berry },
    { key: "Fiber", value: 9, unit: "g", pct: 66, color: colors.sky },
  ],
  verdict: "Great choice — high protein, moderate carbs.",
  tips: [
    "Pair with a glass of buttermilk for extra probiotics.",
    "Skip the dressing to save around 90 kcal.",
    "Add pumpkin seeds for iron and zinc.",
  ],
};

type BackendDetectionResult = {
  food_title: string;
  total_calories: number;
  total_weight_g: number;
  macros: {
    key: string;
    value: number;
    unit: string;
    pct: number;
    color: string;
  }[];
  verdict: string;
  tips: string[];
  detected_items: {
    confidence_pct: number;
  }[];
};

export async function detectFood(imageUri: string): Promise<DetectionResult> {
  if (USE_MOCK_DETECTION) {
    await new Promise((r) => setTimeout(r, 1600));
    return MOCK;
  }

  const data = await apiClient.upload<BackendDetectionResult>(
    "/api/detect",
    imageUri,
  );

  return {
    name: data.food_title,
    confidence: Math.round(
      data.detected_items.reduce(
        (sum, item) => sum + item.confidence_pct,
        0,
      ) / data.detected_items.length,
    ),
    kcal: Math.round(data.total_calories),
    serving: `${data.serving_summary ?? `${data.total_weight_g} g`}`,
    macros: data.macros.map((macro) => ({
      ...macro,
      color:
        macro.color === "mint"
          ? colors.mint
          : macro.color === "amber"
            ? colors.amber
            : macro.color === "berry"
              ? colors.berry
              : colors.sky,
    })),
    verdict: data.verdict,
    tips: data.tips,
  };
}

