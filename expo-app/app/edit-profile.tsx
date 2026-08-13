import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { C, R, shadow, tintBg } from "../theme";
import { Card, FadeIn, Press } from "../components/ui";
import { EMPTY_PROFILE, PROFILE_KEY, type Profile } from "../data";

const GENDERS = ["Male", "Female", "Other"];
const GOALS = ["Lose Weight", "Stay Fit", "Gain Muscle"];

export default function EditProfile() {
  const [form, setForm] = useState<Profile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PROFILE_KEY).then((d) => {
      if (d) setForm({ ...EMPTY_PROFILE, ...JSON.parse(d) });
    });
  }, []);

  const set = (k: keyof Profile, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) set("profileImage", result.assets[0].uri);
  };

  const save = async () => {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => router.back(), 600);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Press onPress={() => router.back()}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="arrow-back" size={16} color={C.sub} />
          <Text style={{ color: C.sub, fontWeight: "700" }}>Back</Text>
        </View>
      </Press>

      <FadeIn>
        <Text style={styles.title}>Edit profile</Text>
        <Text style={styles.sub}>These values shape your calorie and macro targets.</Text>
      </FadeIn>

      <FadeIn delay={80} style={{ alignItems: "center", marginTop: 22 }}>
        <Press onPress={pickImage}>
          <View style={styles.avatar}>
            {form.profileImage ? (
              <Image source={{ uri: form.profileImage }} style={{ width: "100%", height: "100%" }} />
            ) : (
              <Text style={styles.avatarText}>{(form.name || "N").charAt(0).toUpperCase()}</Text>
            )}
          </View>
          <View style={styles.camBadge}>
            <Ionicons name="camera" size={14} color={C.text} />
          </View>
        </Press>
      </FadeIn>

      <FadeIn delay={140}>
        <Card style={{ marginTop: 22, gap: 12 }}>
          <Input label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Sreeksha" />
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Input label="Age" value={form.age} onChange={(v) => set("age", v)} placeholder="21" numeric />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Weight (kg)" value={form.weight} onChange={(v) => set("weight", v)} placeholder="58" numeric />
            </View>
          </View>
          <Input label="Height (cm)" value={form.height} onChange={(v) => set("height", v)} placeholder="165" numeric />
          <Picker label="Gender" options={GENDERS} value={form.gender} onChange={(v) => set("gender", v)} />
          <Picker label="Goal" options={GOALS} value={form.goal} onChange={(v) => set("goal", v)} />
        </Card>
      </FadeIn>

      <Press style={styles.cta} onPress={save}>
        <Text style={styles.ctaText}>{saved ? "✓ Saved!" : "Save changes"}</Text>
      </Press>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  numeric,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  numeric?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label.toUpperCase()}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={C.sub}
        keyboardType={numeric ? "numeric" : "default"}
        style={{ color: C.text, fontSize: 15, paddingVertical: 4 }}
      />
    </View>
  );
}

function Picker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View>
      <Text style={[styles.fieldLabel, { marginBottom: 8 }]}>{label.toUpperCase()}</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {options.map((o) => {
          const active = value === o;
          return (
            <Press
              key={o}
              onPress={() => onChange(o)}
              style={[
                styles.pickerItem,
                { backgroundColor: active ? tintBg(C.mint) : C.surface2 },
              ]}
            >
              <Text style={{ color: active ? C.mint : C.sub, fontSize: 12, fontWeight: "800" }}>
                {o}
              </Text>
            </Press>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
  title: { color: C.text, fontSize: 24, fontWeight: "800", marginTop: 16, letterSpacing: -0.5 },
  sub: { color: C.sub, fontSize: 13, marginTop: 6 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: C.mint,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadow.glow,
  },
  avatarText: { color: C.mintDark, fontSize: 34, fontWeight: "800" },
  camBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.surface2,
    borderWidth: 4,
    borderColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
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
  pickerItem: { flex: 1, borderRadius: R.md, paddingVertical: 11, alignItems: "center" },
  cta: {
    marginTop: 18,
    backgroundColor: C.mint,
    borderRadius: R.md,
    paddingVertical: 16,
    ...shadow.glow,
  },
  ctaText: { color: C.mintDark, textAlign: "center", fontWeight: "800", fontSize: 16 },
});
