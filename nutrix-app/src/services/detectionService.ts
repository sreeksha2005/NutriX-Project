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

/**
 * Sends the picked image to the ML endpoint.
 * While the model server is not ready, USE_MOCK_DETECTION returns sample data
 * after a short delay so the UI flow stays testable.
 */
export async function detectFood(imageUri: string): Promise<DetectionResult> {
  if (USE_MOCK_DETECTION) {
    await new Promise((r) => setTimeout(r, 1600));
    return MOCK;
  }
  return apiClient.upload<DetectionResult>("/predict", imageUri);
}
