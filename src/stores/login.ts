import { create } from "zustand";
import { persist } from "zustand/middleware";

type Info = Record<string, any> | null;

interface LoginState {
  userInfo: Info;
  setUserInfo: (info: Info) => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set(() => ({ userInfo: info })),
    }),
    {
      name: "userInfo",
    }
  )
);

export default useLoginStore;
