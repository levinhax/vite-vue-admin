<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCurrentInstance from '../../hooks/useCurrentInstance'
import { useUserStore } from '../../store/modules/user'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'

import SvgIcon from '@/components/SvgIcon/index.vue'

const { proxy } = useCurrentInstance()
console.log('全局属性: ', proxy, proxy.$abc)

const userStore = useUserStore()
const { info } = storeToRefs(userStore)
console.log('测试 user store: ', info)

watch(
  () => userStore.info,
  () => {
    console.log('watch user store: ', userStore.info)
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<template>
  <div class="home-wrapper">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <SvgIcon name="dataAssets" size="default" color="#f00" />
  </div>
</template>

<style>
.home-wrapper {
  text-align: center;
}
</style>
