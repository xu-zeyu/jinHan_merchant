import { ArrowDown, ArrowUp, Download, Search } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { financeStats, transactions } from "@/features/finance/constants/finance.constants";
import { TransactionsTable } from "@/features/finance/components/transactions-table";

export default function FinancePage() {
  return (
    <div className="space-y-5">
      <PageHeader
        action={
          <Button size="sm" variant="outline">
            <Download className="h-3.5 w-3.5" />
            导出账单
          </Button>
        }
        description="把收款、退款和佣金分层展示，避免财务信息挤在一张表里。"
        title="财务系统"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {financeStats.map(({ label, value, hint }) => (
          <Card key={label}>
            <CardHeader className="space-y-2 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                {label === "本月收入" ? (
                  <ArrowUp className="h-4 w-4 text-emerald-500" />
                ) : null}
                {label === "本月支出" ? (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                ) : null}
              </div>
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
            <CardTitle>交易明细</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
            <TransactionsTable data={transactions} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">资金节奏</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-medium">今日入账峰值 14:00-18:00</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  建议把提现审核安排在晚高峰后集中处理。
                </p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-medium">退款支出占比 14.7%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  主要来自售后中的质量问题与破损单。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">对账快照</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">待结算收入</span>
                <span className="font-medium">¥8,420</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">处理中提现</span>
                <span className="font-medium">1 笔</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">今日退款</span>
                <span className="font-medium">¥484</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
