"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  totalCount: number;
  pageSizeOptions?: number[];
};

export function DataTablePagination<TData>({
  table,
  totalCount,
  pageSizeOptions = [5, 8, 10],
}: DataTablePaginationProps<TData>) {
  const {
    pageIndex,
    pageSize,
  } = table.getState().pagination;
  const pageCount = Math.max(table.getPageCount(), 1);
  const start = totalCount === 0 ? 0 : pageIndex * pageSize + 1;
  const end = totalCount === 0 ? 0 : Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          显示 {start}-{end} / 共 {totalCount} 条
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">每页</span>
            <Select
                onValueChange={(value) => table.setPageSize(Number(value))}
                value={String(pageSize)}
            >
              <SelectTrigger className="h-8 w-[88px] rounded-xl bg-card text-xs shadow-sm">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option} 条
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
          <span className="min-w-[72px] text-center text-xs font-medium text-foreground">
            第 {pageIndex + 1} / {pageCount} 页
          </span>
            <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="sm"
                variant="outline"
            >
              <ChevronLeft className="h-3.5 w-3.5"/>
              上一页
            </Button>
            <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="sm"
                variant="outline"
            >
              下一页
              <ChevronRight className="h-3.5 w-3.5"/>
            </Button>
          </div>
        </div>
      </div>
  );
}
