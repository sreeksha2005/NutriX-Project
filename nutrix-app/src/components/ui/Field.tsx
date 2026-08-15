import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from "react-native";
import { colors, radius } from "@/theme";
import { Press } from "./Press";

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.sub}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  );
}

/** Row of selectable pills — used for gender and goal. */
export function ChipPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <Press
              key={opt}
              onPress={() => onChange(opt)}
              style={[styles.pill, active && { backgroundColor: colors.mint, borderColor: colors.mint }]}
            >
              <Text style={{ color: active ? colors.mintDark : colors.sub, fontSize: 12, fontWeight: "800" }}>
                {opt}
              </Text>
            </Press>
          );
        })}
      </View>
    </View>
  );
}

export function PrimaryButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Press onPress={onPress} disabled={disabled} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Press>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.sub, fontSize: 11, fontWeight: "800", marginBottom: 6 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.mint,
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: colors.mintDark, fontSize: 15, fontWeight: "800" },
});
