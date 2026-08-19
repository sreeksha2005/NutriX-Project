import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Card, Chip, FadeIn, Press, Progress, Screen, SectionTitle } from "@/components/ui";
import { useProfile } from "@/store/ProfileProvider";
import { colors, radius, shadow, tint } from "@/theme";

const WEEK = [
  { d: "M", v: 62 },
  { d: "T", v: 78 },
  { d: "W", v: 45 },
  { d: "T", v: 88 },
  { d: "F", v: 70 },
  { d: "S", v: 94 },
  { d: "S", v: 55 },
];

export function ProfileScreen() {
  const { profile, bmi, calorieGoal, signOut } = useProfile();

  const confirmLogout = () =>
    Alert.alert("Log out", "You will need to sign in again.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/login");
        },
      },
    ]);

  return (
    <Screen>
      <FadeIn>
        <View style={{ alignItems: "center" }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(profile.name || "N").charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{profile.name || "Your name"}</Text>
          <Text style={styles.email}>{profile.email || "Add your details to personalise NutriX"}</Text>
          <View style={{ marginTop: 10 }}>
            <Chip label={profile.goal} />
          </View>
        </View>
      </FadeIn>

      <FadeIn delay={100}>
        <View style={styles.statsRow}>
          {[
            { label: "Age", value: profile.age || "—" },
            { label: "Height", value: profile.height ? `${profile.height} cm` : "—" },
            { label: "Weight", value: profile.weight ? `${profile.weight} kg` : "—" },
          ].map((s) => (
            <Card key={s.label} style={{ flex: 1, padding: 12, alignItems: "center" }}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </Card>
          ))}
        </View>
      </FadeIn>

      <SectionTitle>Body mass index</SectionTitle>
      <FadeIn delay={180}>
        <Card>
          {bmi ? (
            <>
              <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10 }}>
                <Text style={styles.bmi}>{bmi.value}</Text>
                <Text style={[styles.bmiLabel, { color: bmi.color }]}>{bmi.label}</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Progress value={Math.min(100, (bmi.value / 40) * 100)} color={bmi.color} />
              </View>
              <Text style={styles.hint}>Daily calorie target: {calorieGoal} kcal</Text>
            </>
          ) : (
            <Text style={styles.hint}>Add your height and weight to see your BMI.</Text>
          )}
        </Card>
      </FadeIn>

      <SectionTitle>This week</SectionTitle>
      <FadeIn delay={260}>
        <Card>
          <View style={styles.week}>
            {WEEK.map((d) => (
              <View key={d.d} style={{ alignItems: "center", flex: 1, gap: 8 }}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${d.v}%` }]} />
                </View>
                <Text style={styles.barLabel}>{d.d}</Text>
              </View>
            ))}
          </View>
        </Card>
      </FadeIn>

      <SectionTitle>Settings</SectionTitle>
      <FadeIn delay={340}>
        <Card style={{ padding: 6 }}>
          {[
            { icon: "create-outline", label: "Edit profile", onPress: () => router.push("/edit-profile") },
            { icon: "notifications-outline", label: "Reminders", onPress: () => {} },
            { icon: "shield-checkmark-outline", label: "Privacy", onPress: () => {} },
          ].map((row) => (
            <Press key={row.label} style={styles.row} onPress={row.onPress}>
              <View style={styles.rowIcon}>
                <Ionicons name={row.icon as never} size={17} color={colors.mint} />
              </View>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.sub} />
            </Press>
          ))}
        </Card>
      </FadeIn>

      <FadeIn delay={420}>
        <Press style={styles.logout} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={17} color={colors.danger} />
          <Text style={styles.logoutText}>Log out</Text>
        </Press>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 30,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.glow,
  },
  avatarText: { color: colors.mintDark, fontSize: 34, fontWeight: "800" },
  name: { color: colors.text, fontSize: 21, fontWeight: "800", marginTop: 14 },
  email: { color: colors.sub, fontSize: 12, marginTop: 4, textAlign: "center" },
  statsRow: { flexDirection: "row", gap: 12, marginTop: 22 },
  statValue: { color: colors.text, fontSize: 16, fontWeight: "800" },
  statLabel: { color: colors.sub, fontSize: 10, marginTop: 4 },
  bmi: { color: colors.text, fontSize: 32, fontWeight: "800" },
  bmiLabel: { fontSize: 13, fontWeight: "800", marginBottom: 6 },
  hint: { color: colors.sub, fontSize: 11, marginTop: 10 },
  week: { flexDirection: "row", height: 120, alignItems: "flex-end" },
  barTrack: {
    width: 12,
    height: 90,
    borderRadius: radius.pill,
    backgroundColor: colors.surface2,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: { width: "100%", backgroundColor: colors.mint, borderRadius: radius.pill },
  barLabel: { color: colors.sub, fontSize: 10, fontWeight: "700" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: tint(colors.mint),
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { color: colors.text, fontSize: 13, fontWeight: "700", flex: 1 },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 22,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: tint(colors.danger, "44"),
  },
  logoutText: { color: colors.danger, fontSize: 13, fontWeight: "800" },
});
