import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_WATER_GOAL_L, STORAGE_KEYS } from "@/constants/config";
import { MEALS } from "@/constants/meals";
import { storage } from "@/services/storage";

type DiaryState = { eaten: string[]; waterL: number };

const INITIAL: DiaryState = { eaten: ["breakfast"], waterL: 1.5 };

type DiaryContextValue = DiaryState & {
  waterGoalL: number;
  consumedKcal: number;
  macroTotals: { protein: number; carbs: number; fat: number };
  toggleMeal: (id: string) => void;
  addWater: (deltaL: number) => void;
  resetDay: () => void;
};

const DiaryContext = createContext<DiaryContextValue | null>(null);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DiaryState>(INITIAL);

  useEffect(() => {
    storage.get<DiaryState>(STORAGE_KEYS.diary, INITIAL).then(setState);
  }, []);

  const commit = useCallback((next: DiaryState) => {
    setState(next);
    void storage.set(STORAGE_KEYS.diary, next);
  }, []);

  const toggleMeal = useCallback(
    (id: string) =>
      setState((prev) => {
        const eaten = prev.eaten.includes(id)
          ? prev.eaten.filter((m) => m !== id)
          : [...prev.eaten, id];
        const next = { ...prev, eaten };
        void storage.set(STORAGE_KEYS.diary, next);
        return next;
      }),
    [],
  );

  const addWater = useCallback(
    (deltaL: number) =>
      setState((prev) => {
        const waterL = Math.max(0, Math.round((prev.waterL + deltaL) * 10) / 10);
        const next = { ...prev, waterL };
        void storage.set(STORAGE_KEYS.diary, next);
        return next;
      }),
    [],
  );

  const resetDay = useCallback(() => commit(INITIAL), [commit]);

  const value = useMemo<DiaryContextValue>(() => {
    const eatenMeals = MEALS.filter((m) => state.eaten.includes(m.id));
    return {
      ...state,
      waterGoalL: DEFAULT_WATER_GOAL_L,
      consumedKcal: eatenMeals.reduce((sum, m) => sum + m.kcal, 0),
      macroTotals: eatenMeals.reduce(
        (acc, m) => ({
          protein: acc.protein + m.macros.protein,
          carbs: acc.carbs + m.macros.carbs,
          fat: acc.fat + m.macros.fat,
        }),
        { protein: 0, carbs: 0, fat: 0 },
      ),
      toggleMeal,
      addWater,
      resetDay,
    };
  }, [state, toggleMeal, addWater, resetDay]);

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>;
}

export function useDiary() {
  const ctx = useContext(DiaryContext);
  if (!ctx) throw new Error("useDiary must be used inside <DiaryProvider>");
  return ctx;
}
