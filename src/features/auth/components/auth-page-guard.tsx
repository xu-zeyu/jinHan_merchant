"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "../store/use-auth-store";
import { getAuthenticatedRedirectPath } from "../utils/auth-routing";

type AuthPageGuardProps = {
  children: ReactNode;
};

export function AuthPageGuard({ children }: AuthPageGuardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace(getAuthenticatedRedirectPath(redirectTarget));
    }
  }, [hasHydrated, isAuthenticated, redirectTarget, router]);

  if (hasHydrated && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
