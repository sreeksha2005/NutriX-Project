import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, Chip, FadeIn, Press, Progress, Screen, SectionTitle } from "@/components/ui";
import { MEALS } from "@/constants/meals";
import { useDiary } from "@/store/DiaryProvider";
import { useProfile } from "@/store/ProfileProvider";
import { colors, radius, tint } from "@/theme";
import { pct } from "@/utils/nutrition";

export function DietScreen() {
  const { calorieGoal, profile } = useProfile();
  const { eaten, toggleMeal, waterL, waterGoalL, addWater, consumedKcal, macroTotals } = useDiary();

  const macroSplit = [
    { key: "Protein", value: macroTotals.protein, color: colors.mint, target: 90 },
    { key: "Carbs", value: macroTotals.carbs, color: colors.amber, target: 220 },
    { key: "Fat", value: macroTotals.fat, color: colors.berry, target: 60 },
  ];

  return (
    <Screen>
      <FadeIn>
        <Text style={styles.title}>Your diet plan</Text>
        <Text style={styles.subtitle}>Personalised for your goal: {profile.goal}</Text>
      </FadeIn>

      <FadeIn delay={80}>
        <Card style={{ marginTop: 18, backgroundColor: colors.surfaceMint }}>
          <Chip label="Today" />
          <Text style={styles.total}>
            {consumedKcal}
            <Text style={styles.totalSub}> / {calorieGoal} kcal</Text>
          </Text>
          <View style={{ marginTop: 10 }}>
            <Progress value={pct(consumedKcal, calorieGoal)} />
          </View>
          <Text style={styles.hint}>Tap a meal below to mark it as eaten.</Text>
        </Card>
      </FadeIn>

      <SectionTitle>Meals</SectionTitle>
      {MEALS.map((m, i) => {
        const done = eaten.includes(m.id);
        return (
          <FadeIn key={m.id} delay={160 + i * 70} style={{ marginBottom: 12 }}>
            <Press onPress={() => toggleMeal(m.id)}>
              <Card style={[styles.meal, done && { borderColor: tint(colors.mint, "66") }]}>
                <View style={[styles.mealIcon, { backgroundColor: tint(m.tint) }]}>
                  <Text style={{ fontSize: 20 }}>{m.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.mealTitle}>{m.title}</Text>
                  <Text style={styles.mealFood}>{m.food}</Text>
                  <Text style={styles.mealMacros}>
                    P {m.macros.protein}g · C {m.macros.carbs}g · F {m.macros.fat}g
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <Text style={styles.mealKcal}>{m.kcal}</Text>
                  <Ionicons
                    name={done ? "checkmark-circle" : "ellipse-outline"}
                    size={22}
                    color={done ? colors.mint : colors.sub}
                  />
                </View>
              </Card>
            </Press>
          </FadeIn>
        );
      })}

      <SectionTitle>Water intake</SectionTitle>
      <FadeIn delay={460}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <Press style={styles.stepper} onPress={() => addWater(-0.25)}>
              <Ionicons name="remove" size={18} color={colors.text} />
            </Press>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.waterValue}>
                {waterL}
                <Text style={styles.totalSub}> / {waterGoalL} L</Text>
              </Text>
            </View>
            <Press style={styles.stepper} onPress={() => addWater(0.25)}>
              <Ionicons name="add" size={18} color={colors.text} />
            </Press>
          </View>
          <View style={{ marginTop: 12 }}>
            <Progress value={pct(waterL, waterGoalL)} color={colors.sky} />
          </View>
        </Card>
      </FadeIn>

      <SectionTitle>Macro split</SectionTitle>
      <FadeIn delay={540}>
        <Card style={{ gap: 14 }}>
          {macroSplit.map((m) => (
            <View key={m.key}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={styles.macroKey}>{m.key}</Text>
                <Text style={styles.macroVal}>
                  {m.value} / {m.target} g
                </Text>
              </View>
              <Progress value={pct(m.value, m.target)} color={m.color} />
            </View>
          ))}
        </Card>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { color: colors.sub, fontSize: 13, marginTop: 4 },
  total: { color: colors.text, fontSize: 26, fontWeight: "800", marginTop: 10 },
  totalSub: { color: colors.sub, fontSize: 13, fontWeight: "700" },
  hint: { color: colors.sub, fontSize: 11, marginTop: 10 },
  meal: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14 },
  mealIcon: { width: 46, height: 46, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  mealTitle: { color: colors.text, fontSize: 14, fontWeight: "800" },
  mealFood: { color: colors.sub, fontSize: 12, marginTop: 2 },
  mealMacros: { color: colors.sub, fontSize: 10, marginTop: 4 },
  mealKcal: { color: colors.text, fontSize: 14, fontWeight: "800" },
  stepper: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  waterValue: { color: colors.text, fontSize: 22, fontWeight: "800" },
  macroKey: { color: colors.text, fontSize: 12, fontWeight: "800" },
  macroVal: { color: colors.sub, fontSize: 11 },
});
