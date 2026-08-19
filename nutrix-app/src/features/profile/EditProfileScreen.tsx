import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { ChipPicker, Field, FadeIn, PrimaryButton, Screen } from "@/components/ui";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";
import type { Gender, Goal } from "@/types";

const GENDERS: Gender[] = ["Male", "Female", "Other"];
const GOALS: Goal[] = ["Lose Weight", "Stay Fit", "Gain Muscle"];

export function EditProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [draft, setDraft] = useState(profile);

  const set = (key: keyof typeof draft) => (value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    await updateProfile(draft);
    Alert.alert("Saved", "Your profile has been updated.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Screen padBottom={60}>
        <FadeIn>
          <Text style={styles.title}>Edit profile</Text>
          <Text style={styles.subtitle}>These values drive your BMI and calorie target.</Text>
        </FadeIn>

        <FadeIn delay={80}>
          <Field label="Full name" value={draft.name} onChangeText={set("name")} placeholder="Sreeksha G" />
          <Field
            label="Email"
            value={draft.email}
            onChangeText={set("email")}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <Field label="Age" value={draft.age} onChangeText={set("age")} placeholder="21" keyboardType="number-pad" />
          <ChipPicker label="Gender" options={GENDERS} value={draft.gender} onChange={set("gender")} />
          <Field
            label="Height (cm)"
            value={draft.height}
            onChangeText={set("height")}
            placeholder="165"
            keyboardType="number-pad"
          />
          <Field
            label="Weight (kg)"
            value={draft.weight}
            onChangeText={set("weight")}
            placeholder="58"
            keyboardType="number-pad"
          />
          <ChipPicker label="Goal" options={GOALS} value={draft.goal} onChange={set("goal")} />
          <PrimaryButton title="Save changes" onPress={save} />
        </FadeIn>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { color: colors.sub, fontSize: 13, marginTop: 4, marginBottom: 22 },
});
