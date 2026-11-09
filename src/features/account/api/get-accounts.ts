import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { AccountPageResult, AccountQuery } from "../types/account.types";

/** 管理员账号分页查询（ADMIN-V1-04） */
export function getAccounts(query: AccountQuery): Promise<AccountPageResult> {
  return apiRequest<AccountPageResult>(API_ENDPOINTS.ACCOUNTS, {
    query: {
      page: query.page,
      size: query.size,
      username: query.username,
      displayName: query.displayName,
      enabled: query.enabled,
      roleId: query.roleId,
    },
  });
}
