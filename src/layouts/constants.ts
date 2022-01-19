import { VNode } from 'vue'

export interface MenuMeta {
  title: string
  icon?: string | VNode
  hidden: boolean
}

export interface MenuDataItem {
  [key: string]: unknown
  name?: string
  path: string
  meta: MenuMeta
  children?: MenuDataItem[]
}

export const menuData: Array<MenuDataItem> = [
  {
    key: '1',
    name: 'home',
    path: '/home',
    meta: {
      title: '首页',
      icon: '',
      hidden: false,
    },
  },
  {
    key: '2',
    name: 'other',
    path: '/other',
    meta: {
      title: '其它',
      icon: '',
      hidden: false,
    },
    children: [
      {
        key: '2-1',
        name: 'otherTable',
        path: '/other/table',
        meta: {
          title: '表格',
          icon: '',
          hidden: false,
        },
      },
      {
        key: '2-2',
        name: 'otherAnimation',
        path: '/other/animation',
        meta: {
          title: '动画',
          icon: '',
          hidden: false,
        },
        children: [
          {
            key: '2-2-1',
            name: 'otherAnimationBanner',
            path: '/other/animation/banner',
            meta: {
              title: '轮播',
              icon: '',
              hidden: false,
            },
          },
        ],
      },
    ],
  },
]
