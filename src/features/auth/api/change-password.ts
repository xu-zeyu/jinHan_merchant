import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { ChangePasswordRequest } from "../types/auth.types";

/** 修改本人密码（ADMIN-V1-08，改密后旧 token 失效需重新登录） */
export function changePassword(
  payload: ChangePasswordRequest
): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.CHANGE_PASSWORD, {
    method: "POST",
    body: payload,
  });
}
