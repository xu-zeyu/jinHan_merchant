import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { MeResponse } from "../types/auth.types";

/** 获取当前管理员信息、角色与权限码（ADMIN-V1-03） */
export function getMe(): Promise<MeResponse> {
  return apiRequest<MeResponse>(API_ENDPOINTS.ME);
}
