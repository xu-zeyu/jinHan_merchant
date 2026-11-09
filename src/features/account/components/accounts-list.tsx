"use client";

import { KeyRound, MoreHorizontal, ShieldCheck, Trash2, UserCog } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

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

  const columns: ColumnDef<AdminAccount>[] = [
    {
      id: "account",
      header: "管理员",
      cell: ({ row }) => (
        <div className="flex min-w-48 items-center gap-3">
          <div className="glass-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-brand-strong">
            {row.original.displayName.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.displayName}</p>
            <p className="truncate text-xs text-muted-foreground">@{row.original.username}</p>
          </div>
        </div>
      ),
    },
    {
      id: "role",
      header: "角色",
      cell: ({ row }) => row.original.superAdmin
        ? <Badge variant="secondary">超级管理员</Badge>
        : <span className="text-muted-foreground">{row.original.roleId ? `角色 #${row.original.roleId}` : "未分配"}</span>,
    },
    {
      id: "status",
      header: "状态",
      cell: ({ row }) => (
        <Badge variant={row.original.enabled ? "success" : "destructive"}>
          {row.original.enabled ? "启用" : "停用"}
        </Badge>
      ),
    },
    {
      id: "created",
      header: "创建时间",
      cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(row.original.createdTime)}</span>,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">操作</span>,
      cell: ({ row }) => {
        const account = row.original;
        const canManageTarget = !account.superAdmin && account.id !== currentAccountId;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label={`管理 ${account.displayName}`} size="icon" variant="ghost"><MoreHorizontal /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-surface">
                <DropdownMenuItem disabled={!canUpdate || !canManageTarget} onClick={() => onEdit(account)}><UserCog /> 编辑</DropdownMenuItem>
                <DropdownMenuItem disabled={!canReset || !canManageTarget} onClick={() => onResetPassword(account)}><KeyRound /> 重置密码</DropdownMenuItem>
                <DropdownMenuItem disabled={!canStatus || !canManageTarget} onClick={() => onToggleStatus(account)}>
                  <ShieldCheck /> {account.enabled ? "停用" : "启用"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={!canDelete || !canManageTarget} onClick={() => onDelete(account)}><Trash2 /> 删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={accounts} label="管理员账号列表" />;
}
