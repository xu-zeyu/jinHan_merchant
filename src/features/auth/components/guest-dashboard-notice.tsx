"use client";

import Link from "next/link";
import { Lock, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "../store/use-auth-store";

export function GuestDashboardNotice() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated || isAuthenticated) {
    return null;
  }

  return (
    <Card className="overflow-hidden border border-amber-200 bg-[linear-gradient(135deg,#fff7e8_0%,#ffffff_100%)]">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">当前处于未登录状态</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              现在仅开放工作台预览，登录后即可访问商品、订单、会员、分析和设置等完整能力。
            </p>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link href={ROUTES.LOGIN}>
            去登录
            <LogIn className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
