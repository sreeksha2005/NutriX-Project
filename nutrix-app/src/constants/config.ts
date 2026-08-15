import Constants from "expo-constants";

/** Base URL of the team's Flask/FastAPI model server. Override in app.json → extra.apiBaseUrl */
export const API_BASE_URL: string =
  (Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined)?.apiBaseUrl ??
  "http://localhost:5000";

/** Set false once the real /predict endpoint is live. */
export const USE_MOCK_DETECTION = true;

export const STORAGE_KEYS = {
  profile: "nutrix.profile",
  diary: "nutrix.diary",
  session: "nutrix.session",
} as const;

export const DEFAULT_WATER_GOAL_L = 3;
