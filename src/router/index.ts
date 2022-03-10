import { createRouter, createWebHistory } from 'vue-router'
// import routes from './routes' // 配置式路由

// import routes from '~pages' // 约定式路由

// 如果没有 routes 配置，Umi 会进入约定式路由模式，然后分析 src/views 目录拿到路由配置。
import routes1 from './routes'
import routes2 from '~pages' // 约定式路由

const routes = [...routes1, ...routes2]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
