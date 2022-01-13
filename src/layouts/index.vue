<template>
  <a-layout class="layout">
    <a-layout-header style="padding: 0; height: 52px">
      <ComHeaderBar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="layout-sider">
        <!-- <ComMenu :collapsed="collapsed" /> -->

        <ComSideMenu />
        <a-button type="primary" class="menu-trigger" @click="toggleCollapsed">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
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

const collapsed = ref<boolean>(false)

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
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
