export const AUTH_STORAGE_KEY = "jinhan-merchant-auth";
export const AUTH_COOKIE_NAME = "jinhan-merchant-session";
export const AUTH_COOKIE_VALUE = "authenticated";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/** 密码强度：8-64 位非空格 ASCII，至少包含字母和数字（ADMIN-V1-08） */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

/** 新密码规则提示 */
export const NEW_PASSWORD_HINT = "8-64 位非空格 ASCII，至少包含字母和数字";
