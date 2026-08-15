import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { EMPTY_PROFILE, profileService } from "@/services/profileService";
import { calcBmi, calcCalorieGoal } from "@/utils/nutrition";
import type { BmiResult, Profile } from "@/types";

type ProfileContextValue = {
  profile: Profile;
  loading: boolean;
  bmi: BmiResult | null;
  calorieGoal: number;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.load().then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, []);

  const updateProfile = useCallback(async (patch: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      void profileService.save(next);
      return next;
    });
  }, []);

  const signOut = useCallback(async () => {
    await profileService.clear();
    setProfile(EMPTY_PROFILE);
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      loading,
      bmi: calcBmi(profile),
      calorieGoal: calcCalorieGoal(profile),
      updateProfile,
      signOut,
    }),
    [profile, loading, updateProfile, signOut],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside <ProfileProvider>");
  return ctx;
}
