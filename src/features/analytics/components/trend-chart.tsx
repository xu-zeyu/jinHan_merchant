"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "12月", revenue: 42000, orders: 280 },
  { month: "1月", revenue: 38000, orders: 250 },
  { month: "2月", revenue: 45000, orders: 300 },
  { month: "3月", revenue: 52000, orders: 340 },
  { month: "4月", revenue: 68000, orders: 420 },
  { month: "5月", revenue: 86420, orders: 520 },
];

export function TrendChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="month"
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number, name: string) => [
              name === "revenue" ? `¥${value.toLocaleString()}` : `${value} 单`,
              name === "revenue" ? "销售额" : "订单量",
            ]}
          />
          <Bar
            dataKey="revenue"
            fill="#FFB84D"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
