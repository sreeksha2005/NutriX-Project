import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

/** Minimal text-only app name shown consistently at the top-left of every screen. */
export function BrandHeader() {
  return (
    <View style={styles.header} accessibilityRole="header">
      <Text style={styles.name}>
        Nutri<Text style={styles.x}>X</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignSelf: "flex-start", marginBottom: 18 },
  name: {
    color: colors.text,
    fontSize: 26,
    fontStyle: "italic",
    fontWeight: "700",
    letterSpacing: 0.3,
    // Built-in serif faces: elegant, distinctive and need no font download.
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "Georgia, serif" }),
  },
  x: { color: colors.mint },
});
