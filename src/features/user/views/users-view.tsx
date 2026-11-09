"use client";

import { useMemo, useState } from "react";

import { AsyncState } from "@/components/common/async-state";
import { EmptyState } from "@/components/common/empty-state";
import {
  ListPagination,
  ListShell,
} from "@/components/common/list-pagination";
import { PageHeader } from "@/components/common/page-header";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/constants/app-config";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import { USER_STATUS } from "../constants/user.constants";
import { UsersTable } from "../components/users-table";
import { useUserStatusMutation, useUsers } from "../hooks/use-users";
import type { AppUser } from "../types/user.types";

export function UsersView() {
  const { toast } = useToast();
  const canStatus = useHasPermission(PERMISSION_CODES.USER_STATUS);

  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>({ page: 1, size: APP_CONFIG.defaultPageSize });
  const [phone, setPhone] = useState("");

  const query = useMemo(
    () => ({ ...pagination, phone: phone.trim() || undefined }),
    [pagination, phone]
  );
  const { data, isLoading, isError, error, isFetching, refetch } = useUsers(query);
  const statusMutation = useUserStatusMutation();

  const toggleStatus = (user: AppUser) => {
    const banning = user.status !== USER_STATUS.BANNED;
    const tip = banning
      ? `确认封禁用户 ${user.phone}？封禁后其小程序会话立即失效且无法登录。`
      : `确认解封用户 ${user.phone}？`;
    if (!window.confirm(tip)) return;

    statusMutation.mutate(
      {
        id: user.id,
        status: banning ? USER_STATUS.BANNED : USER_STATUS.ACTIVE,
      },
      {
        onSuccess: () =>
          toast({ title: banning ? "已封禁" : "已解封" }),
        onError: (err) =>
          toast({
            title: "操作失败",
            description: err instanceof Error ? err.message : undefined,
          }),
      }
    );
  };

  return (
    <>
      <PageHeader
        description="查找用户、查看宠物档案并管理账号状态。"
        title="C 端用户"
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
              placeholder="按手机号筛选"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
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
          empty={
            <EmptyState description="没有符合条件的用户" title="暂无数据" />
          }
        >
          <UsersTable users={data?.list ?? []} canChangeStatus={canStatus} onToggleStatus={toggleStatus} />
        </AsyncState>
      </ListShell>
    </>
  );
}
