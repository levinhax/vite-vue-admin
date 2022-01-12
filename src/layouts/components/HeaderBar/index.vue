<template>
  <div class="header-bar">
    <div class="logo-wrap">
      <router-link :to="{ path: '/' }">
        <img :src="logo" class="logo" />
        <h1 class="title">{{ Config.APP_TITLE }}</h1>
      </router-link>
    </div>
    <div class="header-right">
      <HeaderRight />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderRight from '../HeaderRight/index.vue'

import logo from '@/assets/logo.png'
import Config from '../../../config'
</script>

<style lang="less" scoped>
@import './index.less';
</style>
