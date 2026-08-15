import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "@/theme";

/** Standard scrollable dark screen with room for the floating tab bar. */
export function Screen({
  children,
  scroll = true,
  padBottom = 120,
}: {
  children: ReactNode;
  scroll?: boolean;
  padBottom?: number;
}) {
  if (!scroll) return <View style={[styles.base, { paddingBottom: padBottom }]}>{children}</View>;
  return (
    <ScrollView
      style={styles.base}
      contentContainerStyle={{ paddingBottom: padBottom }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20, paddingTop: 60 },
});
