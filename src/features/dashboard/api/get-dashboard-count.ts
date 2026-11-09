import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";
import type { PageResult } from "@/types/api.types";

export type DashboardCountKind = "users" | "accounts" | "roles" | "permissions";

const ENDPOINTS = {
  users: API_ENDPOINTS.USERS,
  accounts: API_ENDPOINTS.ACCOUNTS,
  roles: API_ENDPOINTS.ROLES,
  permissions: API_ENDPOINTS.PERMISSIONS,
} as const;

/** 复用现有列表接口的 total。 */
export async function getDashboardCount(kind: DashboardCountKind): Promise<number> {
  const path = ENDPOINTS[kind];
  if (kind === "permissions") {
    const data = await apiRequest<unknown[]>(path);
    return data.length;
  }
  const data = await apiRequest<PageResult<unknown>>(path, {
    query: { page: 1, size: 1 },
  });
  return data.total;
}
