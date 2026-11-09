"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_CONFIG } from "@/constants/app-config";

type ListPaginationProps = {
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

/** 分页控件（分页接口统一 page/size/total） */
export function ListPagination({
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
}: ListPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-2">
      <p className="text-sm text-muted-foreground">
        共 {total} 条 · 第 {page}/{totalPages} 页
      </p>
      <div className="flex items-center gap-2">
        <Select
          value={String(size)}
          onValueChange={(value) => onSizeChange(Number(value))}
        >
          <SelectTrigger className="h-9 w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {APP_CONFIG.pageSizeOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option} 条
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          disabled={page <= 1}
          size="sm"
          variant="outline"
          onClick={() => onPageChange(page - 1)}
        >
          上一页
        </Button>
        <Button
          disabled={page >= totalPages}
          size="sm"
          variant="outline"
          onClick={() => onPageChange(page + 1)}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}

export type ListShellProps = {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

/** 卡片化列表外壳 */
export function ListShell({ header, children, footer }: ListShellProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      {header}
      <div className="divide-y divide-border/60">{children}</div>
      {footer}
    </section>
  );
}
