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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";
import { APP_CONFIG } from "@/constants/app-config";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { useHasPermission } from "@/features/auth/hooks/use-permission";

import { AccountFormDialog } from "../components/account-form-dialog";
import { AccountsList } from "../components/accounts-list";
import { ResetPasswordDialog } from "../components/reset-password-dialog";
import { ACCOUNT_STATUS_OPTIONS } from "../constants/account.constants";
import { useAccountMutations, useAccounts } from "../hooks/use-accounts";
import type {
  AdminAccount,
  CreateAccountRequest,
  UpdateAccountRequest,
} from "../types/account.types";

const ALL = "all";

export function AccountsView() {
  const { toast } = useToast();
  const currentAccountId = useAuthStore((state) => state.account?.id ?? null);
  const canCreate = useHasPermission(PERMISSION_CODES.ACCOUNT_CREATE);

  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>({ page: 1, size: APP_CONFIG.defaultPageSize });
  const [username, setUsername] = useState("");
  const [enabledFilter, setEnabledFilter] = useState<string>(ALL);

  const query = useMemo(
    () => ({
      ...pagination,
      username: username.trim() || undefined,
      enabled:
        enabledFilter === ALL ? undefined : enabledFilter === "true",
    }),
    [pagination, username, enabledFilter]
  );

  const { data, isLoading, isError, error, isFetching } = useAccounts(query);
  const {
    createMutation,
    updateMutation,
    deleteMutation,
    statusMutation,
    resetPasswordMutation,
  } = useAccountMutations();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminAccount | null>(null);
  const [resetting, setResetting] = useState<AdminAccount | null>(null);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    createMutation.reset();
    updateMutation.reset();
  };

  const handleCreate = (payload: CreateAccountRequest) => {
    createMutation.mutate(payload, {
      onSuccess: () => {
        toast({ title: "创建成功", description: "新账号首次登录须修改密码" });
        closeForm();
      },
    });
  };

  const handleUpdate = (payload: UpdateAccountRequest) => {
    if (!editing) return;
    updateMutation.mutate(
      { id: editing.id, payload },
      {
        onSuccess: () => {
          toast({ title: "已保存" });
          closeForm();
        },
      }
    );
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
              <Plus /> 创建管理员
            </Button>
          ) : null
        }
        description="管理员账号的查询、创建、编辑、启停、删除与密码重置（ADMIN-V1-04~08）"
        title="管理员"
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
              placeholder="按用户名筛选"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setPagination((s) => ({ ...s, page: 1 }));
              }}
            />
            <Select
              value={enabledFilter}
              onValueChange={(value) => {
                setEnabledFilter(value);
                setPagination((s) => ({ ...s, page: 1 }));
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <EmptyState
              description="没有符合条件的管理员账号"
              title="暂无数据"
            />
          }
        >
          <AccountsList
            accounts={data?.list ?? []}
            currentAccountId={currentAccountId}
            onDelete={(account) => {
              if (window.confirm(`确认删除管理员「${account.displayName}」？`)) {
                deleteMutation.mutate(account.id, {
                  onSuccess: () => toast({ title: "已删除" }),
                  onError: (err) =>
                    toast({
                      title: "删除失败",
                      description: err instanceof Error ? err.message : undefined,
                    }),
                });
              }
            }}
            onEdit={(account) => {
              setEditing(account);
              setFormOpen(true);
            }}
            onResetPassword={(account) => setResetting(account)}
            onToggleStatus={(account) => {
              statusMutation.mutate(
                { id: account.id, enabled: !account.enabled },
                {
                  onSuccess: () =>
                    toast({
                      title: account.enabled ? "已停用" : "已启用",
                    }),
                  onError: (err) =>
                    toast({
                      title: "操作失败",
                      description: err instanceof Error ? err.message : undefined,
                    }),
                }
              );
            }}
          />
        </AsyncState>
      </ListShell>

      <AccountFormDialog
        account={editing}
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
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <ResetPasswordDialog
        account={resetting}
        errorMessage={
          resetPasswordMutation.error instanceof Error
            ? resetPasswordMutation.error.message
            : null
        }
        submitting={resetPasswordMutation.isPending}
        onClose={() => {
          setResetting(null);
          resetPasswordMutation.reset();
        }}
        onConfirm={(values) => {
          if (!resetting) return;
          resetPasswordMutation.mutate(
            { id: resetting.id, payload: { password: values.password } },
            {
              onSuccess: () => {
                toast({ title: "已重置", description: "目标账号下次登录须改密" });
                setResetting(null);
              },
            }
          );
        }}
      />
    </>
  );
}
