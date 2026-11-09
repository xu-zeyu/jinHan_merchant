import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

/** 软删除管理员账号（ADMIN-V1-07） */
export function deleteAccount(id: number): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.ACCOUNT(id), { method: "DELETE" });
}
