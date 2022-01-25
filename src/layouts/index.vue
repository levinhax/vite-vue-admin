<template>
  <a-layout class="layout">
    <a-layout-header style="padding: 0; height: 52px">
      <ComHeaderBar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="layout-sider">
        <!-- <ComMenu :collapsed="collapsed" /> -->

        <ComSideMenu :menu-data="menusData" />
        <div class="menu-trigger" @click="toggleCollapsed">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </div>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '16px', background: '#f0f2f5', minHeight: '280px' }">
        <ComPageBreadCrub />
        <a-card>
          <!-- <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view> -->

          <!-- <router-view></router-view> -->

          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="currentRoute.name" />

          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section v-show="!currentRoute.name" id="frame"></section>
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import ComHeaderBar from './components/HeaderBar/index.vue'
import ComPageBreadCrub from './components/PageBreadcrumb/index.vue'
// import ComMenu from './components/menu/menu.vue'
import ComSideMenu from './components/SideMenu'
import { menuData } from './constants'

const collapsed = ref<boolean>(false)
const menusData = ref(menuData)

const currentRoute = useRoute()

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

watchEffect(() => {
  if (currentRoute) {
    console.log('currentRoute: ', currentRoute, currentRoute.name)
  }
})
</script>

<style>
.layout {
  /* position: relative; */
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.layout-sider {
  padding-top: 16px;
}

.menu-trigger {
  width: 100%;
  height: 32px;
  background: transparent;
  border-color: transparent;
  border-top: 1px solid #f0f0f0;
  color: #f0f0f0;
  cursor: pointer;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
