# jinhan-miniapp 架构画像

扫描日期：2026-11-09；仅描述当前仓库的静态代码结构。

1. `src/main.ts` 创建 Vue 应用，安装 Pinia 以及路由、请求和原型拦截器。`src/App.vue` 与 `src/layouts/` 承载全局页面布局和 Wot Design Uni 主题。
2. `pages.config.ts` 配置三项 tabBar：首页、服务、我的；`src/pages-sub/` 放登录、商品详情、地址、寄养预约和客服聊天等分包页面。`vite.config.ts` 使用 UniPages、UniLayouts、UniManifest、UnoCSS 等插件生成平台产物。
3. 页面通过 `src/service/` 调用 API 封装；`src/utils/http.ts` 使用 `uni.request`，`src/interceptors/request.ts` 拼接环境基址、查询参数与认证头。仓库没有服务端或数据库实现。
4. `src/store/` 使用 Pinia；`src/store/index.ts` 配置 `uni.getStorageSync` / `uni.setStorageSync` 持久化。`src/interceptors/route.ts` 依据页面登录要求拦截导航。
5. 客服消息由 `src/hooks/useSocket.ts` 与 `src/utils/webSocket/index.ts` 的 `uni.connectSocket` 通道处理；会话列表和历史消息由 `src/service/service.ts` 请求。
6. `env/` 管理构建环境变量；`manifest.config.ts` 定义平台配置。不要在项目知识文件中复制环境变量值或凭证。

架构及 API 语义尚未通过运行或后端联调核实。
