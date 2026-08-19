import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

export function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}) {
  return (
    <View
      style={{
        width: 54,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? colors.mint : "transparent",
      }}
    >
      <Ionicons name={name} size={20} color={focused ? colors.mintDark : color} />
    </View>
  );
}
