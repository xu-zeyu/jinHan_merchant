export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  BANNED: "BANNED",
} as const;

export const USER_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "正常",
  BANNED: "已封禁",
};

export const GENDER_LABELS: Record<string, string> = {
  MALE: "公",
  FEMALE: "母",
  UNKNOWN: "未知",
};
