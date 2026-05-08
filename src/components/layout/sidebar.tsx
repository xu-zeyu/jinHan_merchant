"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LoaderCircle,
  Package,
  PawPrint,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";

const mainNavItems = [
  { href: ROUTES.DASHBOARD, label: "工作台", icon: LayoutDashboard },
  { href: ROUTES.PRODUCTS, label: "商品管理", icon: Package },
  { href: ROUTES.CATEGORIES, label: "宠物分类", icon: PawPrint },
  { href: ROUTES.ORDERS, label: "订单管理", icon: ShoppingCart },
  { href: ROUTES.REFUNDS, label: "售后管理", icon: CreditCard },
  { href: ROUTES.CUSTOMERS, label: "会员体系", icon: Users },
];

const bottomNavItems = [
  { href: ROUTES.ANALYTICS, label: "数据分析", icon: BarChart3 },
  { href: ROUTES.SETTINGS, label: "系统设置", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    [...mainNavItems, ...bottomNavItems].forEach(({ href }) => {
      router.prefetch(href);
    });
  }, [router]);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  useEffect(() => {
    if (!pendingHref) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPendingHref(null);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [pendingHref]);

  return (
    <aside className="hidden h-full w-64 shrink-0 border-r border-border/40 bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-border/40 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
          <PawPrint className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">JinHan</span>
          <span className="text-[10px] text-muted-foreground">Merchant Admin</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            菜单
          </span>
        </div>
        {mainNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== ROUTES.DASHBOARD && pathname.startsWith(href));
          const isPending = pendingHref === href && !isActive;

          return (
            <Link
              aria-busy={isPending}
              key={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary-700"
                  : isPending
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              href={href}
              onClick={() => {
                if (!isActive) {
                  setPendingHref(href);
                }
              }}
              prefetch
            >
              {isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
              )}
              <span>{label}</span>
            </Link>
          );
        })}

        <div className="px-3 pb-2 pt-6">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            工具
          </span>
        </div>
        {bottomNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href);
          const isPending = pendingHref === href && !isActive;

          return (
            <Link
              aria-busy={isPending}
              key={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary-700"
                  : isPending
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              href={href}
              onClick={() => {
                if (!isActive) {
                  setPendingHref(href);
                }
              }}
              prefetch
            >
              {isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
              )}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/40 p-4">
        <div className="rounded-xl bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary-700">AI 助手</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            试试用 AI 生成商品标题、类目建议和营销文案
          </p>
        </div>
      </div>
    </aside>
  );
}
