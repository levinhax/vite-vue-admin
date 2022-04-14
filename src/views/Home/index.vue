<route>
{
  name: "home-page",
  meta: {
    requiresAuth: false,
    title: '首页',
  }
}
</route>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCurrentInstance from '../../hooks/useCurrentInstance'
import useClickOutside from '@/hooks/useIsClickOutside'
import { useUserStore } from '../../store/modules/user'
import MyWorker from './worker?worker'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'

import SvgIcon from '@/components/SvgIcon/index.vue'

const { proxy } = useCurrentInstance()
console.log('全局属性: ', proxy, proxy.$abc)

const userStore = useUserStore()
const { info } = storeToRefs(userStore)
console.log('测试 user store: ', info)

const nodeRef = ref<HTMLElement | null>(null)
const isClickOutside = useClickOutside(nodeRef)
watch(isClickOutside, () => {
  console.log('watch isClickOutside: ', isClickOutside.value)
})

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

const worker = new MyWorker()
worker.onmessage = e => console.log(`Main: Received message - ${e.data}`)
worker.postMessage('Home Main')
</script>

<template>
  <div class="home-wrapper">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <SvgIcon name="dataAssets" size="default" color="#f00" />
    <div ref="nodeRef" style="width: 320px; height: 80px; border: 1px dotted #ccc; line-height: 80px">
      试试点击我和之外的区域！
    </div>
  </div>
</template>

<style>
.home-wrapper {
  text-align: center;
}
</style>
