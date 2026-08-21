import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useProfile } from "@/store/ProfileProvider";
import { colors } from "@/theme";

/** Entry gate: returning users go straight to the dashboard. */
export default function Index() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.mint} />
      </View>
    );
  }

  return <Redirect href={profile.name ? "/(tabs)" : "/login"} />;
}
