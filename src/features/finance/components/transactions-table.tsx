"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/common/data-table/data-table";
import type { DataTableFilterConfig } from "@/components/common/data-table/data-table-types";
import { Badge } from "@/components/ui/badge";
import type { FinanceTransactionRecord } from "../types/finance.types";

const columns: ColumnDef<FinanceTransactionRecord>[] = [
  {
    accessorKey: "id",
    header: "交易号",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium text-foreground">{row.original.id}</p>
        <p className="text-xs text-muted-foreground">{row.original.time}</p>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "类型",
    cell: ({ row }) => <span className="text-sm">{row.original.type}</span>,
  },
  {
    accessorKey: "amount",
    header: "金额",
    cell: ({ row }) => {
      const isIncome = row.original.amount.startsWith("+");

      return (
        <span className={isIncome ? "font-medium text-emerald-600" : "font-medium text-red-600"}>
          {row.original.amount}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "已到账"
            ? "success"
            : row.original.status === "处理中"
              ? "warning"
              : "secondary"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
];

const filters: DataTableFilterConfig<FinanceTransactionRecord>[] = [
  {
    id: "type",
    label: "交易类型",
    options: [
      { label: "销售收入", value: "销售收入" },
      { label: "退款支出", value: "退款支出" },
      { label: "平台佣金", value: "平台佣金" },
      { label: "提现", value: "提现" },
    ],
    valueGetter: (row) => row.type,
  },
  {
    id: "status",
    label: "到账状态",
    options: [
      { label: "已到账", value: "已到账" },
      { label: "已退款", value: "已退款" },
      { label: "已扣除", value: "已扣除" },
      { label: "处理中", value: "处理中" },
    ],
    valueGetter: (row) => row.status,
  },
];

type TransactionsTableProps = {
  data: FinanceTransactionRecord[];
};

export function TransactionsTable({ data }: TransactionsTableProps) {
  const incomeCount = data.filter((item) => item.type === "销售收入").length;

  return (
    <DataTable
      columns={columns}
      data={data}
      filters={filters}
      meta={`共 ${data.length} 条记录，收入类 ${incomeCount} 条`}
      pageSizeOptions={[4, 6, 8]}
      searchKeys={["id", "type", "status"]}
      searchPlaceholder="搜索交易号或类型..."
    />
  );
}
