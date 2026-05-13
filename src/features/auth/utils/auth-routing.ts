import { ROUTES } from "@/constants/routes";

const AUTH_ROUTE_SET = new Set<string>([
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
]);

const PROTECTED_ROUTE_PREFIXES = [
  ROUTES.DASHBOARD,
  ROUTES.PRODUCTS,
  ROUTES.CATEGORIES,
  ROUTES.ORDERS,
  ROUTES.REFUNDS,
  ROUTES.CUSTOMERS,
  ROUTES.AI_PRODUCT_GENERATOR,
  ROUTES.AI_CONTENT_WRITER,
  ROUTES.ANALYTICS,
  ROUTES.FINANCE,
  ROUTES.SETTINGS,
];

function isRouteMatch(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isAuthRoute(pathname: string) {
  return AUTH_ROUTE_SET.has(pathname);
}

export function isProtectedRoute(pathname: string) {
  if (pathname === ROUTES.HOME) {
    return true;
  }

  return PROTECTED_ROUTE_PREFIXES.some((route) => isRouteMatch(pathname, route));
}

export function getAuthenticatedRedirectPath(
  redirectTarget: string | null | undefined
) {
  if (!redirectTarget || !redirectTarget.startsWith("/") || redirectTarget.startsWith("//")) {
    return ROUTES.DASHBOARD;
  }

  return redirectTarget;
}

export function buildLoginRedirectPath(pathname: string) {
  const redirectTarget = pathname === ROUTES.HOME ? ROUTES.DASHBOARD : pathname;
  const searchParams = new URLSearchParams({ redirect: redirectTarget });

  return `${ROUTES.LOGIN}?${searchParams.toString()}`;
}
