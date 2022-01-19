<template>
  <!-- <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in state.breadcrumbItems" :key="index">
      <router-link :to="item">{{ breadcrumbNameMap[item] }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb> -->

  <a-breadcrumb :routes="state.breadcrumbItems">
    <template #itemRender="{ route }">
      <span v-if="state.breadcrumbItems.indexOf(route) === state.breadcrumbItems.length - 1">
        {{ breadcrumbNameMap[route] }}
      </span>
      <router-link v-else :to="route">
        {{ breadcrumbNameMap[route] }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { breadcrumbNameMap } from '../../constants'
const currentRoute = useRoute()
const state = reactive<any>({
  breadcrumbItems: [],
})

const getRouteBreadcrumb = () => {
  if (currentRoute) {
    const pathSnippetsArr = currentRoute.path.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippetsArr.map((_: any, index: number) => {
      const url = `/${pathSnippetsArr.slice(0, index + 1).join('/')}`
      return url
    })
    if (currentRoute.path !== '/home') {
      extraBreadcrumbItems.unshift('/home')
    }
    state.breadcrumbItems = extraBreadcrumbItems
  }
}

watchEffect(() => {
  getRouteBreadcrumb()
})
</script>
