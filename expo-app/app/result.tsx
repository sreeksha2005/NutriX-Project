import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { C, R, shadow, tintBg } from "../theme";
import { Card, Chip, FadeIn, Press, Progress, Ring, SectionTitle } from "../components/ui";
import { DETECTION_RESULT as D } from "../data";

export default function Result() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Press onPress={() => router.back()}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="arrow-back" size={16} color={C.sub} />
          <Text style={{ color: C.sub, fontWeight: "700" }}>Back</Text>
        </View>
      </Press>

      <FadeIn delay={60}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 18 }}>
          <Ionicons name="checkmark-circle" size={18} color={C.mint} />
          <Chip label={`${D.confidence}% confidence`} />
        </View>
        <Text style={styles.title}>{D.name}</Text>
        <Text style={styles.sub}>{D.serving}</Text>
      </FadeIn>

      <FadeIn delay={160}>
        <Card style={{ marginTop: 22, flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Ring value={D.confidence} label={`${D.kcal}`} sub="kcal" />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Energy estimate</Text>
            <Text style={styles.verdict}>{D.verdict}</Text>
            <Press style={styles.addBtn}>
              <Text style={{ color: C.mintDark, fontWeight: "800", fontSize: 12 }}>
                + Add to diary
              </Text>
            </Press>
          </View>
        </Card>
      </FadeIn>

      <SectionTitle>Macro breakdown</SectionTitle>
      <FadeIn delay={240}>
        <Card>
          {D.macros.map((m) => (
            <View key={m.key} style={{ marginBottom: 14 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ color: C.text, fontSize: 12, fontWeight: "700" }}>{m.key}</Text>
                <Text style={{ color: m.color, fontSize: 12, fontWeight: "800" }}>
                  {m.value}
                  {m.unit}
                </Text>
              </View>
              <Progress value={m.pct} color={m.color} />
            </View>
          ))}
        </Card>
      </FadeIn>

      <SectionTitle>How to make it better</SectionTitle>
      {D.tips.map((t, i) => (
        <FadeIn key={t} delay={520 + i * 80} style={{ marginBottom: 12 }}>
          <Card style={{ flexDirection: "row", gap: 12, paddingVertical: 14 }}>
            <Ionicons name="bulb-outline" size={17} color={C.amber} />
            <Text style={{ color: C.sub, fontSize: 12, lineHeight: 19, flex: 1 }}>{t}</Text>
          </Card>
        </FadeIn>
      ))}

      <Press style={styles.cta} onPress={() => router.replace("/(tabs)/diet")}>
        <Text style={styles.ctaText}>View today's diet plan</Text>
      </Press>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
  title: { color: C.text, fontSize: 24, fontWeight: "800", marginTop: 12, letterSpacing: -0.5 },
  sub: { color: C.sub, fontSize: 12, marginTop: 4 },
  rowTitle: { color: C.text, fontSize: 14, fontWeight: "800" },
  verdict: { color: C.sub, fontSize: 12, lineHeight: 18, marginTop: 4 },
  addBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: C.mint,
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  cta: {
    marginTop: 18,
    backgroundColor: C.mint,
    borderRadius: R.md,
    paddingVertical: 16,
    ...shadow.glow,
  },
  ctaText: { color: C.mintDark, textAlign: "center", fontWeight: "800", fontSize: 16 },
});
