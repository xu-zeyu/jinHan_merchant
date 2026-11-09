import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff2d6_0%,#fff8eb_35%,#ffffff_100%)] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/80 bg-white/90 shadow-xl shadow-primary-100/40 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden bg-[linear-gradient(160deg,#ffefcc_0%,#fff7e6_45%,#fdfdfb_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-700 shadow-sm">
                PetTown Admin
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900">
                宠物产品
                <br />
                管理后台
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                管理员账号与角色权限、C 端用户与宠物数据，一处清晰可控。
              </p>
            </div>
            <div className="rounded-[28px] bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">安全提示</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                首次登录请立即修改初始密码；账号停用后所有会话将立即失效。
              </p>
            </div>
          </div>
          <div className="p-6 md:p-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
