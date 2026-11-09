import { Suspense } from "react";

import { AuthPageGuard } from "@/features/auth/components/auth-page-guard";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageGuard>
        <div className="mx-auto flex w-full max-w-md flex-col justify-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">
              Sign In
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              登录管理后台
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              使用管理员账号登录（ADMIN-V1-02）
            </p>
          </div>
          <LoginForm />
        </div>
      </AuthPageGuard>
    </Suspense>
  );
}
