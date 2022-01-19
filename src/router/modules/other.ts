import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/other',
    name: 'other',
    redirect: '/other/table',
  },
  {
    path: '/other/table',
    name: 'otherTable',
    component: () => import('@/views/Other/Table/index.vue'),
    meta: {
      title: '表格',
      icon: '',
      auth: ['admin'],
    },
  },
  {
    path: '/other/animation',
    name: 'otherAnimation',
    redirect: '/other/animation/banner',
  },
  {
    path: '/other/animation/banner',
    name: 'otherAnimationBanner',
    component: () => import('@/views/Other/Animation/Banner/index.vue'),
    meta: {
      title: '轮播动画',
      icon: '',
      auth: ['admin'],
    },
  },
]

export default routes
