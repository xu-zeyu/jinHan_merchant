"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AUTH_STORAGE_KEY } from "../constants/auth.constants";
import type { AuthSession } from "../types/auth.types";
import {
  readAuthCookieFromDocument,
  syncBrowserAuthCookie,
} from "../utils/auth-cookie";

type AuthStore = AuthSession & {
  hasHydrated: boolean;
  login: () => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  syncSession: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasHydrated: false,
      login: () => {
        syncBrowserAuthCookie(true);
        set({ isAuthenticated: true });
      },
      logout: () => {
        syncBrowserAuthCookie(false);
        set({ isAuthenticated: false });
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      syncSession: () => set({ isAuthenticated: readAuthCookieFromDocument() }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ isAuthenticated }) => ({ isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.syncSession();
        state?.setHasHydrated(true);
      },
    }
  )
);
