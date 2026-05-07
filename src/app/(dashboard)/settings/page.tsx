import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        description="集中管理店铺资料、团队权限和系统偏好，保持后台设置入口清晰。"
        title="系统设置"
      />
      <EmptyState
        actionHref="/dashboard"
        actionLabel="返回工作台"
        description="设置模块已经有可访问页面，下一步适合接入资料表单、权限矩阵和通知偏好。"
        title="设置中心待完善"
      />
    </>
  );
}
