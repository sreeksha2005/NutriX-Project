import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

const logo = require("../../../assets/nutrix-logo.png");

/** Compact app identity shown consistently at the top-left of every screen. */
export function BrandHeader() {
  return (
    <View style={styles.header} accessibilityRole="header">
      <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel="NutriX logo" />
      <Text style={styles.name}>NutriX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 9,
    marginBottom: 20,
  },
  logo: { width: 32, height: 32 },
  name: { color: colors.text, fontSize: 22, fontWeight: "800" },
});