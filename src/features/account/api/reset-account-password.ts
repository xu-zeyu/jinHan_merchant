import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { ResetPasswordRequest } from "../types/account.types";

/** 重置管理员密码（ADMIN-V1-08，重置后目标账号下次登录须改密并被踢出会话） */
export function resetAccountPassword(
  id: number,
  payload: ResetPasswordRequest
): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.ACCOUNT_RESET_PASSWORD(id), {
    method: "POST",
    body: payload,
  });
}
