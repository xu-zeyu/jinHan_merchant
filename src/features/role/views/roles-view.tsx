"use client";

import { useMemo, useState } from "react";
import { KeyRound, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

import { AsyncState } from "@/components/common/async-state";
import { EmptyState } from "@/components/common/empty-state";
import {
  ListPagination,
  ListShell,
} from "@/components/common/list-pagination";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/constants/app-config";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import { RoleFormDialog } from "../components/role-form-dialog";
import { RolePermissionsDialog } from "../components/role-permissions-dialog";
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
  const { data, isLoading, isError, error, isFetching } = useRoles(query);
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
        description="角色的增删改查与权限分配（ADMIN-V1-09 / ADMIN-V1-10）"
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
          error={error}
          isEmpty={!isLoading && (data?.list.length ?? 0) === 0}
          isError={isError}
          isLoading={isLoading}
          empty={<EmptyState description="暂无角色数据" title="暂无数据" />}
        >
          {(data?.list ?? []).map((role) => (
            <div
              key={role.id}
              className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <KeyRound className="h-4 w-4 text-primary-700" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold">{role.name}</p>
                  <code className="text-xs text-muted-foreground">
                    {role.code}
                  </code>
                  <Badge variant={role.enabled ? "default" : "secondary"}>
                    {role.enabled ? "启用" : "禁用"}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {role.description || "暂无说明"}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    disabled={!canAssign}
                    onClick={() => setPermRole(role)}
                  >
                    <KeyRound /> 分配权限
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!canUpdate}
                    onClick={() => {
                      setEditing(role);
                      setFormOpen(true);
                    }}
                  >
                    <Pencil /> 编辑
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    disabled={!canDelete}
                    onClick={() => {
                      if (window.confirm(`确认删除角色「${role.name}」？`)) {
                        deleteMutation.mutate(role.id, {
                          onSuccess: () => toast({ title: "已删除" }),
                          onError: (err) =>
                            toast({
                              title: "删除失败",
                              description:
                                err instanceof Error ? err.message : undefined,
                            }),
                        });
                      }
                    }}
                  >
                    <Trash2 /> 删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
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
