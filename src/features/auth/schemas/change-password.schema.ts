import { z } from "zod";

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constants/auth.constants";

const passwordRule = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `密码至少 ${PASSWORD_MIN_LENGTH} 位`)
  .max(PASSWORD_MAX_LENGTH, `密码最多 ${PASSWORD_MAX_LENGTH} 位`)
  .refine((v) => !/\s/.test(v), "密码不能包含空格")
  .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), "密码须同时包含字母和数字");

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "请输入原密码"),
    newPassword: passwordRule,
    confirmPassword: z.string().min(1, "请再次输入新密码"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "两次输入的新密码不一致",
    path: ["confirmPassword"],
  })
  .refine((v) => v.newPassword !== v.oldPassword, {
    message: "新密码不能与原密码相同",
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
