import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type {
  AdminAccount,
  CreateAccountRequest,
} from "../types/account.types";

/** 创建管理员账号（ADMIN-V1-05） */
export function createAccount(
  payload: CreateAccountRequest
): Promise<AdminAccount> {
  return apiRequest<AdminAccount>(API_ENDPOINTS.ACCOUNTS, {
    method: "POST",
    body: payload,
  });
}
