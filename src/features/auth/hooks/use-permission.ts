"use client";

import { useMe } from "./use-me";
import { useAuthStore } from "../store/use-auth-store";

/**
 * 权限码判断（ADMIN-V1-03）。
 * 超级管理员放行一切；其余按 me 返回的权限码集合判断。
 */
export function useHasPermission(code: string): boolean {
  const account = useAuthStore((state) => state.account);
  const { data: me } = useMe();

  if (account?.superAdmin) {
    return true;
  }
  return me?.permissions.includes(code) ?? false;
}

/** 批量权限判断 */
export function usePermissions(): (code: string) => boolean {
  const account = useAuthStore((state) => state.account);
  const { data: me } = useMe();

  return (code: string) => {
    if (account?.superAdmin) return true;
    return me?.permissions.includes(code) ?? false;
  };
}
