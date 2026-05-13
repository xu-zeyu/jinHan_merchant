import { Download } from "lucide-react";

import { CompactStatGrid } from "@/components/common/compact-stat-grid";
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

export default function FinanceViewPage() {
  return (
    <div className="space-y-4">
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

      <CompactStatGrid items={financeStats} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>交易明细</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <TransactionsTable data={transactions} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
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
            <CardHeader className="pb-2">
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
