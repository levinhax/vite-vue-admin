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
  {
    path: '/other/file',
    name: 'otherFile',
    redirect: '/other/file/print',
  },
  {
    path: '/other/file/print',
    name: 'otherFilePrint',
    component: () => import('@/views/Other/File/Print/index.vue'),
    meta: {
      title: '打印',
      icon: '',
      auth: ['admin'],
    },
  },
  {
    path: '/other/file/watermark',
    name: 'otherFileWaterMark',
    component: () => import('@/views/Other/File/WaterMark/index.vue'),
    meta: {
      title: '水印',
      icon: '',
      auth: ['admin'],
    },
  },
  {
    path: '/otherTest', // 同时支持配置式路由与约定式路由, 访问地址 /otherTest 或 /other/test
    name: 'otherTest',
    component: () => import('@/views/Other/Test/index.vue'),
  },
]

export default routes
