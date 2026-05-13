import type { ReactNode } from "react";

import { AuthPageGuard } from "@/features/auth/components/auth-page-guard";

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
                Merchant Suite
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900">
                为宠物商家打造的
                <br />
                轻盈运营后台
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                覆盖商品、订单、会员、财务和 AI 运营能力，界面保持温和、清晰、低负担。
              </p>
            </div>
            <div className="rounded-[28px] bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">今日建议</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                先完成店铺基础信息、物流模板和主推商品卡片，后台就能进入可用状态。
              </p>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <AuthPageGuard>{children}</AuthPageGuard>
          </div>
        </div>
      </div>
    </div>
  );
}
