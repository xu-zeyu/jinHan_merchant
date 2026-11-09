"use client";

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  label: string;
};

/** 仅渲染服务端分页的当前页；排序和筛选由对应 API 控制。 */
export function DataTable<TData>({ columns, data, label }: DataTableProps<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="w-full overflow-x-auto">
      <table aria-label={label} className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead className="bg-white/30 text-xs font-medium text-muted-foreground dark:bg-white/5">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th className="px-5 py-3 font-medium" key={header.id} scope="col">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-white/55 dark:divide-white/10">
          {table.getRowModel().rows.map((row) => (
            <tr className="transition-colors hover:bg-white/35 dark:hover:bg-white/5" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="px-5 py-4 align-middle" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
