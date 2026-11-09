import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

/** 软删除角色（ADMIN-V1-09，被账号引用时后端拒绝） */
export function deleteRole(id: number): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.ROLE(id), { method: "DELETE" });
}
