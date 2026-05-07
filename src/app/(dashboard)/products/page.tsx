import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        description="维护商品卡片、售价、库存和营销素材，后续可以接入 AI 商品生成流程。"
        title="商品管理"
      />
      <EmptyState
        actionHref="/dashboard"
        actionLabel="返回工作台"
        description="商品列表和编辑器尚未接入真实数据，当前先保留可运行页面，后续可继续扩展搜索、筛选和批量操作。"
        title="商品模块待接入"
      />
    </>
  );
}
