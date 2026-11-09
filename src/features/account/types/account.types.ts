import type { PageResult } from "@/types/api.types";

/** 管理员账号（Apifox: AccountResponse） */
export type AdminAccount = {
  id: number;
  username: string;
  displayName: string;
  roleId: number | null;
  phone: string | null;
  enabled: boolean;
  superAdmin: boolean;
  passwordChangeRequired: boolean;
  createdTime: string;
  updatedTime: string;
};

export type AccountPageResult = PageResult<AdminAccount>;

/** 分页筛选（ADMIN-V1-04） */
export type AccountQuery = {
  page: number;
  size: number;
  username?: string;
  displayName?: string;
  enabled?: boolean;
  roleId?: number;
};

/** 创建入参（Apifox: V1CreateAccountRequest） */
export type CreateAccountRequest = {
  username: string;
  displayName: string;
  password: string;
  phone?: string;
  roleId?: number;
};

/** 编辑入参（Apifox: V1UpdateAccountRequest） */
export type UpdateAccountRequest = {
  displayName?: string;
  phone?: string;
  roleId?: number;
};

/** 重置密码入参（Apifox: V1ResetPasswordRequest） */
export type ResetPasswordRequest = {
  password: string;
};

/** 启停入参（Apifox: StatusRequest） */
export type AccountStatusRequest = {
  enabled: boolean;
};
