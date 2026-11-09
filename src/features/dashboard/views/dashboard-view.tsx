"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, KeyRound, PawPrint, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useMe } from "@/features/auth/hooks/use-me";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import { getDashboardCount, type DashboardCountKind } from "../api/get-dashboard-count";
import { SummaryCard } from "../components/summary-card";

const MODULES = [
  { kind: "users", title: "C 端用户", description: "查看用户与宠物资料", href: ROUTES.USERS, icon: Users, permission: PERMISSION_CODES.USER_READ },
  { kind: "accounts", title: "管理员", description: "维护后台账号", href: ROUTES.ACCOUNTS, icon: PawPrint, permission: PERMISSION_CODES.ACCOUNT_READ },
  { kind: "roles", title: "角色", description: "管理角色与权限分配", href: ROUTES.ROLES, icon: KeyRound, permission: PERMISSION_CODES.ROLE_READ },
  { kind: "permissions", title: "权限点", description: "查看权限目录", href: ROUTES.PERMISSIONS, icon: ShieldCheck, permission: PERMISSION_CODES.PERMISSION_READ },
] as const;

function ModuleCard({ module }: { module: (typeof MODULES)[number] }) {
  const enabled = useHasPermission(module.permission);
  const query = useQuery({
    queryKey: ["dashboard", module.kind],
    queryFn: () => getDashboardCount(module.kind as DashboardCountKind),
    enabled,
  });
  if (!enabled) return null;
  return (
    <SummaryCard
      count={query.data}
      description={module.description}
      error={query.isError}
      href={module.href}
      icon={module.icon}
      loading={query.isPending}
      title={module.title}
    />
  );
}

export function DashboardView() {
  const { data: me } = useMe();
  const visible = MODULES.filter((module) => me?.account.superAdmin || me?.permissions.includes(module.permission));
  const name = me?.account.displayName ?? me?.account.username ?? "管理员";

  return (
    <>
      <PageHeader title="概览" description="管理工作区中的账号、权限与用户资料。" />
      <section className="glass-highlight relative overflow-hidden rounded-[30px] p-7 sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-8rem] right-48 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-400/10" />
        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-strong">PetTown Admin</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">你好，{name}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">这里汇总你有权限查看的管理模块。数据来自当前后台接口。</p>
          </div>
          {visible[0] ? (
            <Link className="glass-soft inline-flex items-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/65 dark:hover:bg-white/10 sm:self-auto" href={visible[0].href}>
              进入{visible[0].title}<ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </section>
      <div className="flex items-end justify-between">
        <div><h2 className="text-base font-semibold">管理概况</h2><p className="mt-1 text-xs text-muted-foreground">当前权限范围内的实时总数</p></div>
        <span className="text-xs text-muted-foreground">{visible.length} 个可用模块</span>
      </div>
      {visible.length ? (
        <section aria-label="管理模块" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MODULES.map((module) => <ModuleCard key={module.kind} module={module} />)}
        </section>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            当前账号暂无可用模块，请联系管理员分配权限。
          </CardContent>
        </Card>
      )}
      {visible.length ? (
        <section className="glass-surface rounded-2xl p-5 sm:p-6">
          <h2 className="text-base font-semibold">快速访问</h2>
          <p className="mt-1 text-xs text-muted-foreground">直接进入常用管理页面</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {visible.map((module) => {
              const Icon = module.icon;
              return (
                <Link className="glass-soft group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-white/65 dark:hover:bg-white/10" href={module.href} key={module.kind}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-brand-strong"><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{module.title}</p><p className="truncate text-xs text-muted-foreground">{module.description}</p></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
