import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { BrandHeader, FadeIn, Field, Press, PrimaryButton, Screen } from "@/components/ui";
import { signInAccount } from "@/services/authService";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";
import { validateEmail, validatePassword } from "@/utils/validation";
import { BreathingLogo } from "./BreathingLogo";

export function LoginScreen() {
  const { profile, updateProfile } = useProfile();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const emailError = touched ? validateEmail(email) : null;
  const passwordError = touched ? validatePassword(password) : null;

  const signIn = async () => {
    setTouched(true);
    setAuthError(null);
    if (validateEmail(email) || validatePassword(password)) return;
    setBusy(true);
    const res = await signInAccount(email, password);
    setBusy(false);
    if (!res.ok) {
      setAuthError(res.error);
      return;
    }
    await updateProfile({ email: email.trim() });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Screen padBottom={40}>
        <BrandHeader />
        <FadeIn>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <BreathingLogo />
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.tagline}>AI nutrition analysis & diet recommendation</Text>
          </View>
        </FadeIn>

        <FadeIn delay={120} style={{ marginTop: 32 }}>
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={emailError}
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            error={passwordError}
          />
          {authError ? <Text style={styles.authError}>{authError}</Text> : null}
          <PrimaryButton title={busy ? "Signing in…" : "Sign in"} onPress={signIn} disabled={busy} />
          <Press onPress={() => router.push("/register")} style={{ marginTop: 18 }}>
            <Text style={styles.link}>
              New here? <Text style={{ color: colors.mint }}>Create an account</Text>
            </Text>
          </Press>
        </FadeIn>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 22, fontWeight: "800", marginTop: 18 },
  tagline: { color: colors.sub, fontSize: 12, marginTop: 6, textAlign: "center" },
  authError: { color: colors.danger, fontSize: 12, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  link: { color: colors.sub, fontSize: 12, textAlign: "center", fontWeight: "700" },
});
