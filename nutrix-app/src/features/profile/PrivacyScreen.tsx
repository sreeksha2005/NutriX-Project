import { StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BrandHeader, Card, Press, Screen } from "@/components/ui";
import { colors, radius } from "@/theme";

const SECTIONS = [
  {
    title: "About this app",
    body: "NutriX is an academic project that analyses food images and suggests diet plans. This page explains how the app handles your information.",
  },
  {
    title: "Data we use",
    body: "Your name, email, age, gender, height, weight and goal are used only to calculate your BMI, calorie target and recommendations.",
  },
  {
    title: "Food images",
    body: "Photos you choose for analysis are sent to the NutriX analysis server to detect the food and estimate nutrition. They are not shared with third parties by the app.",
  },
  {
    title: "Account information",
    body: "Profile details, diary entries and reminders are saved on your device. Logging out clears your saved profile from this device.",
  },
  {
    title: "Your control",
    body: "You can edit your profile at any time, remove your profile photo, delete reminders, or log out to clear your data.",
  },
  {
    title: "Contact",
    body: "For questions about this project, please contact the NutriX project team.",
  },
];

export function PrivacyScreen() {
  return (
    <Screen padBottom={40}>
      <BrandHeader />
      <Press style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={18} color={colors.text} />
      </Press>
      <Text style={styles.title}>Privacy</Text>
      {SECTIONS.map((s) => (
        <Card key={s.title} style={{ marginTop: 12 }}>
          <Text style={styles.heading}>{s.title}</Text>
          <Text style={styles.body}>{s.body}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.surface,
    alignItems: "center", justifyContent: "center", marginBottom: 14,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: "800", marginBottom: 6 },
  heading: { color: colors.text, fontSize: 14, fontWeight: "800", marginBottom: 6 },
  body: { color: colors.sub, fontSize: 12, lineHeight: 19 },
});
