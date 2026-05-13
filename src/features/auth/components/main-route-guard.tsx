"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "../store/use-auth-store";
import { buildLoginRedirectPath } from "../utils/auth-routing";

type MainRouteGuardProps = {
  children: ReactNode;
};

export function MainRouteGuard({ children }: MainRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(buildLoginRedirectPath(pathname));
    }
  }, [hasHydrated, isAuthenticated, pathname, router]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
