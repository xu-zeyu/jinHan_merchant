"use client";

import type { ReactNode } from "react";
import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/cn";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import type {
  DataTableFilterConfig,
  DataTableSearchKey,
} from "./data-table-types";

type DataTableProps<TData> = {
  actions?: ReactNode;
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  defaultPageSize?: number;
  emptyDescription?: string;
  emptyTitle?: string;
  filters?: DataTableFilterConfig<TData>[];
  maxHeightClassName?: string;
  meta?: ReactNode;
  pageSizeOptions?: number[];
  searchKeys?: DataTableSearchKey<TData>[];
  searchPlaceholder?: string;
};

export function DataTable<TData>({
  actions,
  columns,
  data,
  defaultPageSize = 5,
  emptyDescription = "调整搜索词或筛选条件后再试一次。",
  emptyTitle = "暂无匹配结果",
  filters = [],
  maxHeightClassName = "max-h-[420px]",
  meta,
  pageSizeOptions,
  searchKeys = [],
  searchPlaceholder = "搜索...",
}: DataTableProps<TData>) {
  const resolvedDefaultPageSize =
    pageSizeOptions?.includes(defaultPageSize)
      ? defaultPageSize
      : pageSizeOptions?.[0] ?? defaultPageSize;
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: resolvedDefaultPageSize,
  });
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        filters.map((filter) => [filter.id, filter.defaultValue ?? "all"])
      )
  );

  const normalizedKeyword = searchValue.trim().toLowerCase();
  const filteredData = React.useMemo(
    () =>
      data.filter((row) => {
        const matchesKeyword =
          normalizedKeyword.length === 0 ||
          searchKeys.some((key) => {
            const value = row[key];

            return String(value ?? "").toLowerCase().includes(normalizedKeyword);
          });

        const matchesFilters = filters.every((filter) => {
          const currentValue = filterValues[filter.id];

          if (!currentValue || currentValue === "all") {
            return true;
          }

          return filter.valueGetter(row) === currentValue;
        });

        return matchesKeyword && matchesFilters;
      }),
    [data, filterValues, filters, normalizedKeyword, searchKeys]
  );

  React.useEffect(() => {
    setPagination((current) =>
      current.pageIndex === 0 ? current : { ...current, pageIndex: 0 }
    );
  }, [filterValues, normalizedKeyword]);

  const table = useReactTable({
    autoResetPageIndex: false,
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        actions={actions}
        filterValues={filterValues}
        filters={filters}
        filtersExpanded={filtersExpanded}
        meta={meta}
        onFilterChange={(filterId, value) =>
          setFilterValues((current) => ({ ...current, [filterId]: value }))
        }
        onSearchChange={setSearchValue}
        onToggleFilters={() => setFiltersExpanded((current) => !current)}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
      />

      <div className="overflow-hidden rounded-2xl bg-card shadow-[0_18px_40px_-28px_rgba(15,23,42,0.24)]">
        <div className={cn("overflow-auto", maxHeightClassName)}>
          <table className="w-full min-w-[720px] border-separate border-spacing-0">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="sticky top-0 z-10 border-b border-border/60 bg-background/88 px-4 py-3 text-left text-xs font-semibold text-muted-foreground backdrop-blur-xl"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-b border-border/50 px-4 py-3 align-middle text-sm"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-14 text-center"
                    colSpan={columns.length}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {emptyTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {emptyDescription}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DataTablePagination
        pageSizeOptions={pageSizeOptions}
        table={table}
        totalCount={filteredData.length}
      />
    </div>
  );
}
