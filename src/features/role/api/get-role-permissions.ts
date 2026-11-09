import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

/** 查询角色权限码集合（ADMIN-V1-10） */
export function getRolePermissions(id: number): Promise<string[]> {
  return apiRequest<string[]>(API_ENDPOINTS.ROLE_PERMISSIONS(id));
}
