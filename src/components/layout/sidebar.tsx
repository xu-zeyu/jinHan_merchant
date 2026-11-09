"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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

function MenuLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const Icon = ICON_BY_CODE[item.code] ?? LayoutGrid;

  if (item.children.length > 0) {
    return (
      <div>
        <p className="px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {item.title}
        </p>
        <div className="space-y-1">
          {item.children.map((child) => (
            <MenuLink key={child.code} item={child} />
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
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary-700"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
      href={item.path}
    >
      <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
      <span>{item.title}</span>
    </Link>
  );
}

/** 侧边栏：菜单树由 /api/admin/auth/menus 按权限返回（ADMIN-V1-03） */
export function Sidebar() {
  const { items, isLoading } = useNavTree();

  return (
    <aside className="hidden h-full w-64 shrink-0 border-r border-border/40 bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-border/40 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
          <PawPrint className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">PetTown</span>
          <span className="text-[10px] text-muted-foreground">管理后台</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
          items.map((item) => <MenuLink key={item.code} item={item} />)
        )}
      </nav>
    </aside>
  );
}
