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
  '/other/file/print': '打印',
  '/other/Edit': '编辑器',
  '/other/Edit/wangEditor': 'wangEditor',
  '/other/test': '测试',
  '/micro1': 'Vue子应用',
  '/micro1/home': '首页',
  '/micro1/about': '关于',
  '/micro2': 'React子应用',
  '/micro2/home': '首页',
  '/micro2/about': '关于',
  '/micro2/form': '表单',
  '/micro2/form/basic': '基础表单',
  '/micro2/form/mixForm': '多表单',
  '/micro2/form/reactHookForm': 'reactHookForm',
}

export const microVueMenus: Array<MenuDataItem> = [
  {
    key: 'micro1',
    name: 'qiankun-micro-vue2',
    path: '/micro1',
    meta: {
      title: '子应用Vue2',
      icon: 'setting',
      hidden: false,
    },
    children: [
      {
        key: 'micro1-home',
        name: 'home',
        path: '/micro1/home',
        meta: {
          title: '主页',
          icon: '',
          hidden: false,
        },
      },
      {
        key: 'micro1-about',
        name: 'about',
        path: '/micro1/about',
        meta: {
          title: '关于',
          icon: '',
          hidden: false,
        },
      },
    ],
  },
]

export const microReactMenus: Array<MenuDataItem> = [
  {
    key: 'micro2',
    name: 'qiankun-micro-react',
    path: '/micro2',
    meta: {
      title: '子应用React',
      icon: 'setting',
      hidden: false,
    },
    children: [
      {
        key: 'micro2-home',
        name: 'home',
        path: '/micro2/home',
        meta: {
          title: '主页',
          icon: '',
          hidden: false,
        },
      },
      {
        key: 'micro2-about',
        name: 'about',
        path: '/micro2/about',
        meta: {
          title: '关于',
          icon: '',
          hidden: false,
        },
      },
      {
        key: 'micro2-form',
        name: 'form',
        path: '/micro2/form',
        meta: {
          title: '表单',
          icon: '',
          hidden: false,
        },
        children: [
          {
            key: 'micro2-basicForm',
            name: 'basicForm',
            path: '/micro2/form/basic',
            meta: {
              title: '基础表单',
              icon: '',
              hidden: false,
            },
          },
          {
            key: 'micro2-mixForm',
            name: 'mixForm',
            path: '/micro2/form/mixForm',
            meta: {
              title: '多表单',
              icon: '',
              hidden: false,
            },
          },
          {
            key: 'micro2-reactHookForm',
            name: 'reactHookForm',
            path: '/micro2/form/reactHookForm',
            meta: {
              title: 'reactHookForm',
              icon: '',
              hidden: false,
            },
          },
        ],
      },
    ],
  },
]

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
        name: 'otherForm',
        path: '/other/form',
        meta: {
          title: '表单',
          icon: '',
          hidden: false,
        },
      },
      {
        key: '2-3',
        name: 'otherAnimation',
        path: '/other/animation',
        meta: {
          title: '动画',
          icon: '',
          hidden: false,
        },
        children: [
          {
            key: '2-3-1',
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
      {
        key: '2-4',
        name: 'otherFile',
        path: '/other/file',
        meta: {
          title: '文件',
          icon: '',
          hidden: false,
        },
        children: [
          {
            key: '2-4-1',
            name: 'otherFilePrint',
            path: '/other/file/print',
            meta: {
              title: '打印',
              icon: '',
              hidden: false,
            },
          },
          {
            key: '2-4-2',
            name: 'otherFileWaterMark',
            path: '/other/file/watermark',
            meta: {
              title: '水印',
              icon: '',
              hidden: false,
            },
          },
          {
            key: '2-4-3',
            name: 'otherFilePreview',
            path: '/other/file/preview',
            meta: {
              title: '预览',
              icon: '',
              hidden: false,
            },
          },
        ],
      },
      {
        key: '2-5',
        name: 'otherEdit',
        path: '/other/Edit',
        meta: {
          title: '编辑器',
          icon: '',
          hidden: false,
        },
        children: [
          {
            key: '2-5-1',
            name: 'otherWangEditor',
            path: '/other/Edit/wangEditor',
            meta: {
              title: 'wangEditor',
              icon: '',
              hidden: false,
            },
          },
        ],
      },

      {
        key: '2-99',
        name: 'otherTest',
        path: '/other/test',
        meta: {
          title: '测试',
          icon: '',
          hidden: false,
        },
      },
    ],
  },
  ...microVueMenus,
  ...microReactMenus,
]
