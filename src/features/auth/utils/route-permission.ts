import { ROUTES } from "@/constants/routes";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

/** 页面权限只控制前端可见性，接口仍由服务端独立鉴权。 */
export function getRoutePermission(pathname: string): string | null {
  if (pathname === ROUTES.ACCOUNTS) return PERMISSION_CODES.ACCOUNT_READ;
  if (pathname === ROUTES.ROLES) return PERMISSION_CODES.ROLE_READ;
  if (pathname === ROUTES.PERMISSIONS) return PERMISSION_CODES.PERMISSION_READ;
  if (pathname === ROUTES.USERS || pathname.startsWith(`${ROUTES.USERS}/`)) {
    return PERMISSION_CODES.USER_READ;
  }
  return null;
}

