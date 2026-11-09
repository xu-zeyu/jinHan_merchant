import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { AppUser } from "../types/user.types";

/** C 端用户详情（ADMIN-V1-12） */
export function getUser(id: string): Promise<AppUser> {
  return apiRequest<AppUser>(API_ENDPOINTS.USER(id));
}
