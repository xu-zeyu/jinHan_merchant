# jinhan-miniapp 项目概览

扫描日期：2026-11-09。状态：仓库扫描草稿，待用户核实。

## 仓库身份与范围

- 仓库根目录：`/Users/xuzeyu/Documents/company/jinHan/jinHan_miniApp`；`origin` 为 `git@github.com:shenzhenCat/cat_miniApp.git`，当前本地分支为 `main`（`git remote -v`、`git branch -a`）。远程默认分支设置尚未核实。
- `package.json` 的应用说明为“金晗商场”；`pages.config.ts` 的导航标题为“金晗”。代码包含商品浏览、个人中心、地址、登录、客服会话与寄养预约页面。正式产品定位、用户群体、业务目标及发布范围待确认。
- `package.json` 配置 uni-app 微信小程序、H5、App 等平台脚本；`manifest.config.ts` 也包含相应平台配置。实际发布哪些平台待确认。

## 技术与本地命令

- `package.json`：Node >=18、pnpm >=7.30；uni-app 3 alpha、Vue 3.4.21、Pinia 2.0.36、Vite 5.2.8、TypeScript 4.9.5。版本以当前清单为准，未进行本机运行时核对。
- `pnpm install` 安装依赖；`pnpm dev:mp-weixin`、`pnpm dev:h5`、`pnpm dev:app` 启动对应平台；`pnpm build:mp-weixin`、`pnpm build:h5`、`pnpm build:app` 构建；`pnpm type-check` 做类型检查（`package.json`、`README.md`）。
- 未发现 `package.json` 自动化测试脚本或仓库自有测试用例；现有 ESLint、Stylelint、Prettier 配置与 `lint-staged`。

## 待核实

- 正式产品名称、目标用户、业务目标、主要发布平台。
- 关联的 TAPD 空间与项目、Ardot 项目与设计稿来源。
- 当前项目画像及 UI 规范是否符合实际；确认后才能将项目状态设为 `verified`。
