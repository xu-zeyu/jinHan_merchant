# 架构与技术栈（扫描草稿）

- 入口：Next.js App Router，`src/app/page.tsx` 重定向 `/dashboard`；`src/app/(main)` 与 `src/app/(auth)` 分别承载后台和认证页面。
- 组织方式：路由页引用 `src/features/*/views`；通用 UI 位于 `src/components/ui`，通用布局位于 `src/components/layout`。
- 依赖：`package.json` 声明 Next.js `^15.0.0`、React `^19.0.0`、TypeScript `^5.6.0`、Tailwind CSS `^3.4.0`、Zustand `^5.0.0`、TanStack Query `^5.56.0`、Recharts `^2.12.0`。这些是声明范围，不等于运行时实测版本。
- 构建：`package-lock.json` 存在；`package.json` 提供 `dev`、`build`、`start`、`lint`、`type-check`，无 `test` 脚本及 Node engines 约束。
- 数据与服务：多数页面从组件内数组或 `constants` 读取静态数据。`src/constants/api-endpoints.ts` 是端点清单；当前 `src/services` 中未发现实际请求实现。`.env.example` 的 API、数据库与 AI 变量仅为模板，不证明连接。
- 状态与权限：Zustand 认证状态持久化在浏览器 localStorage，并同步普通 cookie；`middleware.ts` 的校验/重定向逻辑和主布局守卫均被注释。
- UI 现状：`src/app/globals.css` 与 `tailwind.config.ts` 定义橙色主色、明暗主题变量和圆角；Radix UI 封装位于 `src/components/ui`。用户明确排除本项目的单独 UI 交付，故本次不产出 UI 规范文件。

证据：`package.json`、`package-lock.json`、`src/app`、`src/features`、`src/services`、`middleware.ts`、`src/app/globals.css`、`tailwind.config.ts`。扫描日期：2026-11-09；尚未经过人工确认。
