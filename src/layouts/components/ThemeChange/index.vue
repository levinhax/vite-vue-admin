<template>
  <a-select
    ref="themeSelect"
    v-model:value="currentTheme"
    :options="themeOptions"
    style="width: 80px"
    @change="handleChange"
  >
  </a-select>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'

const themeOptions = ref<any>([
  {
    value: 'light',
    label: '明亮',
  },
  {
    value: 'dark',
    label: '暗黑',
  },
])

const currentTheme = ref<string>('light')

const colorState = reactive({
  primaryColor: '#1890ff',
  errorColor: '#ff4d4f',
  warningColor: '#faad14',
  successColor: '#52c41a',
  infoColor: '#1890ff',
})

ConfigProvider.config({
  // prefixCls: 'custom',
  theme: colorState,
})

const handleChange = (value: string) => {
  console.log(`selected theme: ${value}`)

  if (value === 'dark') {
    Object.assign(colorState, { primaryColor: 'rgb(37, 184, 100)' })
  } else {
    Object.assign(colorState, { primaryColor: '#1890ff' })
  }

  ConfigProvider.config({
    // prefixCls: 'custom',
    theme: colorState,
  })
}
</script>
