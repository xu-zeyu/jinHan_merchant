# jinhan-merchant 项目记忆

## 项目定位
宠物产品管理后台（PetTown Admin）。范围以 TAPD 空间 `32445978` 的 v1.0.0 需求池为准（管理端 13 条 ADMIN-V1-01~13）；接口契约以 Apifox 项目 `9001157` 为准（`Result<T>` 成功码 `"200"`）。2026-11-09 已完成项目瘦身与页面/API 对接。

## 关键约定
- 后端服务经 `next.config.js` rewrites 代理：`/api/admin/*` → `API_PROXY_TARGET`（默认 `http://127.0.0.1:8081`）。
- 权限码与后端 `AdminPermissionCodes` 对齐（`src/permissions/permission-codes.ts`）；超管放行一切权限。
- 后端 `/api/admin/auth/menus` 仅返回系统管理菜单；C 端用户入口由前端按 `biz:user:read` 补挂（sidebar.tsx），后端补菜单后移除。
- UI：沿用仓库设计体系（琥珀金 #FFB84D + shadcn），管理后台无单独 Ardot UI 交付；移动端 Ardot 设计稿在 jinHan_ui 仓库（米白/鼠尾草绿/橙棕品牌视觉）。
- 密码规则：创建账号 8-72 位含字母数字符号；改密/重置 8-64 位含字母数字。

## 验证基线
- `npm run type-check` 与 `npm run build` 必须保持通过（9 路由）。
- 端到端联调验收尚未执行，以 TAPD 各需求验收标准为准。
