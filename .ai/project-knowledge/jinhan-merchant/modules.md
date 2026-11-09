# 模块地图（2026-11-09 瘦身后）

状态表示源码实现程度；联调验收以 TAPD 需求验收标准为准。

| 模块 | 状态 | 证据与边界 |
|---|---|---|
| 登录与图形验证码 | 已接 API | `src/features/auth`：`GET /api/admin/verification/captcha` + `POST /api/admin/auth/login`；锁定/限流由后端强制 |
| 强制改密 | 已接 API | `POST /api/admin/auth/change-password`；改密后旧 token 失效回登录页 |
| 会话、权限与菜单 | 已接 API | `GET /api/admin/auth/me`、`/menus`；侧边栏按菜单树渲染，前端按权限补挂「用户」入口 |
| 管理员账号 | 已接 API | `src/features/account`：分页/创建/编辑/启停/删除/重置密码（ADMIN-V1-04~08） |
| 角色与权限分配 | 已接 API | `src/features/role`：角色 CRUD + `GET/PUT /roles/{id}/permissions` |
| 权限点目录 | 已接 API | `GET /api/admin/system/permissions` + `POST .../sync` |
| C 端用户管理 | 已接 API | `src/features/user`：分页/详情/封禁解封 |
| C 端用户宠物数据 | 已接 API | `GET /api/admin/users/{id}/pets`（只读，不含健康记录） |
| 电商模块（工作台/商品/分类/订单/售后/分析/财务/AI） | 已移出 | 2026-11-09 项目瘦身删除；v1.0.0 需求池未覆盖 |
| 注册 / 找回密码 | 已移出 | v1.0.0 需求池未覆盖 |

证据：`src/features/*`、`src/app` 路由、Apifox 契约 `admin-live-openapi.json`、TAPD `32445978` 实时回读。
