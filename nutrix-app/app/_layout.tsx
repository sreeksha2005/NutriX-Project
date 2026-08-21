import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DiaryProvider } from "@/store/DiaryProvider";
import { ProfileProvider } from "@/store/ProfileProvider";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <DiaryProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.bg },
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
            <Stack.Screen name="result" options={{ animation: "slide_from_bottom" }} />
            <Stack.Screen name="edit-profile" options={{ animation: "slide_from_bottom" }} />
          </Stack>
        </DiaryProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
