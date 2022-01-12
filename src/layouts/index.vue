<template>
  <a-layout class="layout">
    <a-layout-header style="padding: 0; height: 52px">
      <ComHeaderBar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <ComMenu />
      </a-layout-sider>
      <a-layout-content :style="{ padding: '16px', background: '#f0f2f5', minHeight: '280px' }"
        >Content</a-layout-content
      >
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComHeaderBar from './components/HeaderBar/index.vue'
import ComMenu from './components/menu/menu.vue'

export default defineComponent({
  name: 'BaseLayout',
  components: {
    ComHeaderBar,
    ComMenu,
  },
  setup() {
    return {
      collapsed: ref<boolean>(false),
    }
  },
})
</script>

<style>
.layout {
  /* position: relative; */
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
