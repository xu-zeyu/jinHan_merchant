"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { LoaderCircle, ShieldX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/services/api-client";

import { useAuthStore } from "../store/use-auth-store";
import { useMe } from "../hooks/use-me";
import { buildLoginRedirectPath } from "../utils/auth-routing";
import { getRoutePermission } from "../utils/route-permission";

type MainRouteGuardProps = {
  children: ReactNode;
};

/** 主框架守卫：未登录回登录页；强制改密期间只允许改密页 */
export function MainRouteGuard({ children }: MainRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const account = useAuthStore((state) => state.account);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);
  const setAccount = useAuthStore((state) => state.setAccount);
  const meQuery = useMe(hasHydrated && Boolean(token));

  const mustChangePassword = Boolean(meQuery.data?.account.passwordChangeRequired ?? account?.passwordChangeRequired);

  useEffect(() => {
    if (meQuery.data?.account && meQuery.data.account !== account) {
      setAccount(meQuery.data.account);
    }
  }, [meQuery.data, account, setAccount]);

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

  useEffect(() => {
    if (!(meQuery.error instanceof ApiError) || meQuery.error.code !== "401") return;
    queryClient.clear();
    logout();
    router.replace(buildLoginRedirectPath(pathname));
  }, [meQuery.error, logout, queryClient, router, pathname]);

  if (!hasHydrated || !token || meQuery.isPending || (mustChangePassword && pathname !== ROUTES.CHANGE_PASSWORD)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (meQuery.isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-muted-foreground">无法验证当前会话，请检查网络后重试。</p>
        <Button variant="outline" onClick={() => void meQuery.refetch()}>重试</Button>
      </div>
    );
  }

  const required = getRoutePermission(pathname);
  const allowed = meQuery.data?.account.superAdmin || !required || meQuery.data?.permissions.includes(required);
  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <ShieldX className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-lg font-semibold">无权访问此页面</h1>
        <p className="text-sm text-muted-foreground">请联系管理员分配对应权限。</p>
        <Button variant="outline" onClick={() => router.replace(ROUTES.HOME)}>返回首页</Button>
      </div>
    );
  }

  return <>{children}</>;
}
