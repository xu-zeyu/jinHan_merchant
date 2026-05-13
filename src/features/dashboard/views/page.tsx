import {
  ArrowUpRight,
  CreditCard,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RevenueChart } from "../components/revenue-chart";

const stats = [
  {
    label: "今日销售额",
    value: "¥12,480",
    change: "+18.2%",
    icon: TrendingUp,
    trend: "up" as const,
  },
  {
    label: "在售商品",
    value: "128",
    change: "6 个待优化",
    icon: Package,
    trend: "neutral" as const,
  },
  {
    label: "待处理订单",
    value: "36",
    change: "8 单需发货",
    icon: ShoppingCart,
    trend: "warning" as const,
  },
  {
    label: "活跃会员",
    value: "2,486",
    change: "+132 本周",
    icon: Users,
    trend: "up" as const,
  },
];

const recentOrders = [
  { id: "ORD-20240501", customer: "张女士", product: "皇家猫粮 2kg", amount: "¥328", status: "已发货" },
  { id: "ORD-20240502", customer: "李先生", product: "宠物智能饮水机", amount: "¥199", status: "待发货" },
  { id: "ORD-20240503", customer: "王女士", product: "狗狗磨牙棒套装", amount: "¥89", status: "已完成" },
  { id: "ORD-20240504", customer: "赵先生", product: "猫砂 10L×2", amount: "¥156", status: "待发货" },
  { id: "ORD-20240505", customer: "刘女士", product: "宠物营养膏", amount: "¥128", status: "已发货" },
];

const statusVariantMap: Record<string, "success" | "warning" | "secondary"> = {
  "已完成": "success",
  "已发货": "secondary",
  "待发货": "warning",
};

export default function DashboardViewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">商家工作台</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          聚焦店铺健康度、销售转化和待办事项
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon, trend }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : trend === "warning"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-primary/10 text-primary"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{value}</div>
              <p
                className={`mt-1 text-xs ${
                  trend === "up"
                    ? "text-emerald-600"
                    : trend === "warning"
                      ? "text-amber-600"
                      : "text-muted-foreground"
                }`}
              >
                {change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>收入趋势</CardTitle>
                <CardDescription>过去 7 天销售额变化</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                查看详情
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>最新 5 笔交易</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={order.id}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{order.product}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer} · {order.id}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    <span className="text-sm font-medium">{order.amount}</span>
                    <Badge variant={statusVariantMap[order.status]}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">今日经营重点</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "检查高销量猫粮库存，避免爆款断货",
              "优先处理超过 24 小时未发货订单",
              "更新宠物零食专题页，准备周末活动",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-background p-3 text-sm"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                  !
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">增长提示</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              小型犬主粮近 7 天点击增长明显，可以优先补充短视频素材和商品卖点文案。
            </p>
            <div className="mt-4 rounded-xl bg-primary/5 p-4">
              <p className="text-xs text-muted-foreground">推荐动作</p>
              <p className="mt-1 text-sm font-semibold">上新 3 款高毛利零食组合</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">快捷操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              新增商品
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              查看订单
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              处理退款
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
