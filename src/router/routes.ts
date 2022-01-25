import type { RouteRecordRaw } from 'vue-router'
import OtherRoutes from './modules/other'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: '',
      auth: ['home'],
    },
  },
  ...OtherRoutes,
]

export default routes
