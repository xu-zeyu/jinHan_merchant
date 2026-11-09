"use client";

import { useQuery } from "@tanstack/react-query";

import { getCaptcha } from "../api/get-captcha";

/** 图形验证码查询（ADMIN-V1-01），刷新用 refetch */
export function useCaptcha() {
  return useQuery({
    queryKey: ["auth", "captcha"],
    queryFn: getCaptcha,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
}

/** 兼容 data: 前缀与否的 Base64 图片 */
export function toCaptchaImageSrc(imageBase64: string): string {
  return imageBase64.startsWith("data:")
    ? imageBase64
    : `data:image/png;base64,${imageBase64}`;
}
