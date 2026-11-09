/**
 * 管理端内置权限码。
 * 与后端 AdminPermissionCodes 保持一致（v1.0.0 TAPD 需求池约定）。
 */
export const PERMISSION_CODES = {
  ACCOUNT_READ: "system:account:read",
  ACCOUNT_CREATE: "system:account:create",
  ACCOUNT_UPDATE: "system:account:update",
  ACCOUNT_STATUS: "system:account:status",
  ACCOUNT_RESET_PASSWORD: "system:account:reset-password",
  ACCOUNT_ASSIGN_ROLE: "system:account:assign-role",
  ACCOUNT_DELETE: "system:account:delete",
  ROLE_READ: "system:role:read",
  ROLE_CREATE: "system:role:create",
  ROLE_UPDATE: "system:role:update",
  ROLE_DELETE: "system:role:delete",
  ROLE_ASSIGN_PERMISSION: "system:role:assign-permission",
  PERMISSION_READ: "system:permission:read",
  USER_READ: "biz:user:read",
  USER_STATUS: "biz:user:status",
  SUB_ADMIN: "SUB_ADMIN",
} as const;

export type PermissionCode =
  (typeof PERMISSION_CODES)[keyof typeof PERMISSION_CODES];
