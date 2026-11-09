# 金晗商家后台：项目概览

- 项目 ID：`jinhan-merchant`；仓库：`/Users/xuzeyu/Documents/company/jinHan/jinHan_merchant`。
- 定位：宠物产品管理后台，按 TAPD `32445978` 的 v1.0.0 需求池进行项目瘦身（2026-11-09 已执行完毕）。`README.md` 与 `AGENT.md` 已同步为新定位。
- 当前范围：管理端登录/改密、管理员账号、角色与权限、权限目录、C 端用户与宠物数据（对应 ADMIN-V1-01~13），全部已接 `/api/admin/*` 真实接口（Apifox `9001157` 契约）。
- TAPD：2026-11-09 通过 TAPD 连接器实时核对：空间 `32445978` 共 27 条 `[v1.0.0]` 需求（全部 `developing`），管理端 13 条为本仓库范围，移动端 14 条属 miniapp 仓库。
- 目标用户：管理端管理员。
- UI 依据：用户确认沿用仓库现有设计体系（琥珀金 #FFB84D + shadcn）；管理后台无单独 Ardot UI 交付。
- 正式验收：以 TAPD 各需求验收标准 + 端到端联调为准，尚未执行。

证据：TAPD 实时回读、`.ai/runs/1.0.0/版本开发清单.md`、`src/features`、`admin-live-openapi.json`。更新日期：2026-11-09。
