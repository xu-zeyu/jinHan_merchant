"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AsyncState } from "@/components/common/async-state";
import { EmptyState } from "@/components/common/empty-state";
import {
  ListPagination,
  ListShell,
} from "@/components/common/list-pagination";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/constants/app-config";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import { RoleFormDialog } from "../components/role-form-dialog";
import { RolePermissionsDialog } from "../components/role-permissions-dialog";
import { RolesTable } from "../components/roles-table";
import {
  useRoleMutations,
  useRolePermissions,
  useRoles,
} from "../hooks/use-roles";
import type {
  AdminRole,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../types/role.types";

export function RolesView() {
  const { toast } = useToast();
  const canCreate = useHasPermission(PERMISSION_CODES.ROLE_CREATE);
  const canUpdate = useHasPermission(PERMISSION_CODES.ROLE_UPDATE);
  const canDelete = useHasPermission(PERMISSION_CODES.ROLE_DELETE);
  const canAssign = useHasPermission(PERMISSION_CODES.ROLE_ASSIGN_PERMISSION);

  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>({ page: 1, size: APP_CONFIG.defaultPageSize });
  const [keyword, setKeyword] = useState("");

  const query = useMemo(
    () => ({ ...pagination, keyword: keyword.trim() || undefined }),
    [pagination, keyword]
  );
  const { data, isLoading, isError, error, isFetching, refetch } = useRoles(query);
  const {
    createMutation,
    updateMutation,
    deleteMutation,
    assignMutation,
  } = useRoleMutations();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminRole | null>(null);
  const [permRole, setPermRole] = useState<AdminRole | null>(null);
  const permQuery = useRolePermissions(permRole?.id ?? null);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    createMutation.reset();
    updateMutation.reset();
  };

  return (
    <>
      <PageHeader
        action={
          canCreate ? (
            <Button
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              <Plus /> 创建角色
            </Button>
          ) : null
        }
        description="创建角色并配置可访问的功能。"
        title="角色"
      />

      <ListShell
        footer={
          <ListPagination
            page={pagination.page}
            size={pagination.size}
            total={data?.total ?? 0}
            onPageChange={(next) =>
              setPagination((s) => ({ ...s, page: next }))
            }
            onSizeChange={(next) => setPagination({ page: 1, size: next })}
          />
        }
        header={
          <div className="flex flex-wrap items-center gap-3 border-b border-border/60 px-5 py-4">
            <Input
              className="w-56"
              placeholder="按名称或编码筛选"
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                setPagination((s) => ({ ...s, page: 1 }));
              }}
            />
            {isFetching ? (
              <span className="text-xs text-muted-foreground">刷新中…</span>
            ) : null}
          </div>
        }
      >
        <AsyncState
          onRetry={() => void refetch()}
          error={error}
          isEmpty={!isLoading && (data?.list.length ?? 0) === 0}
          isError={isError}
          isLoading={isLoading}
          empty={<EmptyState description="暂无角色数据" title="暂无数据" />}
        >
          <RolesTable
            roles={data?.list ?? []}
            canAssign={canAssign}
            canUpdate={canUpdate}
            canDelete={canDelete}
            onAssign={setPermRole}
            onEdit={(role) => { setEditing(role); setFormOpen(true); }}
            onDelete={(role) => {
              if (!window.confirm(`确认删除角色「${role.name}」？`)) return;
              deleteMutation.mutate(role.id, {
                onSuccess: () => toast({ title: "已删除" }),
                onError: (err) => toast({
                  title: "删除失败",
                  description: err instanceof Error ? err.message : undefined,
                }),
              });
            }}
          />
        </AsyncState>
      </ListShell>

      <RoleFormDialog
        role={editing}
        errorMessage={
          (createMutation.error instanceof Error &&
            createMutation.error.message) ||
          (updateMutation.error instanceof Error &&
            updateMutation.error.message) ||
          null
        }
        open={formOpen}
        submitting={createMutation.isPending || updateMutation.isPending}
        onClose={closeForm}
        onCreate={(values: CreateRoleRequest) => {
          createMutation.mutate(values, {
            onSuccess: () => {
              toast({ title: "角色已创建" });
              closeForm();
            },
          });
        }}
        onUpdate={(values: UpdateRoleRequest) => {
          if (!editing) return;
          updateMutation.mutate(
            { id: editing.id, payload: values },
            {
              onSuccess: () => {
                toast({ title: "已保存" });
                closeForm();
              },
            }
          );
        }}
      />

      <RolePermissionsDialog
        errorMessage={
          assignMutation.error instanceof Error
            ? assignMutation.error.message
            : null
        }
        role={permRole}
        selected={permQuery.data ?? []}
        selectedLoading={permQuery.isLoading}
        selectedError={permQuery.isError}
        submitting={assignMutation.isPending}
        onClose={() => {
          setPermRole(null);
          assignMutation.reset();
        }}
        onConfirm={(permissions) => {
          if (!permRole) return;
          assignMutation.mutate(
            { id: permRole.id, permissions },
            {
              onSuccess: () => {
                toast({ title: "权限已更新" });
                setPermRole(null);
              },
            }
          );
        }}
      />
    </>
  );
}
