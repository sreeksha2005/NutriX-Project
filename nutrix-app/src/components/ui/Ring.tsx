import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors, motion } from "@/theme";

/** Animated circular calorie ring (needs react-native-svg). */
export function Ring({
  value,
  size = 130,
  label,
  sub,
  color = colors.mint,
}: {
  value: number;
  size?: number;
  label: string;
  sub: string;
  color?: string;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const AnimatedCircle = useRef(Animated.createAnimatedComponent(Circle)).current;
  const p = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(p, {
      toValue: Math.max(0, Math.min(100, value)),
      duration: motion.ring,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, p]);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.surface2} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={p.interpolate({ inputRange: [0, 100], outputRange: [circumference, 0] })}
        />
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>{label}</Text>
        <Text style={{ color: colors.sub, fontSize: 11 }}>{sub}</Text>
      </View>
    </View>
  );
}
