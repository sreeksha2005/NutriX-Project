import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C, R, tintBg } from "../../theme";
import { Card, Chip, FadeIn, Press, Progress, SectionTitle } from "../../components/ui";
import { MEALS } from "../../data";

export default function Diet() {
  const [water, setWater] = useState(2.5);
  const [done, setDone] = useState<string[]>(["breakfast"]);

  const total = MEALS.reduce((s, m) => s + m.kcal, 0);
  const eaten = MEALS.filter((m) => done.includes(m.id)).reduce((s, m) => s + m.kcal, 0);

  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <FadeIn>
        <Text style={styles.title}>Today's nutrition</Text>
        <Text style={styles.sub}>Personalized healthy meal plan</Text>
      </FadeIn>

      <FadeIn delay={80}>
        <Card style={{ marginTop: 22 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <View>
              <Chip label="Daily goal" color={C.amber} />
              <Text style={styles.big}>
                {eaten}
                <Text style={styles.bigSub}> / {total} kcal</Text>
              </Text>
            </View>
            <Text style={{ color: C.mint, fontSize: 18, fontWeight: "800" }}>
              {Math.round((eaten / total) * 100)}%
            </Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <Progress value={(eaten / total) * 100} />
          </View>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
            {[
              { k: "Protein", v: "58 g", c: C.mint },
              { k: "Carbs", v: "188 g", c: C.amber },
              { k: "Fat", v: "43 g", c: C.berry },
            ].map((m) => (
              <View key={m.k} style={styles.macro}>
                <Text style={{ color: m.c, fontWeight: "800", fontSize: 14 }}>{m.v}</Text>
                <Text style={{ color: C.sub, fontSize: 10 }}>{m.k}</Text>
              </View>
            ))}
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={150}>
        <Card style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View style={[styles.icon, { backgroundColor: tintBg(C.sky) }]}>
            <Ionicons name="water" size={20} color={C.sky} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Water intake</Text>
            <Text style={styles.rowSub}>{water.toFixed(1)} / 3.0 L</Text>
            <Progress value={(water / 3) * 100} color={C.sky} />
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Press style={styles.stepBtn} onPress={() => setWater((w) => Math.max(0, +(w - 0.25).toFixed(2)))}>
              <Ionicons name="remove" size={16} color={C.text} />
            </Press>
            <Press
              style={[styles.stepBtn, { backgroundColor: tintBg(C.sky, "44") }]}
              onPress={() => setWater((w) => Math.min(3, +(w + 0.25).toFixed(2)))}
            >
              <Ionicons name="add" size={16} color={C.text} />
            </Press>
          </View>
        </Card>
      </FadeIn>

      <SectionTitle>Meal plan</SectionTitle>
      {MEALS.map((m, i) => {
        const isDone = done.includes(m.id);
        return (
          <FadeIn key={m.id} delay={230 + i * 80} style={{ marginBottom: 12 }}>
            <Press onPress={() => toggle(m.id)}>
              <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={[styles.icon, { backgroundColor: tintBg(m.tint) }]}>
                  <Text style={{ fontSize: 22 }}>{m.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text style={styles.rowTitle}>{m.title}</Text>
                    <Text style={{ color: C.sub, fontSize: 10 }}>{m.time}</Text>
                  </View>
                  <Text style={styles.rowSub}>{m.food}</Text>
                  <Text style={{ color: C.sub, fontSize: 10 }}>
                    P {m.macros.p}g · C {m.macros.c}g · F {m.macros.f}g
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ color: C.text, fontWeight: "800" }}>{m.kcal}</Text>
                  <Text style={{ color: C.sub, fontSize: 10 }}>kcal</Text>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: isDone ? tintBg(C.mint) : C.surface2 },
                    ]}
                  >
                    <Text style={{ color: isDone ? C.mint : C.sub, fontSize: 9, fontWeight: "800" }}>
                      {isDone ? "Eaten" : "Mark"}
                    </Text>
                  </View>
                </View>
              </Card>
            </Press>
          </FadeIn>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
  title: { color: C.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  sub: { color: C.sub, fontSize: 13, marginTop: 6 },
  big: { color: C.text, fontSize: 28, fontWeight: "800", marginTop: 8 },
  bigSub: { color: C.sub, fontSize: 14, fontWeight: "700" },
  macro: { flex: 1, backgroundColor: C.surface2, borderRadius: R.md, padding: 12, alignItems: "center" },
  icon: { width: 46, height: 46, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  rowTitle: { color: C.text, fontSize: 14, fontWeight: "800" },
  rowSub: { color: C.sub, fontSize: 12, marginVertical: 4 },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: { marginTop: 6, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 3 },
});
