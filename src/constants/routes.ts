export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  CHANGE_PASSWORD: "/change-password",

  // 系统管理
  ACCOUNTS: "/system/accounts",
  ROLES: "/system/roles",
  PERMISSIONS: "/system/permissions",

  // C 端用户
  USERS: "/users",
  USER_DETAIL: (id: string) => `/users/${id}`,
} as const;

/** 需要登录才能访问的路由前缀 */
export const PROTECTED_ROUTE_PREFIXES = ["/system", "/users"] as const;

/** 未登录可访问的路由 */
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.CHANGE_PASSWORD] as const;
