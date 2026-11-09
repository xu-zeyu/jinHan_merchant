import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/common/toaster";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "宠物产品管理后台",
  description: "PetTown 宠物产品管理后台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
