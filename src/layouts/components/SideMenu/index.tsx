import { defineComponent, PropType, VNode } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu } from 'ant-design-vue'
import Icon from '@/components/MyIcon/index.vue'

interface MetaRecord {
  icon?: string | VNode
  title?: string
  hidden: boolean
}

interface MenuDataItem {
  path: string
  name?: string | symbol
  meta?: MetaRecord
  children?: MenuDataItem[]
}

export default defineComponent({
  name: 'SideMenu',
  props: {
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => [
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
          name: 'about',
          path: '/about',
          meta: {
            title: '关于',
            icon: '',
            hidden: false,
          },
        },
      ],
    },
  },
  setup(props) {
    const currentRoute = useRoute()
    const router = useRouter()
    const state = reactive<any>({
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
    })

    const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
      state.selectedKeys = [e.key]
      router.push(e.key)
    }

    // 跟随页面路由变化，切换菜单选中状态
    watchEffect(() => {
      if (currentRoute) {
        state.selectedKeys = [currentRoute.path]
        const findMenu = props.menuData.find(item => currentRoute.path.includes(item.path))
        state.openKeys = [findMenu?.path]
      }
    })

    const getIcon = (type?: string) => (type ? <Icon type={type} /> : null)

    // 递归生成菜单
    const renderMenuItem = (data: MenuDataItem[]): JSX.Element[] => {
      return data.map((item: MenuDataItem) => {
        if (item.children) {
          return (
            <Menu.SubMenu
              key={item.path}
              title={
                <>
                  {getIcon(item.meta?.icon as string)}
                  <span>{item.meta?.title}</span>
                </>
              }
            >
              {renderMenuItem(item.children)}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item key={item.path}>
            {getIcon(item.meta?.icon as string)}
            <span>{item.meta?.title}</span>
          </Menu.Item>
        )
      })
    }

    return () => (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={state.selectedKeys}
        {...(state.collapsed ? {} : { openKeys: state.openKeys })}
        onOpenChange={(keys: any[]) => (state.openKeys = keys)}
        onSelect={onSelect}
        class="side-menu"
      >
        {renderMenuItem(props.menuData)}
      </Menu>
    )
  },
})
