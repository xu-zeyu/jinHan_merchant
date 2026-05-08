import { PageHeader } from "@/components/common/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { orderStats, orders } from "@/features/order/constants/order.constants";
import { OrdersTable } from "@/features/order/components/orders-table";

export default function OrdersPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        description="收拢待发货、异常单和履约超时信息，让操作区更聚焦。"
        title="订单管理"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {orderStats.map(({ label, value, hint }) => (
          <Card key={label}>
            <CardHeader className="space-y-2 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{hint}</p>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>订单列表</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
            <OrdersTable data={orders} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">履约提醒</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-medium">10 笔待发货接近 SLA</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  建议优先处理同城急送与高客单订单。
                </p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-medium">2 笔异常地址待确认</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  地址异常会拖慢整体发货节奏。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">今日节奏</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">上午出单</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">同城急送</span>
                <span className="font-medium">18 单</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">完成履约</span>
                <span className="font-medium">31 单</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
