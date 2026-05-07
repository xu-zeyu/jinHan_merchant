import { Bell, Search } from "lucide-react";

import { APP_CONFIG } from "@/constants/app-config";

import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/70 bg-[#fffaf2]/90 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground shadow-sm sm:flex">
          宠
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">
            {APP_CONFIG.name}
          </p>
          <p className="truncate text-xs text-slate-500">
            面向宠物商家的现代化运营后台
          </p>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center lg:flex">
        <label className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/90 bg-white/95 px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            aria-label="站内搜索"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="搜索商品、订单、会员或页面..."
            type="text"
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="通知"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-600 shadow-sm transition hover:text-primary-700"
          type="button"
        >
          <Bell className="h-4 w-4" />
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
