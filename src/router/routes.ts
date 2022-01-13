import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from '../layouts/index.vue'
import OtherRoutes from './modules/other'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    name: 'AdminLayout',
    // component: () => import('@/layouts/index.vue'),
    component: BasicLayout,
    redirect: '/home',
    children: [
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
    ],
  },
]

export default routes
