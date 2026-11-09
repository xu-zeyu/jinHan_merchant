"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Ban, ShieldCheck, UserRound } from "lucide-react";

import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

import { USER_STATUS, USER_STATUS_LABELS } from "../constants/user.constants";
import type { AppUser } from "../types/user.types";

type UsersTableProps = {
  users: AppUser[];
  canChangeStatus: boolean;
  onToggleStatus: (user: AppUser) => void;
};

function formatDate(value: string) {
  return value ? value.replace("T", " ").slice(0, 16) : "-";
}

export function UsersTable({ users, canChangeStatus, onToggleStatus }: UsersTableProps) {
  const columns: ColumnDef<AppUser>[] = [
    {
      id: "user",
      header: "用户",
      cell: ({ row }) => (
        <div className="flex min-w-44 items-center gap-3">
          <div className="glass-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-brand-strong"><UserRound className="h-4 w-4" /></div>
          <div className="min-w-0"><p className="font-medium">{row.original.phone}</p><p className="truncate text-xs text-muted-foreground">ID {row.original.id}</p></div>
        </div>
      ),
    },
    { id: "source", header: "来源", cell: ({ row }) => <span className="text-muted-foreground">{row.original.source || "—"}</span> },
    {
      id: "status",
      header: "状态",
      cell: ({ row }) => (
        <Badge variant={row.original.status === USER_STATUS.BANNED ? "destructive" : "success"}>
          {USER_STATUS_LABELS[row.original.status] ?? row.original.status}
        </Badge>
      ),
    },
    { id: "created", header: "注册时间", cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(row.original.createdAt)}</span> },
    {
      id: "actions",
      header: () => <span className="sr-only">操作</span>,
      cell: ({ row }) => {
        const user = row.original;
        const banned = user.status === USER_STATUS.BANNED;
        return (
          <div className="flex justify-end gap-2 whitespace-nowrap">
            <Button asChild size="sm" variant="outline"><Link href={ROUTES.USER_DETAIL(user.id)}>详情 <ArrowUpRight /></Link></Button>
            {canChangeStatus ? (
              <Button className={banned ? undefined : "text-destructive"} size="sm" variant="ghost" onClick={() => onToggleStatus(user)}>
                {banned ? <ShieldCheck /> : <Ban />}{banned ? "解封" : "封禁"}
              </Button>
            ) : null}
          </div>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={users} label="C 端用户列表" />;
}
