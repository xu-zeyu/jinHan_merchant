import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { AdminRole, UpdateRoleRequest } from "../types/role.types";

/** 编辑角色（ADMIN-V1-09） */
export function updateRole(
  id: number,
  payload: UpdateRoleRequest
): Promise<AdminRole> {
  return apiRequest<AdminRole>(API_ENDPOINTS.ROLE(id), {
    method: "PUT",
    body: payload,
  });
}
