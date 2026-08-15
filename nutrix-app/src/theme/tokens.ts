import { colors } from "./colors";

export const radius = { sm: 12, md: 18, lg: 24, xl: 32, pill: 999 } as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 26 } as const;

export const typography = {
  h1: { fontSize: 26, fontWeight: "800", letterSpacing: -0.6, color: colors.text },
  h2: { fontSize: 20, fontWeight: "800", letterSpacing: -0.4, color: colors.text },
  h3: { fontSize: 16, fontWeight: "800", color: colors.text },
  body: { fontSize: 13, color: colors.text },
  sub: { fontSize: 12, color: colors.sub },
  caption: { fontSize: 10, color: colors.sub, fontWeight: "700" },
} as const;

export const shadow = {
  glow: {
    shadowColor: colors.mint,
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
} as const;

export const motion = {
  enter: 520,
  stagger: 80,
  progress: 900,
  ring: 1300,
} as const;
