import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { FadeIn, Field, Press, PrimaryButton, Screen } from "@/components/ui";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";
import { BreathingLogo } from "./BreathingLogo";

export function LoginScreen() {
  const { profile, updateProfile } = useProfile();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await updateProfile({ email: email.trim() });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Screen padBottom={40}>
        <FadeIn>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <BreathingLogo />
            <Text style={styles.brand}>NutriX</Text>
            <Text style={styles.tagline}>AI nutrition analysis & diet recommendation</Text>
          </View>
        </FadeIn>

        <FadeIn delay={120} style={{ marginTop: 40 }}>
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          <PrimaryButton title="Sign in" onPress={signIn} disabled={!email.trim()} />
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
  brand: { color: colors.text, fontSize: 30, fontWeight: "800", letterSpacing: -1, marginTop: 18 },
  tagline: { color: colors.sub, fontSize: 12, marginTop: 6, textAlign: "center" },
  link: { color: colors.sub, fontSize: 12, textAlign: "center", fontWeight: "700" },
});
