import { defineComponent, PropType, VNode } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from 'ant-design-vue'
import { AppstoreOutlined } from '@ant-design/icons-vue'
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
    const state = reactive<any>({
      collapsed: false, // default value
      openKeys: [],
      selectedKeys: [currentRoute.name],
    })

    const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
      console.log('select: ', e.key)
      state.selectedKeys = [e.key]
    }

    const getIcon = (type?: string) => (type ? <Icon type={type} /> : <AppstoreOutlined />)

    // 递归生成菜单
    const renderMenuItem = (data: MenuDataItem[]): JSX.Element[] => {
      return data.map((item: MenuDataItem) => {
        if (item.children) {
          return (
            <Menu.SubMenu
              key={item.name}
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
          <Menu.Item key={item.name}>
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
