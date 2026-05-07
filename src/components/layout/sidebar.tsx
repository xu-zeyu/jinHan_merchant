"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Package,
  PawPrint,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

const navItems = [
  { href: ROUTES.DASHBOARD, label: "工作台", icon: LayoutDashboard },
  { href: ROUTES.PRODUCTS, label: "商品管理", icon: Package },
  { href: ROUTES.CATEGORIES, label: "宠物分类", icon: PawPrint },
  { href: ROUTES.ORDERS, label: "订单管理", icon: ShoppingCart },
  { href: ROUTES.REFUNDS, label: "售后管理", icon: CreditCard },
  { href: ROUTES.CUSTOMERS, label: "会员体系", icon: Users },
  { href: ROUTES.ANALYTICS, label: "数据分析", icon: BarChart3 },
  { href: ROUTES.SETTINGS, label: "系统设置", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/70 bg-[linear-gradient(180deg,#fffef9_0%,#fff4df_100%)] px-5 py-6 lg:flex lg:flex-col">
      <div className="rounded-[28px] bg-white/90 p-5 shadow-md shadow-primary-100/40">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-semibold text-primary-foreground">
            宠
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">JinHan Merchant</p>
            <p className="text-xs text-slate-500">Pet Commerce Admin</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
              }`}
              href={href}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-[28px] border border-primary-100 bg-white/90 p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">AI 助手已待命</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          下一步可以接入商品标题生成、宠物类目建议和营销文案工作流。
        </p>
      </div>
    </aside>
  );
}
