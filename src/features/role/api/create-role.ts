import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { AdminRole, CreateRoleRequest } from "../types/role.types";

/** 创建角色（ADMIN-V1-09） */
export function createRole(payload: CreateRoleRequest): Promise<AdminRole> {
  return apiRequest<AdminRole>(API_ENDPOINTS.ROLES, {
    method: "POST",
    body: payload,
  });
}
