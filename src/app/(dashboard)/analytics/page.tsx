import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        description="后续在这里承接销售趋势、会员留存和广告投放分析，保持可视化优先。"
        title="数据分析"
      />
      <EmptyState
        actionHref="/finance"
        actionLabel="查看财务页"
        description="图表和指标卡还未接入真实数据源，但路由已经具备有效默认导出，不会再因空文件导致编译错误。"
        title="分析看板建设中"
      />
    </>
  );
}
