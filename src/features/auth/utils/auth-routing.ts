import {
  AUTH_ROUTES,
  PROTECTED_ROUTE_PREFIXES,
  ROUTES,
} from "@/constants/routes";

function isRouteMatch(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isAuthRoute(pathname: string) {
  return (AUTH_ROUTES as readonly string[]).includes(pathname);
}

export function isProtectedRoute(pathname: string) {
  if (pathname === ROUTES.HOME) {
    return true;
  }
  return PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    isRouteMatch(pathname, prefix)
  );
}

/** 登录后默认落地页 */
export function getDefaultAuthenticatedPath() {
  return ROUTES.USERS;
}

export function getAuthenticatedRedirectPath(
  redirectTarget: string | null | undefined
) {
  if (
    !redirectTarget ||
    !redirectTarget.startsWith("/") ||
    redirectTarget.startsWith("//")
  ) {
    return getDefaultAuthenticatedPath();
  }
  return redirectTarget;
}

export function buildLoginRedirectPath(pathname: string) {
  const redirectTarget =
    pathname === ROUTES.HOME ? getDefaultAuthenticatedPath() : pathname;
  const searchParams = new URLSearchParams({ redirect: redirectTarget });
  return `${ROUTES.LOGIN}?${searchParams.toString()}`;
}
