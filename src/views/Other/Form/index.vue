<template>
  <a-tabs v-model:activeKey="activeKey" :animated="false">
    <a-tab-pane key="1" tab="基础表格">
      <ComBaseForm />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render>
      <ComMixForm />
    </a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import ComBaseForm from './components/BaseForm/index.vue'
import ComMixForm from './components/MixForm/index.vue'

const activeKey = ref('1')
</script>
