import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { C } from "../../theme";

function Icon({
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
        backgroundColor: focused ? C.mint : "transparent",
      }}
    >
      <Ionicons name={name} size={20} color={focused ? C.mintDark : color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.mintDark,
        tabBarInactiveTintColor: C.sub,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700", marginTop: 2 },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Platform.OS === "ios" ? 24 : 16,
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 26,
          backgroundColor: C.surface,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: C.border,
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 12 },
          elevation: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <Icon name="home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="detect"
        options={{
          title: "Detect",
          tabBarIcon: ({ color, focused }) => <Icon name="camera" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: "Diet",
          tabBarIcon: ({ color, focused }) => (
            <Icon name="restaurant" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => <Icon name="person" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
