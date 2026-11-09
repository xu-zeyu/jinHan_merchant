import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { AccountStatusRequest } from "../types/account.types";

/** 启用/停用管理员账号（ADMIN-V1-07，停用会使该账号全部旧会话失效） */
export function updateAccountStatus(
  id: number,
  payload: AccountStatusRequest
): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.ACCOUNT_STATUS(id), {
    method: "PUT",
    body: payload,
  });
}
