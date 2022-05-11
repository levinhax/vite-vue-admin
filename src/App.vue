<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import BasicLayout from './layouts/index.vue'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
</script>

<template>
  <a-config-provider prefix-cls="ant">
    <BasicLayout v-if="currentRoute.path !== '/login'"></BasicLayout>
    <router-view v-else />
  </a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  width: 100%;
  height: 100%;
}
</style>
