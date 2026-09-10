import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

const logo = require("../../../assets/nutrix-brand-badge.png");

/** Compact app identity shown consistently at the top-left of every screen. */
export function BrandHeader() {
  return (
    <View style={styles.header} accessibilityRole="header">
      <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel="NutriX botanical logo" />
      <Text style={styles.name}>NutriX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 10,
    marginBottom: 18,
  },
  logo: { width: 40, height: 40 },
  name: { color: colors.text, fontSize: 22, fontWeight: "800" },
});