import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiRequest } from "@/services/api-client";

import type { CaptchaResponse } from "../types/auth.types";

/** 获取登录图形验证码（ADMIN-V1-01） */
export function getCaptcha(): Promise<CaptchaResponse> {
  return apiRequest<CaptchaResponse>(API_ENDPOINTS.CAPTCHA);
}
