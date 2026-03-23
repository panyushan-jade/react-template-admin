import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Info = Record<string, unknown> | null;

interface LoginState {
  userInfo: Info;
  setUserInfo: (info: Info) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set(() => ({ userInfo: info })),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useLoginStore;
