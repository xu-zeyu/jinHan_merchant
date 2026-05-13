import { CompactStatGrid } from "@/components/common/compact-stat-grid";
import { PageHeader } from "@/components/common/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { refunds, refundStats } from "@/features/refund/constants/refund.constants";
import { RefundsTable } from "@/features/refund/components/refunds-table";

export default function RefundsViewPage() {
  return (
    <div className="space-y-4">
      <CompactStatGrid items={refundStats} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <RefundsTable data={refunds} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
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
            <CardHeader className="pb-2">
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
