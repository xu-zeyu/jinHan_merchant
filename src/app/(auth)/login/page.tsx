import { Suspense } from "react";

import { AuthPageGuard } from "@/features/auth/components/auth-page-guard";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageGuard>
        <div className="flex w-full flex-col justify-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              WELCOME BACK
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              登录工作台
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              输入管理员账号与密码以继续。
            </p>
          </div>
          <LoginForm />
        </div>
      </AuthPageGuard>
    </Suspense>
  );
}
