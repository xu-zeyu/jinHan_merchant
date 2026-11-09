import type { PageResult } from "@/types/api.types";

/** 角色（Apifox: V1RoleResponse） */
export type AdminRole = {
  id: number;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
  createdTime: string;
  updatedTime: string;
};

export type RolePageResult = PageResult<AdminRole>;

/** 角色分页筛选 */
export type RoleQuery = {
  page: number;
  size: number;
  keyword?: string;
  enabled?: boolean;
};

/** 创建入参（Apifox: V1CreateRoleRequest） */
export type CreateRoleRequest = {
  code: string;
  name: string;
  description?: string;
};

/** 编辑入参（Apifox: V1UpdateRoleRequest） */
export type UpdateRoleRequest = {
  name: string;
  description?: string;
  enabled: boolean;
};

/** 角色权限同步入参（Apifox: RolePermissionsRequest） */
export type RolePermissionsRequest = {
  permissions: string[];
};

/** 权限点（Apifox: AdminPermissionResponse） */
export type AdminPermission = {
  id: number;
  name: string;
  code: string;
};
