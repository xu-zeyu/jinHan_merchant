"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { APP_CONFIG } from "@/constants/app-config";

import { assignRolePermissions } from "../api/assign-role-permissions";
import { createRole } from "../api/create-role";
import { deleteRole } from "../api/delete-role";
import { getPermissions } from "../api/get-permissions";
import { getRolePermissions } from "../api/get-role-permissions";
import { getRoles } from "../api/get-roles";
import { syncPermissions } from "../api/sync-permissions";
import { updateRole } from "../api/update-role";
import type {
  CreateRoleRequest,
  RoleQuery,
  UpdateRoleRequest,
} from "../types/role.types";

const ROLES_KEY = ["roles"];

export function useRoles(query: RoleQuery) {
  return useQuery({
    queryKey: [...ROLES_KEY, "list", query],
    queryFn: () => getRoles(query),
    placeholderData: (prev) => prev,
  });
}

/** 角色选项（供下拉使用）：仅启用角色，取前 100 条 */
export function useRoleOptions(enabled = true) {
  return useQuery({
    queryKey: [...ROLES_KEY, "options"],
    queryFn: () => getRoles({ page: 1, size: 100, enabled: true }),
    select: (data) =>
      data.list.map((role) => ({ value: role.id, label: role.name })),
    staleTime: 60_000,
    enabled,
  });
}

export function useRolePermissions(roleId: number | null) {
  return useQuery({
    queryKey: [...ROLES_KEY, "permissions", roleId],
    queryFn: () => getRolePermissions(roleId as number),
    enabled: roleId !== null,
  });
}

export function usePermissionCatalog() {
  return useQuery({
    queryKey: ["permissions", "catalog"],
    queryFn: getPermissions,
    staleTime: 60_000,
  });
}

export function useRoleMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ROLES_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateRoleRequest) => createRole(payload),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateRoleRequest }) =>
      updateRole(id, payload),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteRole(id),
    onSuccess: invalidate,
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, permissions }: { id: number; permissions: string[] }) =>
      assignRolePermissions(id, { permissions }),
    onSuccess: invalidate,
  });

  const syncMutation = useMutation({
    mutationFn: () => syncPermissions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    assignMutation,
    syncMutation,
  };
}

export const ROLE_PAGE_SIZE = APP_CONFIG.defaultPageSize;
