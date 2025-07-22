import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePeriodStore = create(
  persist(
    (set) => ({
      isPeriodOpen: false,
      togglePeriod: () =>
        set((state) => ({ isPeriodOpen: !state.isPeriodOpen })),
      setPeriod: (value) =>
        set({ isPeriodOpen: value }),
    }),
    {
      name: "period-storage", // unique name for localStorage
    }
  )
);