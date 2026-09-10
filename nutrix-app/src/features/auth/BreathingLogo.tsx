import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { shadow } from "@/theme";

const logo = require("../../../assets/nutrix-logo.png");

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
        styles.frame,
        shadow.glow,
        { transform: [{ scale: s }] },
      ]}
    >
      <Image source={logo} style={styles.logo} resizeMode="cover" accessibilityLabel="NutriX logo" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 112,
    height: 112,
    borderRadius: 28,
    overflow: "hidden",
  },
  logo: { width: "100%", height: "100%" },
});
