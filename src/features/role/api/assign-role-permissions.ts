import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { RolePermissionsRequest } from "../types/role.types";

/** 同步角色权限码集合（ADMIN-V1-10，需 system:role:assign-permission） */
export function assignRolePermissions(
  id: number,
  payload: RolePermissionsRequest
): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.ROLE_PERMISSIONS(id), {
    method: "PUT",
    body: payload,
  });
}
