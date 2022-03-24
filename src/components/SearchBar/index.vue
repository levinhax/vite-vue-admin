<script setup lang="ts" name="SearchBar">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()

defineProps<{ msg?: string }>()
</script>

<template>
  <div class="searchbar-component-wrap">
    <h1>SEARCHBAR 基础组件 {{ msg }}</h1>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
