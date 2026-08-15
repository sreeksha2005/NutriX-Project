import AsyncStorage from "@react-native-async-storage/async-storage";

/** Thin typed wrapper so screens never touch AsyncStorage directly. */
export const storage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw ? ({ ...(fallback as object), ...JSON.parse(raw) } as T) : fallback;
    } catch {
      return fallback;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage is best-effort */
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
