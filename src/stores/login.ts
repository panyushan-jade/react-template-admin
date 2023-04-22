import { create } from "zustand";
import { getLocalStorageItem } from "src/utils/localStorage";

type Info = Record<string, any> | null;

interface LoginState {
  userInfo: Info;
  setUserInfo: (info: Info) => void;
}

const useLoginStore = create<LoginState>((set) => ({
  userInfo: getLocalStorageItem("userInfo"),
  setUserInfo: (info) => set(() => ({ userInfo: info })),
}));

export default useLoginStore;
