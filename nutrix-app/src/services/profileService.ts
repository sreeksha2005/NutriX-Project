import { STORAGE_KEYS } from "@/constants/config";
import type { Profile } from "@/types";
import { storage } from "./storage";

export const EMPTY_PROFILE: Profile = {
  name: "",
  email: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  goal: "Stay Fit",
  profileImage: "",
};

export const profileService = {
  load: () => storage.get<Profile>(STORAGE_KEYS.profile, EMPTY_PROFILE),
  save: (profile: Profile) => storage.set(STORAGE_KEYS.profile, profile),
  clear: () => storage.remove(STORAGE_KEYS.profile),
};
