"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import { useAuthStore } from "../store/use-auth-store";
import { getAuthenticatedRedirectPath } from "../utils/auth-routing";

type AuthPageGuardProps = {
  children: ReactNode;
};

/** 登录页守卫：已登录则跳离（强制改密期间跳改密页） */
export function AuthPageGuard({ children }: AuthPageGuardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");
  const token = useAuthStore((state) => state.token);
  const account = useAuthStore((state) => state.account);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated || !token) return;
    if (account?.passwordChangeRequired) {
      router.replace(ROUTES.CHANGE_PASSWORD);
      return;
    }
    router.replace(getAuthenticatedRedirectPath(redirectTarget));
  }, [hasHydrated, token, account, redirectTarget, router]);

  if (hasHydrated && token) {
    return null;
  }

  return <>{children}</>;
}
