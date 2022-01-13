<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu v-if="menuInfo.children?.length" :key="menuInfo.path" v-bind="$attrs">
      <template #title>
        <span>
          <!-- <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" /> -->
          <AppstoreOutlined />
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <!-- <icon-font style="color: aliceblue" :type="item.meta.icon" /> -->
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-sub-menu>
    <a-menu-item v-else :key="menuInfo.name">
      <!-- <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" /> -->
      <AppstoreOutlined />
      {{ menuInfo.meta.title }}
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from 'ant-design-vue'
// import { IconFont } from '@/components/iconfont';
import { AppstoreOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'ComMenuItem',
  components: {
    // IconFont,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item,
    AppstoreOutlined,
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style scoped></style>
