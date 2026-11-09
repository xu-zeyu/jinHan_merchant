# jinhan-miniapp 模块地图

扫描日期：2026-11-09。状态仅表示仓库中是否存在实现，不表示功能已通过运行验证。

| 模块 | 状态 | 仓库证据 |
|---|---|---|
| 首页及商品列表 | 已实现代码 | `src/pages/index/index.vue`、`src/service/goods.ts`、`src/components/Waterfall.vue` |
| 商品详情 | 已实现代码 | `src/pages-sub/goodsDetails/index.vue` 及其组件 |
| 商品目录 | 部分实现 | `src/pages-sub/catalogs/index.vue` 存在页面，内容较少 |
| 寄养预约 | 已实现代码 | `src/pages-sub/goodsConsigns/index.vue` 及其表单组件 |
| 登录及登录拦截 | 已实现代码 | `src/pages-sub/login/index.vue`、`src/pages-sub/hook/useLogin.ts`、`src/interceptors/route.ts` |
| 收货地址 | 已实现代码 | `src/pages-sub/address/index.vue`、`src/pages-sub/editAddress/index.vue` |
| 客服会话与聊天 | 已实现代码 | `src/pages/service/index.vue`、`src/pages-sub/serviceChat/index.vue`、`src/service/service.ts`、`src/hooks/useSocket.ts` |
| 个人中心 | 已实现代码 | `src/pages/my/index.vue` 及其组件 |
| 通用请求、上传与状态 | 已实现代码 | `src/utils/http.ts`、`src/interceptors/request.ts`、`src/hooks/useUpload.ts`、`src/store/` |
| 自动化测试 | 未发现/待确认 | `package.json` 无 test 脚本；仓库未发现自有测试文件 |

页面入口与 tabBar 以 `pages.config.ts` 为准；生成的 `src/pages.json` 记录了当前页面清单。
