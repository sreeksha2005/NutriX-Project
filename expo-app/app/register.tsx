import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { C, R, shadow } from "../theme";
import { FadeIn, Press } from "../components/ui";
import { Field } from "./login";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in every field.");
      return;
    }
    router.replace("/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Press onPress={() => router.back()}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 22 }}>
          <Ionicons name="arrow-back" size={16} color={C.sub} />
          <Text style={{ color: C.sub, fontWeight: "700" }}>Back to login</Text>
        </View>
      </Press>

      <FadeIn>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.sub}>A few details and your AI nutrition coach is ready.</Text>
      </FadeIn>

      <FadeIn delay={140} style={styles.card}>
        <Field icon="person-outline" label="Full name">
          <TextInput
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
            placeholder="Sreeksha"
            placeholderTextColor={C.sub}
            style={styles.input}
          />
        </Field>
        <View style={{ height: 12 }} />
        <Field icon="mail-outline" label="Email">
          <TextInput
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            placeholder="you@nutrix.app"
            placeholderTextColor={C.sub}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </Field>
        <View style={{ height: 12 }} />
        <Field icon="lock-closed-outline" label="Password">
          <TextInput
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            placeholder="••••••••"
            placeholderTextColor={C.sub}
            secureTextEntry
            style={styles.input}
          />
        </Field>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Press style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Register</Text>
        </Press>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 24, backgroundColor: C.bg },
  title: { color: C.text, fontSize: 30, fontWeight: "800", letterSpacing: -0.5 },
  sub: { color: C.sub, fontSize: 13, marginTop: 6, marginBottom: 22 },
  card: {
    backgroundColor: C.surface,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    padding: 22,
    ...shadow.card,
  },
  input: { color: C.text, fontSize: 15, paddingVertical: 4 },
  error: { color: C.danger, fontSize: 12, fontWeight: "700", marginTop: 12 },
  button: {
    backgroundColor: C.mint,
    borderRadius: R.md,
    paddingVertical: 16,
    marginTop: 22,
    ...shadow.glow,
  },
  buttonText: { color: C.mintDark, textAlign: "center", fontWeight: "800", fontSize: 16 },
});
