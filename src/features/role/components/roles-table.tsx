"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { KeyRound, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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

import type { AdminRole } from "../types/role.types";

type RolesTableProps = {
  roles: AdminRole[];
  canAssign: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  onAssign: (role: AdminRole) => void;
  onEdit: (role: AdminRole) => void;
  onDelete: (role: AdminRole) => void;
};

function formatDate(value: string) {
  return value ? value.replace("T", " ").slice(0, 16) : "-";
}

export function RolesTable({ roles, canAssign, canUpdate, canDelete, onAssign, onEdit, onDelete }: RolesTableProps) {
  const columns: ColumnDef<AdminRole>[] = [
    {
      id: "role",
      header: "角色",
      cell: ({ row }) => (
        <div className="flex min-w-44 items-center gap-3">
          <div className="glass-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-brand-strong"><KeyRound className="h-4 w-4" /></div>
          <div><p className="font-medium">{row.original.name}</p><code className="text-xs text-muted-foreground">{row.original.code}</code></div>
        </div>
      ),
    },
    { id: "description", header: "说明", cell: ({ row }) => <span className="line-clamp-2 max-w-60 text-muted-foreground">{row.original.description || "—"}</span> },
    { id: "status", header: "状态", cell: ({ row }) => <Badge variant={row.original.enabled ? "success" : "secondary"}>{row.original.enabled ? "启用" : "禁用"}</Badge> },
    { id: "created", header: "创建时间", cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(row.original.createdTime)}</span> },
    {
      id: "actions",
      header: () => <span className="sr-only">操作</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button aria-label={`管理角色 ${row.original.name}`} size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled={!canAssign} onClick={() => onAssign(row.original)}><KeyRound /> 分配权限</DropdownMenuItem>
              <DropdownMenuItem disabled={!canUpdate} onClick={() => onEdit(row.original)}><Pencil /> 编辑</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={!canDelete} onClick={() => onDelete(row.original)}><Trash2 /> 删除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} data={roles} label="角色列表" />;
}
