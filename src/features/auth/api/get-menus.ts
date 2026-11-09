import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { MenuItem } from "../types/auth.types";

/** 获取当前管理员可见菜单树（ADMIN-V1-03） */
export function getMenus(): Promise<MenuItem[]> {
  return apiRequest<MenuItem[]>(API_ENDPOINTS.MENUS);
}
