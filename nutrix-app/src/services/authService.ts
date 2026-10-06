import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Local account store used until the team's backend auth endpoint is ready.
 * Sign-in only succeeds for an account that was actually registered on this
 * device with the same email + password — nothing is faked as valid.
 * Replace these two functions with API calls when the backend is available.
 */
const KEY = "nutrix.account";

type Account = { email: string; password: string };

export async function registerAccount(email: string, password: string): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify({ email: email.trim().toLowerCase(), password }));
}

export async function signInAccount(email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return { ok: false, error: "No account found for this email. Please create an account first." };
  const acc = JSON.parse(raw) as Account;
  if (acc.email !== email.trim().toLowerCase())
    return { ok: false, error: "No account found for this email. Please create an account first." };
  if (acc.password !== password) return { ok: false, error: "Incorrect password." };
  return { ok: true };
}
