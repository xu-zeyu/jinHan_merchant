"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import { useAuthStore } from "../store/use-auth-store";
import { buildLoginRedirectPath } from "../utils/auth-routing";

type MainRouteGuardProps = {
  children: ReactNode;
};

/** 主框架守卫：未登录回登录页；强制改密期间只允许改密页 */
export function MainRouteGuard({ children }: MainRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const account = useAuthStore((state) => state.account);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const mustChangePassword = Boolean(account?.passwordChangeRequired);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!token) {
      router.replace(buildLoginRedirectPath(pathname));
      return;
    }
    if (mustChangePassword && pathname !== ROUTES.CHANGE_PASSWORD) {
      router.replace(ROUTES.CHANGE_PASSWORD);
    }
  }, [hasHydrated, token, mustChangePassword, pathname, router]);

  if (!hasHydrated || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
