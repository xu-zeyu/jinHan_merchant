import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        description="围绕会员分层、复购行为和宠物画像做精细化运营，而不是堆积表格。"
        title="会员体系"
      />
      <EmptyState
        actionHref="/analytics"
        actionLabel="查看数据分析"
        description="会员模块后续适合接入标签体系、宠物档案和自动化营销分群。当前页面已经可稳定访问。"
        title="会员运营能力待扩展"
      />
    </>
  );
}
