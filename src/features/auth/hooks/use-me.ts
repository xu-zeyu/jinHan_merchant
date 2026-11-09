"use client";

import { useQuery } from "@tanstack/react-query";

import { getMe } from "../api/get-me";
import { getMenus } from "../api/get-menus";
import type { MeResponse } from "../types/auth.types";

/** 当前管理员信息（含角色与权限码） */
export function useMe(enabled = true) {
  return useQuery<MeResponse>({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    enabled,
  });
}

/** 当前管理员可见菜单树 */
export function useMenus(enabled = true) {
  return useQuery({
    queryKey: ["auth", "menus"],
    queryFn: getMenus,
    enabled,
  });
}
