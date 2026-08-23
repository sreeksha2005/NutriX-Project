import type { ReactNode } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme";

/** Height of the floating tab bar plus the gap beneath it. */
const TAB_BAR_SPACE = 68 + (Platform.OS === "ios" ? 24 : 16);

/** Standard scrollable dark screen with room for the floating tab bar. */
export function Screen({
  children,
  scroll = true,
  padBottom,
}: {
  children: ReactNode;
  scroll?: boolean;
  padBottom?: number;
}) {
  const insets = useSafeAreaInsets();
  const bottom = (padBottom ?? TAB_BAR_SPACE + 32) + insets.bottom;
  const top = 24 + insets.top;

  if (!scroll)
    return <View style={[styles.base, { paddingTop: top, paddingBottom: bottom }]}>{children}</View>;
  return (
    <ScrollView
      style={[styles.base, { paddingTop: top }]}
      contentContainerStyle={{ paddingBottom: bottom }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="always"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20, paddingTop: 60 },
});
