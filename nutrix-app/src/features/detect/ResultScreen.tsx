import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Card, Chip, FadeIn, Press, Progress, Screen, SectionTitle } from "@/components/ui";
import { colors, radius, shadow, tint } from "@/theme";
import type { DetectionResult } from "@/types";

function parse(payload?: string): DetectionResult | null {
  if (!payload) return null;
  try {
    return JSON.parse(payload) as DetectionResult;
  } catch {
    return null;
  }
}

export function ResultScreen() {
  const { payload } = useLocalSearchParams<{ payload?: string }>();
  const result = parse(payload);

  if (!result) {
    return (
      <Screen padBottom={40}>
        <Text style={styles.title}>No result</Text>
        <Text style={styles.subtitle}>Run a scan from the Detect tab first.</Text>
        <Press style={styles.cta} onPress={() => router.replace("/(tabs)/detect")}>
          <Text style={styles.ctaText}>Go to Detect</Text>
        </Press>
      </Screen>
    );
  }

  return (
    <Screen padBottom={40}>
      <FadeIn>
        <Press style={styles.back} onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={18} color={colors.text} />
        </Press>
        <Chip label={`${result.confidence}% confidence`} />
        <Text style={styles.title}>{result.name}</Text>
        <Text style={styles.subtitle}>{result.serving}</Text>
      </FadeIn>

      <FadeIn delay={90}>
        <Card style={{ marginTop: 18, backgroundColor: colors.surfaceMint }}>
          <Text style={styles.kcal}>
            {result.kcal}
            <Text style={styles.kcalUnit}> kcal</Text>
          </Text>
          <Text style={styles.verdict}>{result.verdict}</Text>
        </Card>
      </FadeIn>

      <SectionTitle>Nutrition breakdown</SectionTitle>
      <FadeIn delay={170}>
        <Card style={{ gap: 14 }}>
          {result.macros.map((m) => (
            <View key={m.key}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={styles.macroKey}>{m.key}</Text>
                <Text style={styles.macroVal}>
                  {m.value} {m.unit}
                </Text>
              </View>
              <Progress value={m.pct} color={m.color} />
            </View>
          ))}
        </Card>
      </FadeIn>

      <SectionTitle>Smart tips</SectionTitle>
      {result.tips.map((t, i) => (
        <FadeIn key={t} delay={250 + i * 70} style={{ marginBottom: 10 }}>
          <Card style={{ flexDirection: "row", gap: 12, paddingVertical: 14 }}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb-outline" size={16} color={colors.amber} />
            </View>
            <Text style={styles.tip}>{t}</Text>
          </Card>
        </FadeIn>
      ))}

      <FadeIn delay={520}>
        <Press style={styles.cta} onPress={() => router.replace("/(tabs)/diet")}>
          <Ionicons name="add-circle-outline" size={16} color={colors.mintDark} />
          <Text style={styles.ctaText}>Add to my diary</Text>
        </Press>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5, marginTop: 10 },
  subtitle: { color: colors.sub, fontSize: 12, marginTop: 4 },
  kcal: { color: colors.text, fontSize: 34, fontWeight: "800" },
  kcalUnit: { color: colors.sub, fontSize: 14, fontWeight: "700" },
  verdict: { color: colors.sub, fontSize: 12, marginTop: 6, lineHeight: 18 },
  macroKey: { color: colors.text, fontSize: 12, fontWeight: "800" },
  macroVal: { color: colors.sub, fontSize: 11 },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: tint(colors.amber),
    alignItems: "center",
    justifyContent: "center",
  },
  tip: { color: colors.sub, fontSize: 12, flex: 1, lineHeight: 18 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.mint,
    borderRadius: radius.md,
    paddingVertical: 15,
    marginTop: 20,
    ...shadow.glow,
  },
  ctaText: { color: colors.mintDark, fontSize: 15, fontWeight: "800" },
});
