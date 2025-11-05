import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../lib/storage";

interface SessionState {
  email: string | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      email: null,
      isLoggedIn: false,
      login: (email: string) => {
        set({ email, isLoggedIn: true });
      },
      logout: () => {
        set({ email: null, isLoggedIn: false });
      },
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
