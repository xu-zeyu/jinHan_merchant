import type { ReactNode } from "react";
import { ArrowUpRight, PawPrint, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="glass-canvas min-h-screen px-4 py-6 sm:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-5 lg:grid-cols-[minmax(360px,43%)_1fr]">
      <div className="glass-highlight hidden flex-col justify-between rounded-[32px] p-10 lg:flex xl:p-14">
        <div className="flex items-center gap-3">
          <div className="glass-surface flex h-10 w-10 items-center justify-center rounded-2xl text-brand-strong"><PawPrint className="h-5 w-5" /></div>
          <div><p className="text-sm font-semibold">PetTown</p><p className="text-[11px] tracking-[0.16em] text-muted-foreground">ADMIN CONSOLE</p></div>
        </div>
        <div className="max-w-md">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-strong">管理工作台</span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.15] tracking-tight">清晰管理，<br />每一项都井然有序。</h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">集中处理账号、权限与用户资料。只呈现当前工作需要的信息。</p>
          <div className="mt-10 space-y-4 border-t border-white/50 pt-6 text-sm dark:border-white/10">
            <div className="flex items-center justify-between"><span>01　账号与角色权限</span><ArrowUpRight className="h-4 w-4 text-muted-foreground" /></div>
            <div className="flex items-center justify-between"><span>02　用户与宠物档案</span><ArrowUpRight className="h-4 w-4 text-muted-foreground" /></div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" /> 仅限授权人员访问</div>
      </div>
      <div className="glass-surface flex min-h-[calc(100vh-3rem)] items-center justify-center rounded-[32px] px-6 py-12 sm:px-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-12 flex items-center gap-2 lg:hidden"><div className="glass-highlight flex h-9 w-9 items-center justify-center rounded-xl"><PawPrint className="h-5 w-5 text-brand-strong" /></div><span className="text-lg font-semibold">PetTown</span></div>
          {children}
        </div>
      </div>
      </div>
    </div>
  );
}
