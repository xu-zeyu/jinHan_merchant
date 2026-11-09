"use client";

import { useQueryClient } from "@tanstack/react-query";
import { KeyRound, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/features/auth/store/use-auth-store";

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const account = useAuthStore((state) => state.account);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    queryClient.clear();
    logout();
    router.replace(ROUTES.LOGIN);
  };

  const displayName = account?.displayName ?? account?.username ?? "管理员";
  const initial = displayName.slice(0, 1);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 px-2" variant="ghost">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initial}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start text-left sm:flex">
            <span className="text-sm font-medium">{displayName}</span>
            <span className="text-xs text-muted-foreground">
              {account?.superAdmin ? "超级管理员" : "管理员"}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{displayName}</p>
          <p className="text-xs font-normal text-muted-foreground">
            {account?.username}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={ROUTES.CHANGE_PASSWORD}>
              <KeyRound className="mr-2 h-4 w-4" />
              修改密码
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <UserRound className="mr-2 h-4 w-4" />
            {account?.phone ?? "未配置手机号"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
