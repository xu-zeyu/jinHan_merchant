import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { UserPetsResponse } from "../types/user.types";

/** 查看 C 端用户宠物数据（ADMIN-V1-13，不含健康记录明细与敏感字段） */
export function getUserPets(id: string): Promise<UserPetsResponse> {
  return apiRequest<UserPetsResponse>(API_ENDPOINTS.USER_PETS(id));
}
