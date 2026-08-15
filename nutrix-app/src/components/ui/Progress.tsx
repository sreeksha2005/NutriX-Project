import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { colors, motion, radius } from "@/theme";

/** Animated horizontal progress bar (0–100). */
export function Progress({ value, color = colors.mint }: { value: number; color?: string }) {
  const w = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(w, {
      toValue: Math.max(0, Math.min(100, value)),
      duration: motion.progress,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, w]);

  return (
    <View style={styles.track}>
      <Animated.View
        style={{
          height: "100%",
          borderRadius: radius.pill,
          backgroundColor: color,
          width: w.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface2,
    overflow: "hidden",
    width: "100%",
  },
});
