import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
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
]

export default routes
