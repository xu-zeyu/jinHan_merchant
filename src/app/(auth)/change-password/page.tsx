import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { MainRouteGuard } from "@/features/auth/components/main-route-guard";

export default function ChangePasswordPage() {
  return (
    <MainRouteGuard>
      <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">
            Security
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            修改密码
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            首次登录或密码被重置后须修改密码；成功后请使用新密码重新登录（ADMIN-V1-08）。
          </p>
        </div>
        <ChangePasswordForm />
      </div>
    </MainRouteGuard>
  );
}
