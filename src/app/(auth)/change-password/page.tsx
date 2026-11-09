import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { MainRouteGuard } from "@/features/auth/components/main-route-guard";

export default function ChangePasswordPage() {
  return (
    <MainRouteGuard>
      <div className="flex w-full flex-col justify-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            ACCOUNT SECURITY
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            修改密码
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            修改成功后，请使用新密码重新登录。
          </p>
        </div>
        <ChangePasswordForm />
      </div>
    </MainRouteGuard>
  );
}
