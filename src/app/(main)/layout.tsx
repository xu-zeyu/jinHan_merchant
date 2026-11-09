import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MainRouteGuard } from "@/features/auth/components/main-route-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainRouteGuard>
      <div className="glass-canvas flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <Header />
          <main className="flex-1 px-4 py-7 sm:px-8 sm:py-8">
            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </MainRouteGuard>
  );
}
