"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { useMe } from "@/features/auth/hooks/use-me";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

/** 登录后落地页：按权限跳到第一个可用页面 */
export default function MainPage() {
  const router = useRouter();
  const account = useAuthStore((state) => state.account);
  const { data: me, isError } = useMe();

  useEffect(() => {
    if (isError) {
      router.replace(ROUTES.LOGIN);
      return;
    }
    if (!me && !account?.superAdmin) return;

    const permissions = new Set(me?.permissions ?? []);
    const isSuper = Boolean(account?.superAdmin) || permissions.has(PERMISSION_CODES.SUB_ADMIN);

    if (isSuper || permissions.has(PERMISSION_CODES.USER_READ)) {
      router.replace(ROUTES.USERS);
      return;
    }
    if (permissions.has(PERMISSION_CODES.ACCOUNT_READ)) {
      router.replace(ROUTES.ACCOUNTS);
      return;
    }
    if (permissions.has(PERMISSION_CODES.ROLE_READ)) {
      router.replace(ROUTES.ROLES);
      return;
    }
    if (me) {
      router.replace(ROUTES.USERS);
    }
  }, [me, account, isError, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
    </div>
  );
}
