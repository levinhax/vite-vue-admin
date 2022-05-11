<template>
  <div class="header-bar">
    <div class="logo-wrap">
      <router-link :to="{ path: '/' }">
        <img :src="logo" class="logo" />
        <h1 class="title">{{ Config.APP_TITLE }}</h1>
      </router-link>
    </div>
    <div class="header-right">
      <ComPageBreadCrub />
      <div class="header-right-content">
        <span style="color: var(--ant-primary-color)">var(`--ant-primary-color`)</span>
        <ThemeChange style="margin-right: 12px" />
        <HeaderRight />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ComPageBreadCrub from '../PageBreadcrumb/index.vue'
import HeaderRight from '../HeaderRight/index.vue'
import ThemeChange from '../ThemeChange/index.vue'

import logo from '@/assets/logo.png'
import Config from '../../../config'
</script>

<style lang="less" scoped>
@import './index.less';
</style>
