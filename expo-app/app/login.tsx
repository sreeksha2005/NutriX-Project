import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { C, R, shadow } from "../theme";
import { FadeIn, Press } from "../components/ui";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Breathing logo animation
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ]),
    ).start();
  }, [pulse]);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <FadeIn>
        <Animated.View
          style={[
            styles.logo,
            {
              transform: [
                { scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) },
              ],
            },
          ]}
        >
          <Ionicons name="leaf" size={38} color={C.mintDark} />
        </Animated.View>
        <Text style={styles.title}>NutriX</Text>
        <Text style={styles.tagline}>Eat smart · Stay healthy · Live better</Text>
      </FadeIn>

      <FadeIn delay={140} style={styles.card}>
        <Field icon="mail-outline" label="Email">
          <TextInput
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={C.sub}
            secureTextEntry
            style={styles.input}
          />
        </Field>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Press style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login →</Text>
        </Press>

        <Press onPress={() => router.push("/register")}>
          <Text style={styles.link}>
            New to NutriX? <Text style={{ color: C.mint, fontWeight: "800" }}>Create account</Text>
          </Text>
        </Press>
      </FadeIn>
    </View>
  );
}

export function Field({
  icon,
  label,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <Ionicons name={icon} size={12} color={C.sub} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: C.bg },
  logo: {
    alignSelf: "center",
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: C.mint,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.glow,
  },
  title: {
    color: C.text,
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 18,
    letterSpacing: -0.5,
  },
  tagline: { color: C.sub, fontSize: 13, textAlign: "center", marginTop: 6, marginBottom: 28 },
  card: {
    backgroundColor: C.surface,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    padding: 22,
    ...shadow.card,
  },
  field: {
    backgroundColor: C.surface2,
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  fieldLabel: { color: C.sub, fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
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
  link: { color: C.sub, textAlign: "center", marginTop: 18, fontSize: 13 },
});
