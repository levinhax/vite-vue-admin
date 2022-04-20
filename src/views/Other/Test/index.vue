<script setup lang="ts">
import { useMouse, useDebounceFn, useThrottleFn } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '../../../store/modules/user'

const userStore = useUserStore()
const messageStr = ref('hello levin')
const uuidStr = ref<string>('')

const handleUpdateUser = () => {
  console.log('handleUpdateUser')
  userStore.setUser({
    user_id: 2,
    userName: 'sysAdmin',
    phone: '13909878899',
  })
}

const handleUpdateUUID = () => {
  uuidStr.value = uuidv4()
  console.log('uuidStr: ', uuidStr.value)
}

// tracks mouse position
const { x, y } = useMouse()

const updated1 = ref(0)
const clicked1 = ref(0)
const debouncedFn = useDebounceFn(
  () => {
    updated1.value += 1
  },
  1000,
  { maxWait: 5000 }
)
const clickedFn1 = () => {
  clicked1.value += 1
  debouncedFn()
}

const updated2 = ref(0)
const clicked2 = ref(0)
const throttledFn = useThrottleFn(() => {
  updated2.value += 1
}, 1000)
const clickedFn2 = () => {
  clicked2.value += 1
  throttledFn()
}
</script>

<template>
  <div class="test-wrapper">
    {{ messageStr }}
    <a-divider orientation="left">函数</a-divider>
    <div>
      <a-button type="primary" style="margin-right: 32px" @click="handleUpdateUser"> 更新user store </a-button>
      <a-button type="primary" @click="handleUpdateUUID"> 更新uuid </a-button>
    </div>
    <a-divider orientation="left">全局组件</a-divider>
    <div>
      <com-search-bar></com-search-bar>
    </div>
    <a-divider orientation="left">VueUse</a-divider>
    <div>
      <div>useMouse pos: {{ x }}, {{ y }}</div>
      <div>
        <a-button @click="clickedFn1">Smash me! (防抖)</a-button>
        <span>Delay is set to 1000ms and maxWait is set to 5000ms for this demo.</span>

        <p>Button clicked: {{ clicked1 }}</p>
        <p>Event handler called: {{ updated1 }}</p>
      </div>

      <div>
        <a-button @click="clickedFn2"> Smash me! (节流)</a-button>
        <span>Delay is set to 1000ms for this demo.</span>

        <p>Button clicked: {{ clicked2 }}</p>
        <p>Event handler called: {{ updated2 }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
