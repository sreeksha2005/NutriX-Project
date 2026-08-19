import { useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";
import { colors, shadow } from "@/theme";

/** Logo mark that gently "breathes" — sets the tone on the auth screens. */
export function BreathingLogo() {
  const s = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(s, { toValue: 1.08, duration: 1600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(s, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [s]);

  return (
    <Animated.View
      style={[
        {
          width: 82,
          height: 82,
          borderRadius: 28,
          backgroundColor: colors.mint,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: s }],
        },
        shadow.glow,
      ]}
    >
      <Text style={{ fontSize: 36 }}>🥗</Text>
    </Animated.View>
  );
}
