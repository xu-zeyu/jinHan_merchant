"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";

import { DataTable } from "@/components/common/data-table/data-table";
import type { DataTableFilterConfig } from "@/components/common/data-table/data-table-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OrderRecord } from "../types/order.types";

const statusVariantMap: Record<OrderRecord["status"], "default" | "secondary" | "success" | "warning"> = {
  "已完成": "success",
  "已发货": "secondary",
  "待发货": "warning",
  "待处理": "default",
};

const columns: ColumnDef<OrderRecord>[] = [
  {
    accessorKey: "id",
    header: "订单号",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium text-foreground">{row.original.id}</p>
        <p className="text-xs text-muted-foreground">{row.original.time}</p>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "客户",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium text-foreground">{row.original.customer}</p>
        <p className="text-xs text-muted-foreground">{row.original.delivery}</p>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: "商品数",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.items} 件</span>
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

const filters: DataTableFilterConfig<OrderRecord>[] = [
  {
    id: "status",
    label: "订单状态",
    options: [
      { label: "待发货", value: "待发货" },
      { label: "已发货", value: "已发货" },
      { label: "已完成", value: "已完成" },
      { label: "待处理", value: "待处理" },
    ],
    valueGetter: (row) => row.status,
  },
  {
    id: "delivery",
    label: "履约方式",
    options: [
      { label: "普通快递", value: "普通快递" },
      { label: "同城急送", value: "同城急送" },
      { label: "门店自提", value: "门店自提" },
    ],
    valueGetter: (row) => row.delivery,
  },
];

type OrdersTableProps = {
  data: OrderRecord[];
};

export function OrdersTable({ data }: OrdersTableProps) {
  const pendingCount = data.filter((item) => item.status === "待发货").length;

  return (
    <DataTable
      actions={
        <Button size="sm" variant="outline">
          <ArrowUpDown className="h-3.5 w-3.5" />
          排序
        </Button>
      }
      columns={columns}
      data={data}
      filters={filters}
      meta={`共 ${data.length} 笔订单，待发货 ${pendingCount} 笔`}
      searchKeys={["id", "customer"]}
      searchPlaceholder="搜索订单号或客户..."
    />
  );
}
