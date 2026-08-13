// NutriX design tokens — "Midnight Nutri"
export const C = {
  bg: "#101418",
  surface: "#1A2129",
  surface2: "#232C36",
  border: "rgba(255,255,255,0.10)",
  text: "#EFF3F6",
  sub: "#93A1AD",
  mint: "#38E08A",
  mintDark: "#0F3D28",
  amber: "#FFB84D",
  berry: "#FF7A8A",
  sky: "#6FB6F5",
  danger: "#FF6B6B",
};

export const R = { sm: 12, md: 18, lg: 24, xl: 32 };

export const shadow = {
  glow: {
    shadowColor: C.mint,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
};

export const tintBg = (hex: string, alpha = "22") => hex + alpha;
