import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { C, R, shadow, tintBg } from "../../theme";
import { Card, Chip, FadeIn, Press, Progress, Ring, SectionTitle } from "../../components/ui";
import { EMPTY_PROFILE, MEALS, PROFILE_KEY, type Profile } from "../../data";

const CONSUMED = 1460;
const GOAL = 1800;

export default function Home() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(PROFILE_KEY).then((d) => {
        if (d) setProfile({ ...EMPTY_PROFILE, ...JSON.parse(d) });
      });
    }, []),
  );

  const pct = Math.round((CONSUMED / GOAL) * 100);
  const firstName = profile.name ? profile.name.split(" ")[0] : "Welcome back";

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <FadeIn>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>👋 Good morning</Text>
            <Text style={styles.name} numberOfLines={1}>
              {firstName}
            </Text>
          </View>
          <Press style={styles.avatar} onPress={() => router.push("/(tabs)/profile")}>
            <Text style={styles.avatarText}>{(profile.name || "N").charAt(0).toUpperCase()}</Text>
          </Press>
        </View>
      </FadeIn>

      <FadeIn delay={80}>
        <Card style={styles.hero}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Ring value={pct} label={`${pct}%`} sub={`${CONSUMED} kcal`} />
            <View style={{ flex: 1 }}>
              <Chip label="Daily goal" />
              <Text style={styles.heroValue}>{GOAL} kcal</Text>
              <Text style={styles.heroSub}>{GOAL - CONSUMED} kcal left · on track</Text>
              <Press style={styles.heroBtn} onPress={() => router.push("/(tabs)/detect")}>
                <Text style={styles.heroBtnText}>Start analysis →</Text>
              </Press>
            </View>
          </View>
        </Card>
      </FadeIn>

      <View style={styles.statRow}>
        {[
          { icon: "flame", label: "Burned", value: "410", unit: "kcal", color: C.amber, p: 62 },
          { icon: "water", label: "Water", value: "2.5", unit: "L", color: C.sky, p: 83 },
          { icon: "footsteps", label: "Steps", value: "6.2", unit: "k", color: C.berry, p: 54 },
        ].map((s, i) => (
          <FadeIn key={s.label} delay={140 + i * 70} style={{ flex: 1 }}>
            <Card style={{ padding: 12 }}>
              <Ionicons name={s.icon as never} size={16} color={s.color} />
              <Text style={styles.statValue}>
                {s.value}
                <Text style={styles.statUnit}> {s.unit}</Text>
              </Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Progress value={s.p} color={s.color} />
            </Card>
          </FadeIn>
        ))}
      </View>

      <SectionTitle>Quick actions</SectionTitle>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {[
          { icon: "camera-outline", title: "Detect food", sub: "Snap & analyze", color: C.mint, to: "/(tabs)/detect" },
          { icon: "restaurant-outline", title: "Diet plan", sub: "4 balanced meals", color: C.amber, to: "/(tabs)/diet" },
        ].map((a, i) => (
          <FadeIn key={a.title} delay={340 + i * 80} style={{ flex: 1 }}>
            <Press style={[styles.action, { borderColor: tintBg(a.color, "55") }]} onPress={() => router.push(a.to as never)}>
              <View style={[styles.actionIcon, { backgroundColor: tintBg(a.color) }]}>
                <Ionicons name={a.icon as never} size={20} color={a.color} />
              </View>
              <Text style={styles.actionTitle}>{a.title}</Text>
              <Text style={styles.actionSub}>{a.sub}</Text>
            </Press>
          </FadeIn>
        ))}
      </View>

      <SectionTitle>Up next</SectionTitle>
      {MEALS.slice(1, 3).map((m, i) => (
        <FadeIn key={m.id} delay={460 + i * 80} style={{ marginBottom: 12 }}>
          <Card style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 }}>
            <View style={[styles.mealIcon, { backgroundColor: tintBg(m.tint) }]}>
              <Text style={{ fontSize: 20 }}>{m.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.mealTitle}>{m.title}</Text>
              <Text style={styles.mealFood}>{m.food}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.mealKcal}>{m.kcal}</Text>
              <Text style={styles.mealTime}>{m.time}</Text>
            </View>
          </Card>
        </FadeIn>
      ))}

      <SectionTitle>Today's tip</SectionTitle>
      <FadeIn delay={620}>
        <Card style={{ flexDirection: "row", gap: 12 }}>
          <Ionicons name="leaf" size={18} color={C.mint} />
          <Text style={styles.tip}>
            Fill half your plate with vegetables at lunch and dinner — it raises fiber intake and
            keeps your blood sugar steady through the afternoon.
          </Text>
        </Card>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  greeting: { color: C.sub, fontSize: 12, fontWeight: "700" },
  name: { color: C.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: C.mint,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.glow,
  },
  avatarText: { color: C.mintDark, fontSize: 18, fontWeight: "800" },
  hero: { marginTop: 22, backgroundColor: "#16302A" },
  heroValue: { color: C.text, fontSize: 20, fontWeight: "800", marginTop: 8 },
  heroSub: { color: C.sub, fontSize: 11, marginTop: 4 },
  heroBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  heroBtnText: { color: C.text, fontSize: 12, fontWeight: "800" },
  statRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  statValue: { color: C.text, fontSize: 18, fontWeight: "800", marginTop: 8 },
  statUnit: { color: C.sub, fontSize: 10, fontWeight: "700" },
  statLabel: { color: C.sub, fontSize: 10, marginBottom: 8 },
  action: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    padding: 16,
    ...shadow.card,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionTitle: { color: C.text, fontSize: 14, fontWeight: "800" },
  actionSub: { color: C.sub, fontSize: 11, marginTop: 2 },
  mealIcon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  mealTitle: { color: C.text, fontSize: 14, fontWeight: "800" },
  mealFood: { color: C.sub, fontSize: 12, marginTop: 2 },
  mealKcal: { color: C.text, fontSize: 14, fontWeight: "800" },
  mealTime: { color: C.sub, fontSize: 10 },
  tip: { color: C.sub, fontSize: 12, lineHeight: 19, flex: 1 },
});
