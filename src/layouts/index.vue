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
      <a-layout-content :style="{ padding: '16px', background: '#f0f2f5', minHeight: '280px' }"
        >Content</a-layout-content
      >
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import ComHeaderBar from './components/HeaderBar/index.vue'
// import ComMenu from './components/menu/menu.vue'
import ComSideMenu from './components/SideMenu'
import { menuData } from './constants'

const collapsed = ref<boolean>(false)
const menusData = ref(menuData)

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
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
