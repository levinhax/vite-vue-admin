<script setup lang="ts">
import { useUserStore } from '../../../store/modules/user'
const userStore = useUserStore()
const message = ref('hello levin')

const handleUpdateUser = () => {
  console.log('handleUpdateUser')
  userStore.setUser({
    user_id: 2,
    userName: 'sysAdmin',
    phone: '13909878899',
  })
}
</script>

<template>
  <div class="test-wrapper">
    {{ message }}
    <a-divider orientation="left">函数</a-divider>
    <div>
      <a-button type="primary" @click="handleUpdateUser"> 更新user store </a-button>
    </div>
  </div>
</template>

<style></style>
