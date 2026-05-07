import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        description="集中处理发货、异常单和履约超时问题，降低客服和售后压力。"
        title="订单管理"
      />
      <EmptyState
        actionHref="/dashboard"
        actionLabel="查看今日经营重点"
        description="订单列表页还未接入服务端数据；当前先确保页面和布局结构稳定，避免路由级渲染错误。"
        title="订单工作区待完善"
      />
    </>
  );
}
