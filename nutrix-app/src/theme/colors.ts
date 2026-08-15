/** NutriX palette — "Midnight Nutri". Single source of truth for every color. */
export const colors = {
  bg: "#101418",
  surface: "#1A2129",
  surface2: "#232C36",
  surfaceMint: "#16302A",
  border: "rgba(255,255,255,0.10)",
  text: "#EFF3F6",
  sub: "#93A1AD",
  mint: "#38E08A",
  mintDark: "#0F3D28",
  amber: "#FFB84D",
  berry: "#FF7A8A",
  sky: "#6FB6F5",
  danger: "#FF6B6B",
} as const;

export type ColorKey = keyof typeof colors;

/** Translucent tint of any accent color, e.g. tint(colors.mint, "22"). */
export const tint = (hex: string, alpha = "22") => `${hex}${alpha}`;
