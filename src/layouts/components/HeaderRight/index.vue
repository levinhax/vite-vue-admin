<template>
  <div class="header-right-wrapper">
    <a-dropdown placement="bottomCenter">
      <template #overlay>
        <a-menu :selectedKeys="selectedKeys" class="header-menu" @click="handleMenuClick">
          <a-menu-item key="mine">
            <UserOutlined />
            <span>个人中心</span>
          </a-menu-item>
          <a-menu-item key="logout">
            <PoweroffOutlined />
            <span>登出</span>
          </a-menu-item>
        </a-menu>
      </template>

      <a class="ant-dropdown-link" @click.prevent>
        <span class="username">用户名</span>
        <DownOutlined />
      </a>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { DownOutlined, UserOutlined, PoweroffOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const selectedKeys = ref<string[]>([])

const handleMenuClick = ({ key }: any) => {
  switch (key) {
    case 'mine':
      break
    case 'setting':
      break
    case 'logout':
      localStorage.clear()
      router.push('/login')
      break
    default:
      message.warning('没有该操作')
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
