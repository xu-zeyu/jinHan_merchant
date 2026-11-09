"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KeyRound,
  LayoutGrid,
  type LucideIcon,
  PawPrint,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { useMenus } from "@/features/auth/hooks/use-me";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import type { MenuItem } from "@/features/auth/types/auth.types";
import { cn } from "@/lib/cn";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

const ICON_BY_CODE: Record<string, LucideIcon> = {
  system: Settings,
  accounts: Users,
  roles: KeyRound,
  permissions: ShieldCheck,
  users: Users,
};

/** 后端菜单未包含 C 端用户入口时，前端按权限补挂（菜单仅导航，接口独立鉴权） */
function useNavTree(): { items: MenuItem[]; isLoading: boolean } {
  const { data: menus, isLoading } = useMenus();
  const canReadUsers = useHasPermission(PERMISSION_CODES.USER_READ);

  const items = useMemo(() => {
    const tree: MenuItem[] = [...(menus ?? [])];
    const hasUsers = tree.some(
      (item) => item.code === "users" || item.path === ROUTES.USERS
    );
    if (!hasUsers && canReadUsers) {
      tree.push({ code: "users", title: "用户", path: ROUTES.USERS, children: [] });
    }
    return tree;
  }, [menus, canReadUsers]);

  return { items, isLoading };
}

function MenuLink({ item, onNavigate }: { item: MenuItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const Icon = ICON_BY_CODE[item.code] ?? LayoutGrid;

  if (item.children.length > 0) {
    return (
      <div>
        <p className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {item.title}
        </p>
        <div className="space-y-1">
          {item.children.map((child) => (
            <MenuLink key={child.code} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    );
  }

  if (!item.path) return null;

  const isActive =
    pathname === item.path || pathname.startsWith(`${item.path}/`);

  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "border-white/75 bg-white/60 text-foreground shadow-[0_8px_18px_-12px_rgba(31,45,65,.35)] dark:border-white/15 dark:bg-white/10"
          : "border-transparent text-muted-foreground hover:bg-white/35 hover:text-foreground dark:hover:bg-white/10"
      )}
      href={item.path}
      onClick={onNavigate}
    >
      <Icon className={cn("h-4 w-4", isActive && "text-brand-strong")} />
      <span>{item.title}</span>
    </Link>
  );
}

/** 侧边栏：菜单树由 /api/admin/auth/menus 按权限返回（ADMIN-V1-03） */
export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { items, isLoading } = useNavTree();
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-white/35 px-5 dark:border-white/10">
        <div className="glass-highlight flex h-10 w-10 items-center justify-center rounded-2xl">
          <PawPrint className="h-5 w-5 text-brand-strong" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">PetTown</span>
          <span className="text-[10px] tracking-wider text-muted-foreground">ADMIN CONSOLE</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">工作区</p>
        <Link
          className={cn(
            "mb-3 flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
            pathname === ROUTES.HOME
              ? "border-white/75 bg-white/60 text-foreground shadow-[0_8px_18px_-12px_rgba(31,45,65,.35)] dark:border-white/15 dark:bg-white/10"
              : "border-transparent text-muted-foreground hover:bg-white/35 hover:text-foreground dark:hover:bg-white/10"
          )}
          href={ROUTES.HOME}
          onClick={onNavigate}
        >
          <LayoutDashboard className={cn("h-4 w-4", pathname === ROUTES.HOME && "text-brand-strong")} /> 概览
        </Link>
        {isLoading ? (
          <div className="space-y-2 px-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-full rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="px-3 py-6 text-xs leading-5 text-muted-foreground">
            暂无可见菜单，请联系管理员为当前角色分配权限。
          </p>
        ) : (
          items.map((item) => <MenuLink key={item.code} item={item} onNavigate={onNavigate} />)
        )}
      </nav>
      <div className="border-t border-white/35 px-4 py-4 dark:border-white/10">
        <div className="glass-soft rounded-2xl px-3 py-3">
          <p className="text-xs font-medium">安全管理工作台</p>
          <p className="mt-1 text-[11px] text-muted-foreground">PetTown · v1.0</p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="glass-surface m-4 mr-0 hidden h-[calc(100vh-2rem)] w-[252px] shrink-0 overflow-hidden rounded-[28px] lg:block">
      <SidebarContent />
    </aside>
  );
}
