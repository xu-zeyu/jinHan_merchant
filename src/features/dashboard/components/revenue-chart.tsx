"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "5/1", revenue: 8200 },
  { day: "5/2", revenue: 9300 },
  { day: "5/3", revenue: 7800 },
  { day: "5/4", revenue: 11200 },
  { day: "5/5", revenue: 10500 },
  { day: "5/6", revenue: 12800 },
  { day: "5/7", revenue: 12480 },
];

export function RevenueChart() {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFB84D" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#FFB84D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="day"
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => `¥${value}`}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number) => [`¥${value.toLocaleString()}`, "销售额"]}
          />
          <Area
            dataKey="revenue"
            fill="url(#revenueGradient)"
            stroke="#FFB84D"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
