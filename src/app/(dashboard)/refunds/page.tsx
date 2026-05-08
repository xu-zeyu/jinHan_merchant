import { PageHeader } from "@/components/common/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { refunds, refundStats } from "@/features/refund/constants/refund.constants";
import { RefundsTable } from "@/features/refund/components/refunds-table";

export default function RefundsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        description="把待审核、处理中和已完成状态拆开看，减少售后信息堆叠。"
        title="售后管理"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {refundStats.map(({ label, value, hint }) => (
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
            <CardTitle>售后队列</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
            <RefundsTable data={refunds} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">优先处理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-medium">质量问题单需人工复核</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  当前有 2 单质量争议，建议优先联系仓配侧。
                </p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="font-medium">发错货类可走快速通道</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  模板化沟通能压缩客服往返次数。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">处理效率</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">平均审核时长</span>
                <span className="font-medium">18 分钟</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">自动退款命中</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">重复咨询率</span>
                <span className="font-medium">12%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
