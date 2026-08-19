import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Card, FadeIn, Press, Screen, SectionTitle } from "@/components/ui";
import { DETECTABLE } from "@/constants/meals";
import { colors, radius, shadow, tint } from "@/theme";
import { useFoodDetection } from "./useFoodDetection";

/** Sweeping scan line shown while the model runs. */
function ScanSweep() {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(y, {
        toValue: 1,
        duration: 1400,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [y]);

  return (
    <Animated.View
      style={[
        styles.sweep,
        { transform: [{ translateY: y.interpolate({ inputRange: [0, 1], outputRange: [0, 220] }) }] },
      ]}
    />
  );
}

export function DetectScreen() {
  const { image, analyzing, error, pickImage, analyze, reset } = useFoodDetection();

  const onAnalyze = async () => {
    const result = await analyze();
    if (result) {
      router.push({ pathname: "/result", params: { payload: JSON.stringify(result) } });
    }
  };

  return (
    <Screen>
      <FadeIn>
        <Text style={styles.title}>Food detection</Text>
        <Text style={styles.subtitle}>Upload a photo and NutriX analyzes its nutrition.</Text>
      </FadeIn>

      <FadeIn delay={80}>
        <View style={styles.dropzone}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.preview} />
              {analyzing && (
                <>
                  <ScanSweep />
                  <View style={styles.analyzingPill}>
                    <Text style={styles.analyzingText}>Analyzing…</Text>
                  </View>
                </>
              )}
              <Press style={styles.clear} onPress={reset}>
                <Ionicons name="close" size={16} color={colors.text} />
              </Press>
            </>
          ) : (
            <View style={{ alignItems: "center", paddingHorizontal: 24 }}>
              <View style={styles.dropIcon}>
                <Ionicons name="image-outline" size={28} color={colors.mint} />
              </View>
              <Text style={styles.dropTitle}>Upload food image</Text>
              <Text style={styles.dropSub}>JPG or PNG · from camera or gallery</Text>
            </View>
          )}
        </View>
      </FadeIn>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        <Press style={[styles.pickBtn, { flex: 1 }]} onPress={() => pickImage("camera")}>
          <Ionicons name="camera-outline" size={16} color={colors.text} />
          <Text style={styles.pickText}>Camera</Text>
        </Press>
        <Press style={[styles.pickBtn, { flex: 1 }]} onPress={() => pickImage("library")}>
          <Ionicons name="images-outline" size={16} color={colors.text} />
          <Text style={styles.pickText}>Gallery</Text>
        </Press>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <Press style={styles.cta} onPress={onAnalyze} disabled={!image || analyzing}>
        <Ionicons name="sparkles" size={16} color={colors.mintDark} />
        <Text style={styles.ctaText}>{analyzing ? "Analyzing…" : "Analyze nutrition"}</Text>
      </Press>

      <SectionTitle>What NutriX can detect</SectionTitle>
      <View style={styles.grid}>
        {DETECTABLE.map((f, i) => (
          <FadeIn key={f.label} delay={220 + i * 60} style={{ width: "31%" }}>
            <Card style={{ padding: 12, alignItems: "center" }}>
              <Text style={{ fontSize: 22 }}>{f.emoji}</Text>
              <Text style={styles.gridLabel}>{f.label}</Text>
            </Card>
          </FadeIn>
        ))}
      </View>

      <SectionTitle>Tips for a better scan</SectionTitle>
      <FadeIn delay={600}>
        <Card style={{ gap: 8 }}>
          {[
            "Shoot from directly above the plate.",
            "Use natural light — avoid heavy shadows.",
            "Keep one dish per photo for best accuracy.",
          ].map((t) => (
            <View key={t} style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ color: colors.mint }}>•</Text>
              <Text style={styles.tip}>{t}</Text>
            </View>
          ))}
        </Card>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { color: colors.sub, fontSize: 13, marginTop: 4, marginBottom: 20 },
  dropzone: {
    height: 256,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: tint(colors.mint, "55"),
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadow.card,
  },
  preview: { width: "100%", height: "100%" },
  sweep: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.mint,
    opacity: 0.8,
  },
  analyzingPill: {
    position: "absolute",
    bottom: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  analyzingText: { color: colors.text, fontSize: 12, fontWeight: "800" },
  clear: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  dropIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: tint(colors.mint, "22"),
    alignItems: "center",
    justifyContent: "center",
  },
  dropTitle: { color: colors.text, fontSize: 15, fontWeight: "800", marginTop: 14 },
  dropSub: { color: colors.sub, fontSize: 11, marginTop: 4 },
  pickBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
  },
  pickText: { color: colors.text, fontSize: 13, fontWeight: "800" },
  error: { color: colors.danger, fontSize: 12, marginTop: 10 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.mint,
    borderRadius: radius.md,
    paddingVertical: 15,
    marginTop: 12,
    ...shadow.glow,
  },
  ctaText: { color: colors.mintDark, fontSize: 15, fontWeight: "800" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  gridLabel: { color: colors.sub, fontSize: 11, fontWeight: "700", marginTop: 6 },
  tip: { color: colors.sub, fontSize: 12, flex: 1, lineHeight: 18 },
});
