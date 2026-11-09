/** 管理端接口路径。契约来源：Apifox 项目 9001157（PetTown 管理后台接口 v0.0.1） */
export const API_ENDPOINTS = {
  // 认证（ADMIN-V1-01/02/03/08）
  CAPTCHA: "/api/admin/verification/captcha",
  LOGIN: "/api/admin/auth/login",
  ME: "/api/admin/auth/me",
  MENUS: "/api/admin/auth/menus",
  CHANGE_PASSWORD: "/api/admin/auth/change-password",

  // 管理员账号（ADMIN-V1-04~08）
  ACCOUNTS: "/api/admin/system/accounts",
  ACCOUNT: (id: number) => `/api/admin/system/accounts/${id}`,
  ACCOUNT_STATUS: (id: number) => `/api/admin/system/accounts/${id}/status`,
  ACCOUNT_RESET_PASSWORD: (id: number) =>
    `/api/admin/system/accounts/${id}/reset-password`,

  // 角色（ADMIN-V1-09/10）
  ROLES: "/api/admin/system/roles",
  ROLE: (id: number) => `/api/admin/system/roles/${id}`,
  ROLE_PERMISSIONS: (id: number) => `/api/admin/system/roles/${id}/permissions`,

  // 权限点（ADMIN-V1-11）
  PERMISSIONS: "/api/admin/system/permissions",
  PERMISSIONS_SYNC: "/api/admin/system/permissions/sync",

  // C 端用户与宠物（ADMIN-V1-12/13）
  USERS: "/api/admin/users",
  USER: (id: string) => `/api/admin/users/${id}`,
  USER_STATUS: (id: string) => `/api/admin/users/${id}/status`,
  USER_PETS: (id: string) => `/api/admin/users/${id}/pets`,
} as const;
