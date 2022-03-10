<route>
{
  name: "other-page",
  meta: {
    requiresAuth: false,
    hidden: true,
  }
}
</route>

<script setup lang="ts">
const msg = ref('other')
</script>

<template>
  <div>
    <h1>{{ msg }} 页面</h1>
  </div>
</template>

<style lang="less" scoped></style>
