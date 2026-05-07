import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function RefundsPage() {
  return (
    <>
      <PageHeader
        description="售后申请、退款进度和争议处理会在这里统一收口，便于持续跟踪。"
        title="售后管理"
      />
      <EmptyState
        actionHref="/orders"
        actionLabel="前往订单管理"
        description="售后流程页暂时使用占位内容，后续可以补上状态时间线、责任归因和自动审批规则。"
        title="售后流程待接入"
      />
    </>
  );
}
