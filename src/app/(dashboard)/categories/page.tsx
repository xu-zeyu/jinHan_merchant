import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        description="按宠物类型、功能需求和品牌结构组织类目，方便商家快速维护商品归档。"
        title="宠物分类"
      />
      <EmptyState
        actionHref="/products"
        actionLabel="查看商品模块"
        description="当前先提供稳定路由占位，后续可以增加类目树、属性模板和批量归类能力。"
        title="分类结构准备中"
      />
    </>
  );
}
