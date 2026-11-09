import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { UserPageResult, UserQuery } from "../types/user.types";

/** C 端用户分页查询（ADMIN-V1-12） */
export function getUsers(query: UserQuery): Promise<UserPageResult> {
  return apiRequest<UserPageResult>(API_ENDPOINTS.USERS, {
    query: {
      page: query.page,
      size: query.size,
      phone: query.phone,
      source: query.source,
    },
  });
}
