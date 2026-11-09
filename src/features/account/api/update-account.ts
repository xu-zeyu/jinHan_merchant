import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type {
  AdminAccount,
  UpdateAccountRequest,
} from "../types/account.types";

/** 编辑管理员账号（ADMIN-V1-06，改角色需 system:account:assign-role） */
export function updateAccount(
  id: number,
  payload: UpdateAccountRequest
): Promise<AdminAccount> {
  return apiRequest<AdminAccount>(API_ENDPOINTS.ACCOUNT(id), {
    method: "PUT",
    body: payload,
  });
}
