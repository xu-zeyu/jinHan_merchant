# 宠物电商商家后台 - 完整目录结构

## 根目录
```
jinHan_merchant/
├── src/
├── public/
├── .next/
├── node_modules/
├── .claude/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── .env.local
├── .env.example
├── README.md
├── AGENT.md
└── PROJECT_STRUCTURE.md
```

## src/ 完整结构

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── categories/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── refunds/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── ai/
│   │   │   ├── product-generator/
│   │   │   │   └── page.tsx
│   │   │   └── content-writer/
│   │   │       └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── finance/
│   │   │   ├── page.tsx
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx
│   │   │   └── settlements/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── store/
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   └── page.tsx
│   │   │   └── permissions/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   └── route.ts
│   │   ├── orders/
│   │   │   └── route.ts
│   │   └── ai/
│   │       └── generate/
│   │           └── route.ts
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── register.ts
│   │   │   └── refresh-token.ts
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── forgot-password-form.tsx
│   │   ├── hooks/
│   │   │   ├── use-auth.ts
│   │   │   └── use-login.ts
│   │   ├── store/
│   │   │   └── use-auth-store.ts
│   │   ├── schemas/
│   │   │   ├── login-schema.ts
│   │   │   └── register-schema.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── constants/
│   │       └── auth.constants.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── stats-card.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   ├── order-trend-chart.tsx
│   │   │   ├── top-products-card.tsx
│   │   │   └── recent-orders-card.tsx
│   │   ├── hooks/
│   │   │   └── use-dashboard-stats.ts
│   │   ├── api/
│   │   │   └── get-dashboard-stats.ts
│   │   ├── types/
│   │   │   └── dashboard.types.ts
│   │   └── views/
│   │       └── dashboard-view.tsx
│   │
│   ├── product/
│   │   ├── api/
│   │   │   ├── get-product-list.ts
│   │   │   ├── get-product-detail.ts
│   │   │   ├── create-product.ts
│   │   │   ├── update-product.ts
│   │   │   ├── delete-product.ts
│   │   │   └── batch-update-products.ts
│   │   ├── components/
│   │   │   ├── product-card.tsx
│   │   │   ├── product-list.tsx
│   │   │   ├── product-form.tsx
│   │   │   ├── product-image-upload.tsx
│   │   │   ├── product-sku-manager.tsx
│   │   │   ├── product-filter.tsx
│   │   │   └── product-status-badge.tsx
│   │   ├── hooks/
│   │   │   ├── use-product-list.ts
│   │   │   ├── use-product-detail.ts
│   │   │   ├── use-create-product.ts
│   │   │   └── use-update-product.ts
│   │   ├── store/
│   │   │   └── use-product-store.ts
│   │   ├── schemas/
│   │   │   ├── product-schema.ts
│   │   │   └── sku-schema.ts
│   │   ├── types/
│   │   │   ├── product.types.ts
│   │   │   └── sku.types.ts
│   │   ├── constants/
│   │   │   └── product.constants.ts
│   │   ├── utils/
│   │   │   └── product-helpers.ts
│   │   └── views/
│   │   │   ├── product-list-view.tsx
│   │   │   ├── product-detail-view.tsx
│   │   │   └── product-form-view.tsx
│   │
│   ├── category/
│   │   ├── api/
│   │   │   ├── get-category-list.ts
│   │   │   ├── get-category-tree.ts
│   │   │   ├── create-category.ts
│   │   │   ├── update-category.ts
│   │   │   └── delete-category.ts
│   │   ├── components/
│   │   │   ├── category-tree.tsx
│   │   │   ├── category-form.tsx
│   │   │   ├── category-card.tsx
│   │   │   └── pet-type-selector.tsx
│   │   ├── hooks/
│   │   │   ├── use-category-list.ts
│   │   │   └── use-category-tree.ts
│   │   ├── schemas/
│   │   │   └── category-schema.ts
│   │   ├── types/
│   │   │   └── category.types.ts
│   │   ├── constants/
│   │   │   └── pet-types.ts
│   │   └── views/
│   │       └── category-list-view.tsx
│   │
│   ├── order/
│   │   ├── api/
│   │   │   ├── get-order-list.ts
│   │   │   ├── get-order-detail.ts
│   │   │   ├── update-order-status.ts
│   │   │   ├── cancel-order.ts
│   │   │   └── export-orders.ts
│   │   ├── components/
│   │   │   ├── order-card.tsx
│   │   │   ├── order-list.tsx
│   │   │   ├── order-detail-card.tsx
│   │   │   ├── order-status-badge.tsx
│   │   │   ├── order-timeline.tsx
│   │   │   └── order-filter.tsx
│   │   ├── hooks/
│   │   │   ├── use-order-list.ts
│   │   │   └── use-order-detail.ts
│   │   ├── schemas/
│   │   │   └── order-schema.ts
│   │   ├── types/
│   │   │   └── order.types.ts
│   │   ├── constants/
│   │   │   └── order-status.ts
│   │   └── views/
│   │       ├── order-list-view.tsx
│   │       └── order-detail-view.tsx
│   │
│   ├── refund/
│   │   ├── api/
│   │   │   ├── get-refund-list.ts
│   │   │   ├── get-refund-detail.ts
│   │   │   ├── approve-refund.ts
│   │   │   └── reject-refund.ts
│   │   ├── components/
│   │   │   ├── refund-card.tsx
│   │   │   ├── refund-list.tsx
│   │   │   ├── refund-detail-card.tsx
│   │   │   ├── refund-status-badge.tsx
│   │   │   └── refund-action-buttons.tsx
│   │   ├── hooks/
│   │   │   ├── use-refund-list.ts
│   │   │   └── use-refund-detail.ts
│   │   ├── schemas/
│   │   │   └── refund-schema.ts
│   │   ├── types/
│   │   │   └── refund.types.ts
│   │   ├── constants/
│   │   │   └── refund-status.ts
│   │   └── views/
│   │       ├── refund-list-view.tsx
│   │       └── refund-detail-view.tsx
│   │
│   ├── customer/
│   │   ├── api/
│   │   │   ├── get-customer-list.ts
│   │   │   ├── get-customer-detail.ts
│   │   │   ├── update-customer.ts
│   │   │   └── get-customer-orders.ts
│   │   ├── components/
│   │   │   ├── customer-card.tsx
│   │   │   ├── customer-list.tsx
│   │   │   ├── customer-detail-card.tsx
│   │   │   ├── customer-level-badge.tsx
│   │   │   └── customer-stats.tsx
│   │   ├── hooks/
│   │   │   ├── use-customer-list.ts
│   │   │   └── use-customer-detail.ts
│   │   ├── types/
│   │   │   └── customer.types.ts
│   │   ├── constants/
│   │   │   └── customer-levels.ts
│   │   └── views/
│   │       ├── customer-list-view.tsx
│   │       └── customer-detail-view.tsx
│   │
│   ├── ai/
│   │   ├── api/
│   │   │   ├── generate-product.ts
│   │   │   ├── generate-description.ts
│   │   │   ├── generate-title.ts
│   │   │   └── generate-tags.ts
│   │   ├── components/
│   │   │   ├── ai-product-generator.tsx
│   │   │   ├── ai-content-writer.tsx
│   │   │   ├── ai-suggestion-card.tsx
│   │   │   └── ai-loading-state.tsx
│   │   ├── hooks/
│   │   │   ├── use-ai-generate.ts
│   │   │   └── use-ai-stream.ts
│   │   ├── types/
│   │   │   └── ai.types.ts
│   │   └── views/
│   │       ├── product-generator-view.tsx
│   │       └── content-writer-view.tsx
│   │
│   ├── analytics/
│   │   ├── api/
│   │   │   ├── get-sales-analytics.ts
│   │   │   ├── get-product-analytics.ts
│   │   │   ├── get-customer-analytics.ts
│   │   │   └── get-traffic-analytics.ts
│   │   ├── components/
│   │   │   ├── sales-chart.tsx
│   │   │   ├── product-ranking-chart.tsx
│   │   │   ├── customer-growth-chart.tsx
│   │   │   ├── conversion-funnel.tsx
│   │   │   └── analytics-filter.tsx
│   │   ├── hooks/
│   │   │   └── use-analytics-data.ts
│   │   ├── types/
│   │   │   └── analytics.types.ts
│   │   └── views/
│   │       └── analytics-view.tsx
│   │
│   ├── finance/
│   │   ├── api/
│   │   │   ├── get-transactions.ts
│   │   │   ├── get-settlements.ts
│   │   │   ├── get-balance.ts
│   │   │   └── export-finance-report.ts
│   │   ├── components/
│   │   │   ├── balance-card.tsx
│   │   │   ├── transaction-list.tsx
│   │   │   ├── settlement-card.tsx
│   │   │   └── finance-chart.tsx
│   │   ├── hooks/
│   │   │   ├── use-transactions.ts
│   │   │   └── use-settlements.ts
│   │   ├── types/
│   │   │   └── finance.types.ts
│   │   └── views/
│   │       ├── finance-overview-view.tsx
│   │       └── transaction-list-view.tsx
│   │
│   └── settings/
│       ├── api/
│       │   ├── get-profile.ts
│       │   ├── update-profile.ts
│       │   ├── get-store-settings.ts
│       │   ├── update-store-settings.ts
│       │   ├── get-team-members.ts
│       │   └── manage-permissions.ts
│       ├── components/
│       │   ├── profile-form.tsx
│       │   ├── store-settings-form.tsx
│       │   ├── team-member-card.tsx
│       │   ├── permission-matrix.tsx
│       │   └── role-selector.tsx
│       ├── hooks/
│       │   ├── use-profile.ts
│       │   └── use-store-settings.ts
│       ├── schemas/
│       │   ├── profile-schema.ts
│       │   └── store-schema.ts
│       ├── types/
│       │   └── settings.types.ts
│       └── views/
│           ├── profile-view.tsx
│           ├── store-settings-view.tsx
│           └── team-management-view.tsx
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx
│   │   ├── separator.tsx
│   │   ├── switch.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── textarea.tsx
│   │   ├── calendar.tsx
│   │   ├── popover.tsx
│   │   └── command.tsx
│   │
│   ├── common/
│   │   ├── empty-state.tsx
│   │   ├── loading-spinner.tsx
│   │   ├── error-boundary.tsx
│   │   ├── page-header.tsx
│   │   ├── search-input.tsx
│   │   ├── date-range-picker.tsx
│   │   ├── image-upload.tsx
│   │   ├── rich-text-editor.tsx
│   │   ├── confirmation-dialog.tsx
│   │   └── pagination.tsx
│   │
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── user-menu.tsx
│   │   ├── notification-bell.tsx
│   │   ├── breadcrumb.tsx
│   │   └── footer.tsx
│   │
│   ├── charts/
│   │   ├── line-chart.tsx
│   │   ├── bar-chart.tsx
│   │   ├── pie-chart.tsx
│   │   ├── area-chart.tsx
│   │   └── chart-container.tsx
│   │
│   └── business/
│       ├── status-badge.tsx
│       ├── price-display.tsx
│       ├── currency-input.tsx
│       ├── pet-icon.tsx
│       └── quick-actions.tsx
│
├── services/
│   ├── api-client.ts
│   ├── auth-service.ts
│   ├── upload-service.ts
│   ├── notification-service.ts
│   └── websocket-service.ts
│
├── stores/
│   ├── use-ui-store.ts
│   ├── use-sidebar-store.ts
│   ├── use-modal-store.ts
│   └── use-notification-store.ts
│
├── hooks/
│   ├── use-debounce.ts
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   ├── use-clipboard.ts
│   ├── use-toast.ts
│   └── use-pagination.ts
│
├── providers/
│   ├── query-provider.tsx
│   ├── theme-provider.tsx
│   ├── auth-provider.tsx
│   └── toast-provider.tsx
│
├── permissions/
│   ├── roles.ts
│   ├── permissions.ts
│   ├── check-permission.ts
│   └── permission-guard.tsx
│
├── constants/
│   ├── routes.ts
│   ├── api-endpoints.ts
│   ├── app-config.ts
│   └── validation-messages.ts
│
├── types/
│   ├── common.types.ts
│   ├── api.types.ts
│   ├── env.d.ts
│   └── global.d.ts
│
├── lib/
│   ├── utils.ts
│   ├── cn.ts
│   ├── format.ts
│   ├── validation.ts
│   └── date.ts
│
└── styles/
    └── globals.css
```

## public/ 结构

```
public/
├── images/
│   ├── logo.svg
│   ├── logo-dark.svg
│   ├── placeholder.png
│   └── pets/
│       ├── dog.svg
│       ├── cat.svg
│       ├── bird.svg
│       └── fish.svg
├── icons/
│   ├── favicon.ico
│   ├── icon-192.png
│   └── icon-512.png
└── fonts/
    └── (custom fonts if needed)
```

## 配置文件说明

### package.json 核心依赖
```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "@radix-ui/react-*": "latest",
    "zustand": "^5.x",
    "@tanstack/react-query": "^5.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "framer-motion": "^11.x",
    "recharts": "^2.x"
  }
}
```

### tsconfig.json 路径别名
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/services/*": ["./src/services/*"]
    }
  }
}
```

### .env.example
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Auth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jinhan_merchant

# AI
OPENAI_API_KEY=sk-xxx

# Upload
NEXT_PUBLIC_UPLOAD_URL=https://cdn.example.com
UPLOAD_SECRET=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 目录结构设计原则

### 1. Feature-First 架构
- 每个业务模块独立在 `features/` 下
- 模块内部自闭环，包含 api/components/hooks/store 等
- 避免跨 feature 依赖

### 2. 组件分层
- `components/ui/` - shadcn/ui 基础组件
- `components/common/` - 通用业务无关组件
- `components/layout/` - 布局组件
- `components/charts/` - 图表组件
- `components/business/` - 业务通用组件
- `features/*/components/` - 功能专属组件

### 3. 代码组织
- 单文件不超过 300 行
- 复杂组件拆分为子组件
- API 请求按功能拆分文件
- 避免巨型 utils 文件

### 4. 命名规范
- 组件: PascalCase (ProductCard.tsx)
- Hooks: use-xxx.ts
- API: get-product-list.ts
- Store: use-product-store.ts
- Types: xxx.types.ts
- Constants: xxx.constants.ts

### 5. 路由结构
- `(auth)` - 认证相关页面
- `(dashboard)` - 主应用页面
- 使用 Route Groups 组织路由
- 动态路由使用 [id] 格式

## 关键设计决策

### Server Components 优先
- 默认使用 Server Components
- 只在需要交互时使用 "use client"
- 表单、动画、图表需要客户端组件

### 状态管理策略
- UI 状态: Zustand
- 服务端状态: TanStack Query
- 表单状态: React Hook Form

### 样式方案
- TailwindCSS + shadcn/ui
- 避免 CSS Modules
- 使用 cn() 工具函数合并类名

### 类型安全
- 所有 API 响应定义类型
- 表单使用 Zod schema
- 禁止使用 any

---

**生成时间**: 2026-05-07
**遵循规范**: AGENT.md
**架构风格**: Feature-First + Server Components
