import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalState {
  primaryColor: string;
  setColor: (color: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      primaryColor: "#247fff",
      setColor: (color) => set(() => ({ primaryColor: color })),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "primaryColor",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ primaryColor: state.primaryColor }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useGlobalStore;
