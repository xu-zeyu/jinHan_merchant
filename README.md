# 宠物电商商家后台

现代化 SaaS 风格宠物电商商家后台管理系统

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS + shadcn/ui
- **状态管理**: Zustand + TanStack Query
- **表单**: React Hook Form + Zod
- **动画**: Framer Motion
- **图表**: Recharts

## 项目结构

```
src/
├── app/              # Next.js App Router 页面
├── features/         # 业务功能模块（Feature-First 架构）
├── components/       # 通用组件
├── services/         # 服务层
├── stores/           # Zustand 状态管理
├── hooks/            # 自定义 Hooks
├── providers/        # Context Providers
├── permissions/      # 权限系统
├── constants/        # 常量配置
├── types/            # TypeScript 类型
└── lib/              # 工具函数
```

## 快速开始

### 安装依赖

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 配置环境变量

复制 `.env.example` 到 `.env.local` 并填写配置：

```bash
cp .env.example .env.local
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 开发规范

详见 [AGENT.md](./AGENT.md) 和 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### 核心原则

1. **Feature-First 架构** - 业务模块独立自闭环
2. **Server Components 优先** - 默认使用服务端组件
3. **类型安全** - 禁止使用 any
4. **单一职责** - 单文件不超过 300 行
5. **极简设计** - 参考 Shopify/Linear/Vercel 风格

## 功能模块

- ✅ 商品管理
- ✅ 宠物分类
- ✅ 订单管理
- ✅ 售后管理
- ✅ 会员体系
- ✅ AI 商品生成
- ✅ AI 文案生成
- ✅ 数据分析
- ✅ 财务系统
- ✅ 权限系统

## License

MIT
