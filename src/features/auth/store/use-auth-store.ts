"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { setAccessToken } from "@/services/api-client";

import { AUTH_STORAGE_KEY } from "../constants/auth.constants";
import type { Account } from "../types/auth.types";
import { syncBrowserAuthCookie } from "../utils/auth-cookie";

type AuthStore = {
  token: string | null;
  account: Account | null;
  hasHydrated: boolean;
  /** 登录成功或刷新会话后写入 token 与账号 */
  setSession: (session: { token: string; account: Account }) => void;
  /** me 接口回写账号（如改密标记变更） */
  setAccount: (account: Account) => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

function syncTokenSideEffects(token: string | null) {
  setAccessToken(token);
  syncBrowserAuthCookie(Boolean(token));
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      account: null,
      hasHydrated: false,
      setSession: ({ token, account }) => {
        syncTokenSideEffects(token);
        set({ token, account });
      },
      setAccount: (account) => set({ account }),
      logout: () => {
        syncTokenSideEffects(null);
        set({ token: null, account: null });
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token, account }) => ({ token, account }),
      onRehydrateStorage: () => (state) => {
        syncTokenSideEffects(state?.token ?? null);
        state?.setHasHydrated(true);
      },
    }
  )
);
