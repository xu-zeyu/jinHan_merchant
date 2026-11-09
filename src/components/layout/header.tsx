"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ROUTES } from "@/constants/routes";

import { SidebarContent } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

const TITLES: Record<string, string> = {
  [ROUTES.ACCOUNTS]: "管理员",
  [ROUTES.ROLES]: "角色",
  [ROUTES.PERMISSIONS]: "权限点",
  [ROUTES.USERS]: "C 端用户",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const title = pathname.startsWith(`${ROUTES.USERS}/`)
    ? "用户详情"
    : TITLES[pathname] ?? "工作台";

  return (
    <>
      <header className="glass-surface sticky top-4 z-20 mx-4 mt-4 flex h-16 items-center justify-between gap-2 rounded-2xl px-4 sm:mx-8 sm:px-5">
        <div className="flex items-center gap-2">
          <Button aria-label="打开导航" className="lg:hidden" size="icon" variant="ghost" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="hidden text-sm text-muted-foreground sm:inline">工作区</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">/</span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent className="glass-surface w-72 p-0 pr-0 lg:hidden" side="left">
          <SheetTitle className="sr-only">管理后台导航</SheetTitle>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
