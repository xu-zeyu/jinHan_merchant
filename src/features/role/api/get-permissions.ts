import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { AdminPermission } from "../types/role.types";

/** 查询权限点目录（ADMIN-V1-11） */
export function getPermissions(): Promise<AdminPermission[]> {
  return apiRequest<AdminPermission[]>(API_ENDPOINTS.PERMISSIONS);
}
