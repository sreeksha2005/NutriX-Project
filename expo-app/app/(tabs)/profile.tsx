import { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { C, R, shadow, tintBg } from "../../theme";
import { Card, Chip, FadeIn, Press, Progress, SectionTitle } from "../../components/ui";
import { bmi, EMPTY_PROFILE, PROFILE_KEY, type Profile as P } from "../../data";

export default function Profile() {
  const [p, setP] = useState<P>(EMPTY_PROFILE);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(PROFILE_KEY).then((d) => {
        if (d) setP({ ...EMPTY_PROFILE, ...JSON.parse(d) });
      });
    }, []),
  );

  const b = bmi(p);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <FadeIn>
        <View style={{ alignItems: "center" }}>
          <View>
            <View style={styles.avatar}>
              {p.profileImage ? (
                <Image source={{ uri: p.profileImage }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarText}>{(p.name || "N").charAt(0).toUpperCase()}</Text>
              )}
            </View>
            <Press style={styles.editBadge} onPress={() => router.push("/edit-profile")}>
              <Ionicons name="pencil" size={13} color={C.text} />
            </Press>
          </View>
          <Text style={styles.name}>{p.name || "Your profile"}</Text>
          <Text style={styles.sub}>
            {p.gender ? `${p.gender} · ${p.age} years` : "Add your details to personalize NutriX"}
          </Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <Chip label={p.goal || "Stay Fit"} />
            {b && <Chip label={`BMI ${b.value}`} color={C.amber} />}
          </View>
        </View>
      </FadeIn>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 22 }}>
        {[
          { label: "Weight", value: p.weight, unit: "kg" },
          { label: "Height", value: p.height, unit: "cm" },
        ].map((s, i) => (
          <FadeIn key={s.label} delay={100 + i * 70} style={{ flex: 1 }}>
            <Card>
              <Text style={{ color: C.sub, fontSize: 11 }}>{s.label}</Text>
              <Text style={styles.statValue}>
                {s.value || "--"}
                <Text style={{ color: C.sub, fontSize: 12 }}> {s.unit}</Text>
              </Text>
            </Card>
          </FadeIn>
        ))}
      </View>

      <FadeIn delay={220}>
        <Card style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.rowTitle}>BMI status</Text>
            <Text style={{ color: C.mint, fontWeight: "800" }}>
              {b ? b.label : "Add height & weight"}
            </Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <Progress value={b ? Math.min(100, (b.value / 40) * 100) : 0} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
            {["Under", "Normal", "Over", "Obese"].map((l) => (
              <Text key={l} style={{ color: C.sub, fontSize: 10 }}>
                {l}
              </Text>
            ))}
          </View>
        </Card>
      </FadeIn>

      <SectionTitle>Weekly activity</SectionTitle>
      <FadeIn delay={300}>
        <Card style={{ flexDirection: "row", alignItems: "flex-end", height: 140, gap: 8 }}>
          {[62, 48, 80, 55, 92, 70, 40].map((h, i) => (
            <View key={i} style={{ flex: 1, alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  height: h,
                  borderRadius: 99,
                  backgroundColor: i === 4 ? C.mint : C.surface2,
                }}
              />
              <Text style={{ color: C.sub, fontSize: 9, marginTop: 6 }}>
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </Text>
            </View>
          ))}
        </Card>
      </FadeIn>

      <SectionTitle>Settings</SectionTitle>
      <FadeIn delay={360}>
        <Card style={{ padding: 0 }}>
          {[
            { icon: "create-outline", label: "Edit profile", to: "/edit-profile" },
            { icon: "notifications-outline", label: "Reminders" },
            { icon: "shield-checkmark-outline", label: "Privacy" },
            { icon: "help-circle-outline", label: "Help & support" },
          ].map((row, i, arr) => (
            <Press
              key={row.label}
              onPress={() => row.to && router.push(row.to as never)}
              style={[styles.settingRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}
            >
              <Ionicons name={row.icon as never} size={17} color={C.sub} />
              <Text style={{ color: C.text, fontSize: 14, fontWeight: "700", flex: 1 }}>
                {row.label}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={C.sub} />
            </Press>
          ))}
        </Card>
      </FadeIn>

      <Press style={styles.logout} onPress={() => router.replace("/login")}>
        <Text style={{ color: C.danger, fontWeight: "800", textAlign: "center" }}>Log out</Text>
      </Press>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
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
  avatarImg: { width: "100%", height: "100%" },
  avatarText: { color: C.mintDark, fontSize: 34, fontWeight: "800" },
  editBadge: {
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
  name: { color: C.text, fontSize: 20, fontWeight: "800", marginTop: 16 },
  sub: { color: C.sub, fontSize: 12, marginTop: 4 },
  statValue: { color: C.text, fontSize: 24, fontWeight: "800", marginTop: 4 },
  rowTitle: { color: C.text, fontSize: 14, fontWeight: "800" },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  logout: {
    marginTop: 14,
    borderRadius: R.md,
    paddingVertical: 15,
    backgroundColor: tintBg(C.danger, "22"),
  },
});
