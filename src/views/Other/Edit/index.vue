<route>
{
  name: "other-edit-page",
  meta: {
    requiresAuth: false,
    hidden: true,
  }
}
</route>

<template>
  <div>
    <h1>{{ msg }} 页面</h1>
  </div>
</template>

<script setup lang="ts">
const msg = ref('otherEdit')
</script>

<style lang="less" scoped></style>
