# 已观察到的风险与待确认项（2026-11-09 更新）

## 联调相关

- 前端经 `next.config.js` rewrites 把 `/api/admin/*` 代理到 `API_PROXY_TARGET`（默认 `http://127.0.0.1:8081`）。后端服务未启动时页面接口会报错，属预期。
- 登录失败锁定（5 次 30 分钟）、封禁踢会话等规则由后端强制，前端仅展示错误信息，尚未做端到端联调验收。
- 后端 `GET /api/admin/auth/menus` 当前只返回系统管理菜单（accounts/roles/permissions），不含 C 端用户入口；前端在 `sidebar.tsx` 按 `biz:user:read` 权限补挂 `/users`。待后端补菜单后可移除补挂逻辑。
- 密码规则在契约中略有差异：创建账号为 8-72 位含字母数字符号；改密/重置为 8-64 位含字母数字。前端按各接口契约分别校验。
- 图形验证码为 Base64（可能带或不带 data: 前缀），前端已兼容处理；验证码内容长度未在契约中限定，前端仅校验非空。

## 历史遗留（已随瘦身解决）

- 2026-11-09 项目瘦身已删除电商演示模块（工作台/商品/分类/订单/售后/分析/财务/AI）与注册/找回密码页；
  `middleware.ts` 鉴权已启用，登录/改密/主框架守卫已接真实会话（token + cookie）。

证据：`src/services/api-client.ts`、`src/components/layout/sidebar.tsx`、`next.config.js`、`admin-live-openapi.json`。
扫描日期：2026-11-09；端到端联调与验收尚未执行。
