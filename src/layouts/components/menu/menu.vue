<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    style="width: 200px"
    @click="handleMenuClick"
  >
    <template v-for="item in menus" :key="item.path">
      <menu-item :menu-info="item"></menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRefs, ref } from 'vue'
import MenuItem from './menu-item.vue'
import { useRoute, useRouter } from 'vue-router'
// import { useStore } from 'vuex';
import { menuData } from './constant'

export default defineComponent({
  name: 'SideMenu',
  components: {
    MenuItem,
  },
  props: {
    collapsed: {
      //侧边栏菜单是否收起
      type: Boolean,
    },
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    // const store = useStore();

    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[1]?.path]

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name],
    })

    // const menus = computed(() => store.getters.menus || menuData);
    // const menus = computed(() => menuData);
    const menus = ref(menuData)

    //监听菜单收缩状态
    watch(
      () => props.collapsed,
      newVal => {
        state.openKeys = newVal ? [] : getOpenKeys()
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        console.log('currentRoute: ', currentRoute)
        if (currentRoute.name == 'login' || props.collapsed) return
        console.log('currentRoute: ', currentRoute)
        state.openKeys = getOpenKeys()
        state.selectedKeys = [currentRoute.path]
      }
    )

    // 点击菜单
    // const handleMenuClick = async ({ item, key, keyPath }) => {
    const handleMenuClick = async ({
      item,
      key,
      keyPath,
    }: {
      item: any
      key: string
      keyPath: string[]
    }): Promise<void> => {
      console.log(item, key, keyPath)
      // router.push({ name: key });
      router.push(key)
      // console.log('router: ', router);
    }

    return {
      ...toRefs(state),
      menus,
      handleMenuClick,
    }
  },
})
</script>
