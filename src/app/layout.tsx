import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "宠物电商商家后台",
  description: "现代化 SaaS 风格宠物电商商家后台管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  );
}
