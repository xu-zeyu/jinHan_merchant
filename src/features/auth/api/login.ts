import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { LoginRequest, LoginResponse } from "../types/auth.types";

/** 管理员登录（ADMIN-V1-02） */
export function loginAdmin(payload: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: payload,
  });
}
