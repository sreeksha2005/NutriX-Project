import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BrandHeader, Card, Field, Press, PrimaryButton, Screen } from "@/components/ui";
import { colors, radius } from "@/theme";

type Reminder = { id: string; title: string; time: string; enabled: boolean };

const KEY = "nutrix.reminders";
const DEFAULTS: Reminder[] = [
  { id: "1", title: "Drink water", time: "10:00", enabled: true },
  { id: "2", title: "Log lunch", time: "13:30", enabled: true },
];
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/** In-app reminder list (stored on device). Push notifications can hook in later. */
export function RemindersScreen() {
  const [items, setItems] = useState<Reminder[]>([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => setItems(raw ? JSON.parse(raw) : DEFAULTS)).catch(() => setItems(DEFAULTS));
  }, []);

  const save = (next: Reminder[]) => {
    setItems(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  };

  const submit = () => {
    if (!title.trim()) return setError("Enter a reminder title.");
    if (!TIME_RE.test(time.trim())) return setError("Enter time as HH:MM (24-hour), e.g. 08:30.");
    setError(null);
    if (editing) {
      save(items.map((r) => (r.id === editing ? { ...r, title: title.trim(), time: time.trim() } : r)));
    } else {
      save([...items, { id: String(Date.now()), title: title.trim(), time: time.trim(), enabled: true }]);
    }
    setTitle("");
    setTime("");
    setEditing(null);
  };

  const startEdit = (r: Reminder) => {
    setEditing(r.id);
    setTitle(r.title);
    setTime(r.time);
  };

  return (
    <Screen padBottom={40}>
      <BrandHeader />
      <Press style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={18} color={colors.text} />
      </Press>
      <Text style={styles.title}>Reminders</Text>
      <Text style={styles.subtitle}>Keep track of meals and water through the day.</Text>

      <Card style={{ marginTop: 18 }}>
        <Field label="Title" value={title} onChangeText={setTitle} placeholder="e.g. Eat breakfast" />
        <Field label="Time (HH:MM)" value={time} onChangeText={setTime} placeholder="08:30" keyboardType="numbers-and-punctuation" />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton title={editing ? "Save reminder" : "Add reminder"} onPress={submit} />
      </Card>

      <View style={{ marginTop: 18, gap: 10 }}>
        {items.length === 0 ? <Text style={styles.subtitle}>No reminders yet.</Text> : null}
        {items.map((r) => (
          <Card key={r.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{r.title}</Text>
              <Text style={styles.rowTime}>{r.time}</Text>
            </View>
            <Switch
              value={r.enabled}
              onValueChange={(v) => save(items.map((x) => (x.id === r.id ? { ...x, enabled: v } : x)))}
              trackColor={{ true: colors.mint, false: colors.surface2 }}
            />
            <Press onPress={() => startEdit(r)} style={styles.iconBtn}>
              <Ionicons name="create-outline" size={17} color={colors.sub} />
            </Press>
            <Press onPress={() => save(items.filter((x) => x.id !== r.id))} style={styles.iconBtn}>
              <Ionicons name="trash-outline" size={17} color={colors.danger} />
            </Press>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.surface,
    alignItems: "center", justifyContent: "center", marginBottom: 14,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: "800" },
  subtitle: { color: colors.sub, fontSize: 13, marginTop: 4 },
  error: { color: colors.danger, fontSize: 12, fontWeight: "600", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 12 },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: "800" },
  rowTime: { color: colors.sub, fontSize: 12, marginTop: 2 },
  iconBtn: { padding: 6 },
});
