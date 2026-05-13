import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
} from "../constants/auth.constants";

export function hasAuthCookieValue(value: string | undefined) {
  return value === AUTH_COOKIE_VALUE;
}

export function readAuthCookieFromDocument() {
  if (typeof document === "undefined") {
    return false;
  }

  const cookieEntry = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${AUTH_COOKIE_NAME}=`));

  return hasAuthCookieValue(cookieEntry?.split("=")[1]);
}

export function syncBrowserAuthCookie(isAuthenticated: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  const maxAge = isAuthenticated ? AUTH_COOKIE_MAX_AGE : 0;
  const value = isAuthenticated ? AUTH_COOKIE_VALUE : "";

  document.cookie =
    `${AUTH_COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
