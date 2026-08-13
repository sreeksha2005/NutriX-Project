import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { C } from "../theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: C.bg },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="result" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="edit-profile" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
      </Stack>
    </>
  );
}
