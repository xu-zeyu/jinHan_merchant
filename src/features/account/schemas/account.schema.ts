import { z } from "zod";

import {
  CREATE_PASSWORD_MAX_LENGTH,
  CREATE_PASSWORD_MIN_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
  RESET_PASSWORD_MAX_LENGTH,
  RESET_PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../constants/account.constants";

const usernameRule = z
  .string()
  .min(USERNAME_MIN_LENGTH, `用户名至少 ${USERNAME_MIN_LENGTH} 位`)
  .max(USERNAME_MAX_LENGTH, `用户名最多 ${USERNAME_MAX_LENGTH} 位`)
  .regex(/^[A-Za-z0-9]+$/, "用户名只能包含 ASCII 字母或数字");

const displayNameRule = z
  .string()
  .trim()
  .min(1, "请输入显示名")
  .max(DISPLAY_NAME_MAX_LENGTH, `显示名最多 ${DISPLAY_NAME_MAX_LENGTH} 个字符`);

const phoneRule = z
  .string()
  .trim()
  .regex(/^1\d{10}$/, "请输入 11 位手机号")
  .or(z.literal(""));

export const createAccountSchema = z.object({
  username: usernameRule,
  displayName: displayNameRule,
  password: z
    .string()
    .min(CREATE_PASSWORD_MIN_LENGTH, `密码至少 ${CREATE_PASSWORD_MIN_LENGTH} 位`)
    .max(CREATE_PASSWORD_MAX_LENGTH, `密码最多 ${CREATE_PASSWORD_MAX_LENGTH} 位`)
    .refine((v) => !/\s/.test(v), "密码不能包含空格")
    .refine(
      (v) => /[A-Za-z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v),
      "密码须同时包含字母、数字和符号"
    ),
  phone: phoneRule.optional(),
  roleId: z.number().optional(),
});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;

export const updateAccountSchema = z.object({
  displayName: displayNameRule,
  phone: phoneRule.optional(),
  roleId: z.number().optional(),
});

export type UpdateAccountFormValues = z.infer<typeof updateAccountSchema>;

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(RESET_PASSWORD_MIN_LENGTH, `密码至少 ${RESET_PASSWORD_MIN_LENGTH} 位`)
    .max(RESET_PASSWORD_MAX_LENGTH, `密码最多 ${RESET_PASSWORD_MAX_LENGTH} 位`)
    .refine((v) => !/\s/.test(v), "密码不能包含空格")
    .refine(
      (v) => /[A-Za-z]/.test(v) && /\d/.test(v),
      "密码须同时包含字母和数字"
    ),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
