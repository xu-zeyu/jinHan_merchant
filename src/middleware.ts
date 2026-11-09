import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ROUTES } from "@/constants/routes";
import { AUTH_COOKIE_NAME } from "@/features/auth/constants/auth.constants";
import { hasAuthCookieValue } from "@/features/auth/utils/auth-cookie";
import {
  buildLoginRedirectPath,
  getAuthenticatedRedirectPath,
  isAuthRoute,
  isProtectedRoute,
} from "@/features/auth/utils/auth-routing";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const isAuthenticated = hasAuthCookieValue(
    request.cookies.get(AUTH_COOKIE_NAME)?.value
  );

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(
      new URL(buildLoginRedirectPath(pathname), request.url)
    );
  }

  if (isAuthenticated && isAuthRoute(pathname)) {
    // 改密页对已登录用户开放
    if (pathname === ROUTES.CHANGE_PASSWORD) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = getAuthenticatedRedirectPath(searchParams.get("redirect"));
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/system/:path*", "/users/:path*", "/login", "/change-password"],
};
