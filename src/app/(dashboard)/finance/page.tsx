import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function FinancePage() {
  return (
    <>
      <PageHeader
        description="收款、退款、结算和利润表现会在这里统一展示，便于掌握现金流。"
        title="财务系统"
      />
      <EmptyState
        actionHref="/dashboard"
        actionLabel="返回工作台"
        description="财务页目前先保留稳定外壳，后续可扩展交易明细、账期状态和利润分析图表。"
        title="财务模块待接入"
      />
    </>
  );
}
