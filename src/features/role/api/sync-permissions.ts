import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

/** 同步内置权限码到目录（ADMIN-V1-11，幂等） */
export function syncPermissions(): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.PERMISSIONS_SYNC, { method: "POST" });
}
