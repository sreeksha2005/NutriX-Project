import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FLOATING_TAB_BAR_BOTTOM,
  FLOATING_TAB_BAR_HEIGHT,
  TAB_CONTENT_GAP,
} from "@/constants/navigation";
import { colors } from "@/theme";

/** Standard scrollable dark screen with room for the floating tab bar. */
export function Screen({
  children,
  scroll = true,
  padBottom,
  hasTabBar = false,
}: {
  children: ReactNode;
  scroll?: boolean;
  padBottom?: number;
  hasTabBar?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const tabBarClearance =
    FLOATING_TAB_BAR_HEIGHT + FLOATING_TAB_BAR_BOTTOM + insets.bottom + TAB_CONTENT_GAP;
  const bottom =
    padBottom !== undefined
      ? padBottom + insets.bottom
      : hasTabBar
        ? tabBarClearance
        : insets.bottom + TAB_CONTENT_GAP;
  const top = 24 + insets.top;

  if (!scroll)
    return <View style={[styles.base, { paddingTop: top, paddingBottom: bottom }]}>{children}</View>;
  return (
    <ScrollView
      style={styles.base}
      contentContainerStyle={{ paddingTop: top }}
      scrollIndicatorInsets={{ bottom }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="never"
    >
      {children}
      <View style={{ height: bottom }} accessible={false} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20 },
});
