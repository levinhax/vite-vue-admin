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

interface Breadcrumb {
  path: string
  breadcrumbName: string
  children?: Array<{
    path: string
    breadcrumbName: string
  }>
}

// export const breadcrumbNameMap: Array<any> = [
//   {
//     path: '/home',
//     breadcrumbName: '首页',
//   },
//   {
//     path: '',
//     breadcrumbName: '其它',
//     children: [
//       {
//         path: '/other/table',
//         breadcrumbName: '表格',
//       },
//       {
//         path: '/other/animation',
//         breadcrumbName: '动画',
//         children: [
//           {
//             path: '/other/animation/banner',
//             breadcrumbName: '轮播',
//           },
//         ],
//       },
//     ],
//   },
// ]

export const breadcrumbNameMap: any = {
  '/home': '首页',
  '/other': '其它',
  '/other/table': '表格',
  '/other/animation': '动画',
  '/other/animation/banner': '轮播',
}

export const menuData: Array<MenuDataItem> = [
  {
    key: '1',
    name: 'home',
    path: '/home',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
  },
  {
    key: '2',
    name: 'other',
    path: '/other',
    meta: {
      title: '其它',
      icon: 'setting',
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
