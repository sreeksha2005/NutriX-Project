import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { ChipPicker, FadeIn, Field, Press, PrimaryButton, Screen } from "@/components/ui";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";
import type { Goal } from "@/types";

const GOALS: Goal[] = ["Lose Weight", "Stay Fit", "Gain Muscle"];

export function RegisterScreen() {
  const { updateProfile } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState<string>("Stay Fit");

  const canSubmit = name.trim().length > 1 && email.includes("@") && password.length >= 4;

  const register = async () => {
    await updateProfile({ name: name.trim(), email: email.trim(), goal: goal as Goal });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Screen padBottom={40}>
        <FadeIn>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Takes 30 seconds — you can refine details later.</Text>
        </FadeIn>

        <FadeIn delay={100} style={{ marginTop: 26 }}>
          <Field label="Full name" value={name} onChangeText={setName} placeholder="Sreeksha G" />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <Field label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <ChipPicker label="Your goal" options={GOALS} value={goal} onChange={setGoal} />
          <PrimaryButton title="Create account" onPress={register} disabled={!canSubmit} />
          <Press onPress={() => router.replace("/login")} style={{ marginTop: 18 }}>
            <Text style={styles.link}>
              Already registered? <Text style={{ color: colors.mint }}>Sign in</Text>
            </Text>
          </Press>
        </FadeIn>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 26, fontWeight: "800", letterSpacing: -0.6, marginTop: 20 },
  subtitle: { color: colors.sub, fontSize: 13, marginTop: 6 },
  link: { color: colors.sub, fontSize: 12, textAlign: "center", fontWeight: "700" },
});
