import { z } from "zod";

import {
  ROLE_CODE_MAX_LENGTH,
  ROLE_CODE_MIN_LENGTH,
  ROLE_DESCRIPTION_MAX_LENGTH,
  ROLE_NAME_MAX_LENGTH,
} from "../constants/role.constants";

export const createRoleSchema = z.object({
  code: z
    .string()
    .min(ROLE_CODE_MIN_LENGTH, `角色编码至少 ${ROLE_CODE_MIN_LENGTH} 位`)
    .max(ROLE_CODE_MAX_LENGTH, `角色编码最多 ${ROLE_CODE_MAX_LENGTH} 位`)
    .regex(
      /^[a-z][a-z0-9_]*$/,
      "编码为 3-50 位小写字母、数字或下划线，以字母开头"
    ),
  name: z
    .string()
    .trim()
    .min(1, "请输入角色名称")
    .max(ROLE_NAME_MAX_LENGTH, `角色名称最多 ${ROLE_NAME_MAX_LENGTH} 个字符`),
  description: z
    .string()
    .max(
      ROLE_DESCRIPTION_MAX_LENGTH,
      `角色说明最多 ${ROLE_DESCRIPTION_MAX_LENGTH} 个字符`
    )
    .optional(),
});

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "请输入角色名称")
    .max(ROLE_NAME_MAX_LENGTH, `角色名称最多 ${ROLE_NAME_MAX_LENGTH} 个字符`),
  description: z
    .string()
    .max(
      ROLE_DESCRIPTION_MAX_LENGTH,
      `角色说明最多 ${ROLE_DESCRIPTION_MAX_LENGTH} 个字符`
    )
    .optional(),
  enabled: z.boolean(),
});

export type UpdateRoleFormValues = z.infer<typeof updateRoleSchema>;

/** 弹窗表单（创建/编辑共用）：enabled 在创建时默认 true */
export const roleFormSchema = z.object({
  code: z
    .string()
    .min(ROLE_CODE_MIN_LENGTH, `角色编码至少 ${ROLE_CODE_MIN_LENGTH} 位`)
    .max(ROLE_CODE_MAX_LENGTH, `角色编码最多 ${ROLE_CODE_MAX_LENGTH} 位`)
    .regex(
      /^[a-z][a-z0-9_]*$/,
      "编码为 3-50 位小写字母、数字或下划线，以字母开头"
    ),
  name: z
    .string()
    .trim()
    .min(1, "请输入角色名称")
    .max(ROLE_NAME_MAX_LENGTH, `角色名称最多 ${ROLE_NAME_MAX_LENGTH} 个字符`),
  description: z
    .string()
    .max(
      ROLE_DESCRIPTION_MAX_LENGTH,
      `角色说明最多 ${ROLE_DESCRIPTION_MAX_LENGTH} 个字符`
    )
    .optional(),
  enabled: z.boolean(),
});

export type RoleFormValues = z.infer<typeof roleFormSchema>;
