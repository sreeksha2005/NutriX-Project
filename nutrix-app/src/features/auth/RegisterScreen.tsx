import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { BrandHeader, ChipPicker, FadeIn, Field, Press, PrimaryButton, Screen } from "@/components/ui";
import { registerAccount } from "@/services/authService";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";
import type { Goal } from "@/types";
import { validateEmail, validateName, validatePassword } from "@/utils/validation";

const GOALS: Goal[] = ["Lose Weight", "Stay Fit", "Gain Muscle"];

export function RegisterScreen() {
  const { updateProfile } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [goal, setGoal] = useState<string>("Stay Fit");
  const [touched, setTouched] = useState(false);

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirm: !confirm ? "Please confirm your password." : confirm !== password ? "Passwords do not match." : null,
  };
  const show = (e: string | null) => (touched ? e : null);

  const register = async () => {
    setTouched(true);
    if (Object.values(errors).some(Boolean)) return;
    await registerAccount(email, password);
    await updateProfile({ name: name.trim(), email: email.trim(), goal: goal as Goal });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Screen padBottom={40}>
        <BrandHeader />
        <FadeIn>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Takes 30 seconds — you can refine details later.</Text>
        </FadeIn>

        <FadeIn delay={100} style={{ marginTop: 26 }}>
          <Field label="Full name" value={name} onChangeText={setName} placeholder="Enter your name" error={show(errors.name)} />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={show(errors.email)}
          />
          <Field label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry error={show(errors.password)} />
          <Field label="Confirm password" value={confirm} onChangeText={setConfirm} placeholder="Re-enter password" secureTextEntry error={show(errors.confirm)} />
          <ChipPicker label="Your goal" options={GOALS} value={goal} onChange={setGoal} />
          <PrimaryButton title="Create account" onPress={register} />
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
  title: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5, marginTop: 8 },
  subtitle: { color: colors.sub, fontSize: 13, marginTop: 6 },
  link: { color: colors.sub, fontSize: 12, textAlign: "center", fontWeight: "700" },
});
