"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "猫粮", value: 32000, color: "#FFB84D" },
  { name: "狗粮", value: 24000, color: "#F59E0B" },
  { name: "零食", value: 15000, color: "#FCD34D" },
  { name: "用品", value: 10000, color: "#FDE68A" },
  { name: "保健品", value: 5420, color: "#FEF3C7" },
];

export function CategoryChart() {
  return (
    <div className="flex items-center gap-8">
      <div className="h-[240px] w-[240px] shrink-0">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--background))",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number) => [`¥${value.toLocaleString()}`, "销售额"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-medium">
              {((item.value / 86420) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
