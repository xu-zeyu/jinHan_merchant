import { CompactStatGrid } from "@/components/common/compact-stat-grid";
import { PageHeader } from "@/components/common/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { orderStats, orders } from "@/features/order/constants/order.constants";
import { OrdersTable } from "@/features/order/components/orders-table";

export default function OrdersViewPage() {
  return (
    <div className="space-y-4">
      <CompactStatGrid items={orderStats} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <OrdersTable data={orders} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
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
            <CardHeader className="pb-2">
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
