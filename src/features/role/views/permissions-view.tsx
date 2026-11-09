"use client";

import { RefreshCw } from "lucide-react";

import { AsyncState } from "@/components/common/async-state";
import { EmptyState } from "@/components/common/empty-state";
import { ListShell } from "@/components/common/list-pagination";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import { usePermissionCatalog, useRoleMutations } from "../hooks/use-roles";

/** 权限点目录（ADMIN-V1-11）：查询内置权限码并支持幂等同步 */
export function PermissionsView() {
  const { toast } = useToast();
  const canRead = useHasPermission(PERMISSION_CODES.PERMISSION_READ);
  const { data, isLoading, isError, error, refetch } = usePermissionCatalog();
  const { syncMutation } = useRoleMutations();

  return (
    <>
      <PageHeader
        action={
          <Button
            disabled={syncMutation.isPending}
            variant="outline"
            onClick={() => {
              syncMutation.mutate(undefined, {
                onSuccess: () => {
                  toast({
                    title: "同步完成",
                    description: "内置权限码已幂等补入目录",
                  });
                  void refetch();
                },
                onError: (err) =>
                  toast({
                    title: "同步失败",
                    description: err instanceof Error ? err.message : undefined,
                  }),
              });
            }}
          >
            <RefreshCw
              className={syncMutation.isPending ? "animate-spin" : undefined}
            />
            同步内置权限码
          </Button>
        }
        description="查看和同步系统权限目录。"
        title="权限点"
      />

      <ListShell
        header={
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <p className="text-sm text-muted-foreground">
              共 {data?.length ?? 0} 个权限码
            </p>
            {canRead ? null : (
              <Badge variant="outline">仅超管可见完整目录</Badge>
            )}
          </div>
        }
      >
        <AsyncState
          onRetry={() => void refetch()}
          error={error}
          isEmpty={!isLoading && (data?.length ?? 0) === 0}
          isError={isError}
          isLoading={isLoading}
          empty={
            <EmptyState
              description="目录为空，可点击「同步内置权限码」初始化"
              title="暂无权限点"
            />
          }
        >
          {(data ?? []).map((permission) => (
            <div
              key={permission.code}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/40"
            >
              <div className="glass-soft flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold text-brand-strong">
                {permission.name.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{permission.name}</p>
                <code className="text-xs text-muted-foreground">
                  {permission.code}
                </code>
              </div>
              <Badge variant="outline">#{permission.id}</Badge>
            </div>
          ))}
        </AsyncState>
      </ListShell>
    </>
  );
}
