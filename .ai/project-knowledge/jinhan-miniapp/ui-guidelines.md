# jinhan-miniapp UI 规范草稿

扫描日期：2026-11-09。以下仅记录仓库中的现行实现，不推定为已批准的设计规范。

| 项目 | 当前证据与待确认事项 |
|---|---|
| 适用端与尺寸 | `package.json`、`manifest.config.ts` 配有微信小程序、H5、App；`uno.config.ts` 使用 rpx 适配，并提到 750 宽设计稿。实际发布端和目标设备尺寸待确认。 |
| 品牌与用户场景 | `pages.config.ts` 标题为“金晗”；页面展示商品、寄养、客服和个人中心。正式品牌调性及用户定义待确认。 |
| 色彩 | `pages.config.ts` tabBar 文本 `#1A1A1A`、选中 `#f8d347`、背景 `#ffffff`；`src/layouts/` 的主按钮背景为 `#ea373d`；`src/pages-sub/login/index.vue` 另用 `#ffd000`。这些是现有值，统一主色与语义色待确认。`src/uni.scss` 有 uni 默认色，不应直接视作品牌色。 |
| 字体 | `src/style/index.scss` 使用 PingFang 字体回退链；`src/uni.scss` 定义 12/14/16px 等通用变量，页面大量使用 rpx 字号。正式字级、行高和字重体系待确认。 |
| 间距与布局 | `src/uni.scss` 定义 5/10/15px 横向及 4/8/12px 纵向间距；页面用 UnoCSS 的 rpx 工具类。`uno.config.ts` 有 safe-area 规则，多个页面用 `safeAreaInsetTop`。未发现统一断点表，待确认。 |
| 组件与图标 | 使用 Wot Design Uni、z-paging、`src/uni_modules/` 的 uv 组件；资源见 `src/static/`、`src/pages-sub/image/`、`src/style/iconfont.css`。组件禁用、错误及焦点状态规范待确认。 |
| 导航与反馈 | `pages.config.ts` 定义首页、服务、我的三项 tabBar；页面使用 `wd-navbar`、`wd-toast`、`wd-message-box`，请求错误使用 `uni.showToast`，加载组件见 `src/components/PageLoading.vue`。空态与错误文案尚无统一规范。 |
| 动效 | `src/pages/index/index.vue` 使用 `wd-transition` 的 fade；未发现全局动效时长、曲线或减少动画规则，待确认。 |
| 无障碍 | 未发现对比度、屏幕阅读器、键盘焦点及最小触控面积的项目规范，待确认；目前不能宣称已满足无障碍要求。 |
| 设计来源 | 当前可核实来源是仓库页面、样式和图片资源；未发现 Figma/Sketch/XD 设计文件。外部设计稿链接、Ardot 目标项目与设计负责人待确认。 |

用户核对这些信息后，才能将本文件作为正式 UI 输入。
