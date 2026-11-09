import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { RolePageResult, RoleQuery } from "../types/role.types";

/** 角色分页查询（ADMIN-V1-09） */
export function getRoles(query: RoleQuery): Promise<RolePageResult> {
  return apiRequest<RolePageResult>(API_ENDPOINTS.ROLES, {
    query: {
      page: query.page,
      size: query.size,
      keyword: query.keyword,
      enabled: query.enabled,
    },
  });
}
