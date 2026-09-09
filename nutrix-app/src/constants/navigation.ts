import { Platform } from "react-native";

/** Exact measurements used by the floating tab bar and tab-screen clearance. */
export const FLOATING_TAB_BAR_HEIGHT = 68;
export const FLOATING_TAB_BAR_BOTTOM = Platform.OS === "ios" ? 24 : 16;
export const TAB_CONTENT_GAP = 24;