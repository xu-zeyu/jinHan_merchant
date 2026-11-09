/** 账号用户名规则（ADMIN-V1-05）：4-50 位 ASCII 字母或数字 */
export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 50;

/** 显示名：1-50 字符 */
export const DISPLAY_NAME_MAX_LENGTH = 50;

/** 初始密码（ADMIN-V1-05）：8-72 位非空格 ASCII，含字母、数字、符号 */
export const CREATE_PASSWORD_MIN_LENGTH = 8;
export const CREATE_PASSWORD_MAX_LENGTH = 72;

/** 重置密码（ADMIN-V1-08）：8-64 位非空格 ASCII，至少含字母和数字 */
export const RESET_PASSWORD_MIN_LENGTH = 8;
export const RESET_PASSWORD_MAX_LENGTH = 64;

export const ACCOUNT_STATUS_OPTIONS = [
  { label: "全部状态", value: "all" },
  { label: "已启用", value: "true" },
  { label: "已停用", value: "false" },
] as const;
