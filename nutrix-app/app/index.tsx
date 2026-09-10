import { Image, StyleSheet, View } from "react-native";
import { Redirect } from "expo-router";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";

const logo = require("../assets/nutrix-logo.png");

/** Entry gate: returning users go straight to the dashboard. */
export default function Index() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <View style={styles.loading}>
        <Image source={logo} style={styles.logo} resizeMode="cover" accessibilityLabel="NutriX" />
      </View>
    );
  }

  return <Redirect href={profile.name ? "/(tabs)" : "/login"} />;
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: "#A9DFC4", alignItems: "center", justifyContent: "center" },
  logo: { width: 280, height: 280 },
});
