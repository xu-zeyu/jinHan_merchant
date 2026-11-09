import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { UserStatusRequest } from "../types/user.types";

/** 封禁/解封 C 端用户（ADMIN-V1-12，封禁后该用户小程序 token 失效且登录被拒） */
export function updateUserStatus(
  id: string,
  payload: UserStatusRequest
): Promise<void> {
  return apiRequest<void>(API_ENDPOINTS.USER_STATUS(id), {
    method: "PUT",
    body: payload,
  });
}
