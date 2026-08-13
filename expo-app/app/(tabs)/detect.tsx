import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { C, R, shadow, tintBg } from "../../theme";
import { Card, FadeIn, Press, SectionTitle } from "../../components/ui";
import { DETECTABLE } from "../../data";

export default function Detect() {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  // Scanning sweep line
  const sweep = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!scanning) return;
    const loop = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [scanning, sweep]);

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
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const analyze = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      router.push("/result");
    }, 1800);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <FadeIn>
        <Text style={styles.title}>Food detection</Text>
        <Text style={styles.sub}>Upload a photo and NutriX analyzes its nutrition.</Text>
      </FadeIn>

      <FadeIn delay={80}>
        <Press style={styles.uploadBox} onPress={() => !image && pickImage()}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.preview} />
              {scanning && (
                <Animated.View
                  style={[
                    styles.sweep,
                    {
                      transform: [
                        { translateY: sweep.interpolate({ inputRange: [0, 1], outputRange: [0, 250] }) },
                      ],
                    },
                  ]}
                />
              )}
              <Press style={styles.clear} onPress={() => setImage(null)}>
                <Ionicons name="close" size={16} color={C.text} />
              </Press>
            </>
          ) : (
            <View style={{ alignItems: "center", paddingHorizontal: 30 }}>
              <View style={styles.uploadIcon}>
                <Ionicons name="image-outline" size={28} color={C.mint} />
              </View>
              <Text style={styles.uploadTitle}>Upload food image</Text>
              <Text style={styles.uploadSub}>JPG or PNG · camera or gallery</Text>
            </View>
          )}
        </Press>
      </FadeIn>

      <Press style={[styles.cta, !image && { backgroundColor: C.surface2 }]} onPress={analyze} disabled={!image || scanning}>
        {scanning ? (
          <ActivityIndicator color={C.mintDark} />
        ) : (
          <Text style={[styles.ctaText, !image && { color: C.sub }]}>✨ Analyze nutrition</Text>
        )}
      </Press>

      <SectionTitle>What NutriX can detect</SectionTitle>
      <View style={styles.grid}>
        {DETECTABLE.map((f, i) => (
          <FadeIn key={f.label} delay={220 + i * 60} style={{ width: "31%" }}>
            <Card style={{ alignItems: "center", padding: 12 }}>
              <Text style={{ fontSize: 22 }}>{f.emoji}</Text>
              <Text style={styles.foodLabel}>{f.label}</Text>
            </Card>
          </FadeIn>
        ))}
      </View>

      <SectionTitle>Tips for a better scan</SectionTitle>
      <FadeIn delay={620}>
        <Card>
          {[
            "Shoot from directly above the plate.",
            "Use natural light — avoid heavy shadows.",
            "Keep one dish per photo for best accuracy.",
          ].map((t) => (
            <Text key={t} style={styles.tip}>
              <Text style={{ color: C.mint }}>• </Text>
              {t}
            </Text>
          ))}
        </Card>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
  title: { color: C.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  sub: { color: C.sub, fontSize: 13, marginTop: 6 },
  uploadBox: {
    height: 250,
    marginTop: 22,
    borderRadius: R.xl,
    backgroundColor: C.surface,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: tintBg(C.mint, "66"),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  preview: { width: "100%", height: "100%" },
  sweep: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: C.mint,
    opacity: 0.85,
  },
  clear: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIcon: {
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: tintBg(C.mint),
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: { color: C.text, fontSize: 16, fontWeight: "800", marginTop: 14 },
  uploadSub: { color: C.sub, fontSize: 11, marginTop: 4 },
  cta: {
    marginTop: 14,
    backgroundColor: C.mint,
    borderRadius: R.md,
    paddingVertical: 16,
    ...shadow.glow,
  },
  ctaText: { color: C.mintDark, textAlign: "center", fontWeight: "800", fontSize: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" },
  foodLabel: { color: C.sub, fontSize: 11, fontWeight: "700", marginTop: 6 },
  tip: { color: C.sub, fontSize: 12, lineHeight: 20 },
});
