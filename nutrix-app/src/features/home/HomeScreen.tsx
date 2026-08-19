import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Card, Chip, FadeIn, Press, Progress, Ring, Screen, SectionTitle } from "@/components/ui";
import { DAILY_TIPS, MEALS } from "@/constants/meals";
import { useDiary } from "@/store/DiaryProvider";
import { useProfile } from "@/store/ProfileProvider";
import { colors, radius, shadow, tint } from "@/theme";
import { firstName, pct } from "@/utils/nutrition";

export function HomeScreen() {
  const { profile, calorieGoal } = useProfile();
  const { consumedKcal, waterL, waterGoalL, eaten } = useDiary();

  const progress = pct(consumedKcal, calorieGoal);
  const left = Math.max(0, calorieGoal - consumedKcal);
  const upNext = MEALS.filter((m) => !eaten.includes(m.id)).slice(0, 2);

  const stats = [
    { icon: "flame", label: "Burned", value: "410", unit: "kcal", color: colors.amber, p: 62 },
    {
      icon: "water",
      label: "Water",
      value: `${waterL}`,
      unit: "L",
      color: colors.sky,
      p: pct(waterL, waterGoalL),
    },
    { icon: "footsteps", label: "Steps", value: "6.2", unit: "k", color: colors.berry, p: 54 },
  ] as const;

  return (
    <Screen>
      <FadeIn>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>👋 Good morning</Text>
            <Text style={styles.name} numberOfLines={1}>
              {firstName(profile.name)}
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
            <Ring value={progress} label={`${progress}%`} sub={`${consumedKcal} kcal`} />
            <View style={{ flex: 1 }}>
              <Chip label="Daily goal" />
              <Text style={styles.heroValue}>{calorieGoal} kcal</Text>
              <Text style={styles.heroSub}>{left} kcal left · on track</Text>
              <Press style={styles.heroBtn} onPress={() => router.push("/(tabs)/detect")}>
                <Text style={styles.heroBtnText}>Start analysis →</Text>
              </Press>
            </View>
          </View>
        </Card>
      </FadeIn>

      <View style={styles.statRow}>
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={140 + i * 70} style={{ flex: 1 }}>
            <Card style={{ padding: 12 }}>
              <Ionicons name={s.icon} size={16} color={s.color} />
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
          { icon: "camera-outline", title: "Detect food", sub: "Snap & analyze", color: colors.mint, to: "/(tabs)/detect" },
          { icon: "restaurant-outline", title: "Diet plan", sub: "4 balanced meals", color: colors.amber, to: "/(tabs)/diet" },
        ].map((a, i) => (
          <FadeIn key={a.title} delay={340 + i * 80} style={{ flex: 1 }}>
            <Press
              style={[styles.action, { borderColor: tint(a.color, "55") }]}
              onPress={() => router.push(a.to as never)}
            >
              <View style={[styles.actionIcon, { backgroundColor: tint(a.color) }]}>
                <Ionicons name={a.icon as never} size={20} color={a.color} />
              </View>
              <Text style={styles.actionTitle}>{a.title}</Text>
              <Text style={styles.actionSub}>{a.sub}</Text>
            </Press>
          </FadeIn>
        ))}
      </View>

      <SectionTitle>Up next</SectionTitle>
      {upNext.length === 0 ? (
        <FadeIn delay={460}>
          <Card>
            <Text style={styles.tip}>All meals logged for today — nice work! 🎉</Text>
          </Card>
        </FadeIn>
      ) : (
        upNext.map((m, i) => (
          <FadeIn key={m.id} delay={460 + i * 80} style={{ marginBottom: 12 }}>
            <Card style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 }}>
              <View style={[styles.mealIcon, { backgroundColor: tint(m.tint) }]}>
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
        ))
      )}

      <SectionTitle>Today&apos;s tip</SectionTitle>
      <FadeIn delay={620}>
        <Card style={{ flexDirection: "row", gap: 12 }}>
          <Ionicons name="leaf" size={18} color={colors.mint} />
          <Text style={styles.tip}>{DAILY_TIPS[0]}</Text>
        </Card>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  greeting: { color: colors.sub, fontSize: 12, fontWeight: "700" },
  name: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.glow,
  },
  avatarText: { color: colors.mintDark, fontSize: 18, fontWeight: "800" },
  hero: { marginTop: 22, backgroundColor: colors.surfaceMint },
  heroValue: { color: colors.text, fontSize: 20, fontWeight: "800", marginTop: 8 },
  heroSub: { color: colors.sub, fontSize: 11, marginTop: 4 },
  heroBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  heroBtnText: { color: colors.text, fontSize: 12, fontWeight: "800" },
  statRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  statValue: { color: colors.text, fontSize: 18, fontWeight: "800", marginTop: 8 },
  statUnit: { color: colors.sub, fontSize: 10, fontWeight: "700" },
  statLabel: { color: colors.sub, fontSize: 10, marginBottom: 8 },
  action: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
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
  actionTitle: { color: colors.text, fontSize: 14, fontWeight: "800" },
  actionSub: { color: colors.sub, fontSize: 11, marginTop: 2 },
  mealIcon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  mealTitle: { color: colors.text, fontSize: 14, fontWeight: "800" },
  mealFood: { color: colors.sub, fontSize: 12, marginTop: 2 },
  mealKcal: { color: colors.text, fontSize: 14, fontWeight: "800" },
  mealTime: { color: colors.sub, fontSize: 10 },
  tip: { color: colors.sub, fontSize: 12, lineHeight: 19, flex: 1 },
});
