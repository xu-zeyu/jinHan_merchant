"use client";

import { useMemo, useState } from "react";
import { Ban, Eye, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";

import { AsyncState } from "@/components/common/async-state";
import { EmptyState } from "@/components/common/empty-state";
import {
  ListPagination,
  ListShell,
} from "@/components/common/list-pagination";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/constants/app-config";
import { ROUTES } from "@/constants/routes";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import { USER_STATUS, USER_STATUS_LABELS } from "../constants/user.constants";
import { useUserStatusMutation, useUsers } from "../hooks/use-users";
import type { AppUser } from "../types/user.types";

function formatDate(value: string) {
  return value ? value.replace("T", " ").slice(0, 16) : "-";
}

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
  const { data, isLoading, isError, error, isFetching } = useUsers(query);
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
        description="C 端用户的分页查询、详情查看与封禁/解封（ADMIN-V1-12）"
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
          error={error}
          isEmpty={!isLoading && (data?.list.length ?? 0) === 0}
          isError={isError}
          isLoading={isLoading}
          empty={
            <EmptyState description="没有符合条件的用户" title="暂无数据" />
          }
        >
          {(data?.list ?? []).map((user) => {
            const banned = user.status === USER_STATUS.BANNED;
            return (
              <div
                key={user.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <UserRound className="h-4 w-4 text-primary-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{user.phone}</p>
                    <Badge variant="outline">{user.source}</Badge>
                    <Badge variant={banned ? "destructive" : "default"}>
                      {USER_STATUS_LABELS[user.status] ?? user.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    注册于 {formatDate(user.createdAt)} · ID {user.id}
                  </p>
                </div>

                <Button asChild size="sm" variant="outline">
                  <Link href={ROUTES.USER_DETAIL(user.id)}>
                    <Eye /> 查看详情与宠物
                  </Link>
                </Button>
                <Button
                  disabled={!canStatus}
                  size="sm"
                  variant={banned ? "outline" : "destructive"}
                  onClick={() => toggleStatus(user)}
                >
                  {banned ? <ShieldCheck /> : <Ban />}
                  {banned ? "解封" : "封禁"}
                </Button>
              </div>
            );
          })}
        </AsyncState>
      </ListShell>
    </>
  );
}
