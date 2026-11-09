"use client";

import { KeyRound, MoreHorizontal, ShieldCheck, Trash2, UserCog } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PERMISSION_CODES } from "@/permissions/permission-codes";
import { useHasPermission } from "@/features/auth/hooks/use-permission";

import type { AdminAccount } from "../types/account.types";

type AccountsListProps = {
  accounts: AdminAccount[];
  currentAccountId: number | null;
  onEdit: (account: AdminAccount) => void;
  onToggleStatus: (account: AdminAccount) => void;
  onResetPassword: (account: AdminAccount) => void;
  onDelete: (account: AdminAccount) => void;
};

function formatDate(value: string) {
  return value ? value.replace("T", " ").slice(0, 16) : "-";
}

/** 管理员账号卡片列表（ADMIN-V1-04） */
export function AccountsList({
  accounts,
  currentAccountId,
  onEdit,
  onToggleStatus,
  onResetPassword,
  onDelete,
}: AccountsListProps) {
  const canUpdate = useHasPermission(PERMISSION_CODES.ACCOUNT_UPDATE);
  const canStatus = useHasPermission(PERMISSION_CODES.ACCOUNT_STATUS);
  const canReset = useHasPermission(PERMISSION_CODES.ACCOUNT_RESET_PASSWORD);
  const canDelete = useHasPermission(PERMISSION_CODES.ACCOUNT_DELETE);

  return (
    <>
      {accounts.map((account) => {
        const isSelf = account.id === currentAccountId;
        const guardAction = account.superAdmin && !isSelf ? false : true;

        return (
          <div
            key={account.id}
            className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary-700">
              {account.displayName.slice(0, 1)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-semibold">
                  {account.displayName}
                </p>
                <span className="text-xs text-muted-foreground">
                  @{account.username}
                </span>
                {account.superAdmin ? (
                  <Badge variant="secondary">超级管理员</Badge>
                ) : null}
                {account.passwordChangeRequired ? (
                  <Badge variant="outline">待改密</Badge>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {account.phone ?? "未配置手机号"} · 创建于{" "}
                {formatDate(account.createdTime)}
              </p>
            </div>

            <Badge variant={account.enabled ? "default" : "destructive"}>
              {account.enabled ? "启用" : "停用"}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={!canUpdate}
                  onClick={() => onEdit(account)}
                >
                  <UserCog /> 编辑
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!canReset}
                  onClick={() => onResetPassword(account)}
                >
                  <KeyRound /> 重置密码
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!canStatus || !guardAction}
                  onClick={() => onToggleStatus(account)}
                >
                  <ShieldCheck /> {account.enabled ? "停用" : "启用"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  disabled={!canDelete || account.superAdmin || isSelf}
                  onClick={() => onDelete(account)}
                >
                  <Trash2 /> 删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </>
  );
}
