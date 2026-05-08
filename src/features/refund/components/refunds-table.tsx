"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { DataTable } from "@/components/common/data-table/data-table";
import type { DataTableFilterConfig } from "@/components/common/data-table/data-table-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RefundRecord } from "../types/refund.types";

const statusVariantMap: Record<RefundRecord["status"], "default" | "success" | "warning"> = {
  "处理中": "warning",
  "已完成": "success",
  "待审核": "default",
};

const columns: ColumnDef<RefundRecord>[] = [
  {
    accessorKey: "id",
    header: "售后单",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium text-foreground">{row.original.id}</p>
        <p className="text-xs text-muted-foreground">{row.original.orderId}</p>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "客户 / 商品",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium text-foreground">{row.original.customer}</p>
        <p className="max-w-[220px] truncate text-xs text-muted-foreground">
          {row.original.product}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "reason",
    header: "原因",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.reason}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "金额",
    cell: ({ row }) => <span className="font-medium">{row.original.amount}</span>,
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "reviewedAt",
    header: "最近处理",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.reviewedAt}</span>
    ),
  },
  {
    id: "action",
    header: "操作",
    cell: () => (
      <Button size="sm" variant="ghost">
        <Eye className="h-3.5 w-3.5" />
        详情
      </Button>
    ),
  },
];

const filters: DataTableFilterConfig<RefundRecord>[] = [
  {
    id: "status",
    label: "售后状态",
    options: [
      { label: "待审核", value: "待审核" },
      { label: "处理中", value: "处理中" },
      { label: "已完成", value: "已完成" },
    ],
    valueGetter: (row) => row.status,
  },
  {
    id: "reason",
    label: "申请原因",
    options: [
      { label: "商品破损", value: "商品破损" },
      { label: "不想要了", value: "不想要了" },
      { label: "发错货", value: "发错货" },
      { label: "质量问题", value: "质量问题" },
      { label: "尺寸不符", value: "尺寸不符" },
    ],
    valueGetter: (row) => row.reason,
  },
];

type RefundsTableProps = {
  data: RefundRecord[];
};

export function RefundsTable({ data }: RefundsTableProps) {
  const pendingCount = data.filter((item) => item.status !== "已完成").length;

  return (
    <DataTable
      columns={columns}
      data={data}
      filters={filters}
      meta={`共 ${data.length} 笔售后，处理中 / 待审核 ${pendingCount} 笔`}
      searchKeys={["id", "orderId", "customer", "product"]}
      searchPlaceholder="搜索售后单、订单号或客户..."
    />
  );
}
