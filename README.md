# 宠物产品管理后台（PetTown Admin）

金晗宠物产品管理后台。范围以 TAPD `32445978` 的 **v1.0.0 需求池**为准：
管理员认证与账号管理、角色与权限管理、C 端用户与宠物数据查看。
接口契约来源：Apifox 项目 `9001157`（PetTown 管理后台接口，`Result<T>` 统一包络）。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS + shadcn/ui
- **状态管理**: Zustand（会话）+ TanStack Query（服务端状态）
- **表单**: React Hook Form + Zod

## 功能模块（对应 TAPD 需求）

| 模块 | 需求 | 说明 |
|---|---|---|
| 概览 | 通用后台入口 | 按当前权限展示模块与真实列表总数 |
| 登录与验证码 | ADMIN-V1-01 / 02 | 图形验证码 + 用户名密码登录 |
| 会话与菜单 | ADMIN-V1-03 | 当前管理员信息、权限码、按权限返回菜单 |
| 管理员账号 | ADMIN-V1-04~08 | 分页查询、创建、编辑、启停、删除、重置密码、强制改密 |
| 角色与权限 | ADMIN-V1-09~11 | 角色 CRUD、权限分配、权限目录查询与同步 |
| C 端用户 | ADMIN-V1-12 / 13 | 用户分页/详情/封禁解封、宠物数据查看 |

## 项目结构

```
src/
├── app/              # (auth) 登录/改密；(main) 系统管理与用户管理
├── features/         # auth / account / role / user（Feature-First 自闭环）
├── components/       # ui / common / layout
├── services/         # api-client（Result<T> 解包 + Bearer Token）
├── providers/        # TanStack Query Provider
├── permissions/      # 内置权限码（与后端 AdminPermissionCodes 对齐）
├── constants/        # 路由 / 接口 / 应用配置
├── types/            # 共享类型（ApiResult / PageResult）
├── hooks/            # use-toast 等
└── lib/              # cn 等工具
```

## 快速开始

```bash
npm install
cp .env.example .env.local   # 配置 API_PROXY_TARGET（默认 http://127.0.0.1:8081）
npm run dev                  # http://localhost:3000
```

前端通过 Next.js rewrites 将 `/api/admin/*` 代理到后端管理服务，避免跨域。

界面参考 [Glassmorphism Admin Panel UI](https://github.com/nesdesignco/Glassmorphism-Admin-Panel-UI) 的玻璃层次、主题切换和后台结构，并保留本项目的真实 API 契约。桌面端和窄屏均可导航，支持暖金、薄荷、雾紫及深浅色切换；管理员与用户列表使用 TanStack Table 展示服务端分页数据。页面入口按权限显示，服务端仍负责最终鉴权。

## 开发规范

详见 [AGENT.md](./AGENT.md)。核心原则：

1. **Feature-First 架构** — 业务模块独立自闭环
2. **Server Components 优先** — 仅表单/交互使用 "use client"
3. **类型安全** — 禁止 any；接口类型对齐 Apifox 契约
4. **单一职责** — 单文件不超过 300 行；API 一请求一文件
5. **极简设计** — 卡片化、留白、柔和阴影

## 状态

- v1.0.0 管理端 13 条需求页面与 API 对接已完成本地交付（2026-11-09）。
- 后端服务需本地运行于 `API_PROXY_TARGET`；联调验收以 TAPD 需求验收标准为准。
