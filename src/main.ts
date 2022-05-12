import startQiankun from './micro'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import piniaStore from './store'
import 'virtual:svg-icons-register'
import GlobalComponents from './components'

import './router/permission'

import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.variable.min.css'

// unplugin-vue-components can only deal with components. Others such as message should be loaded manually:
import { message } from 'ant-design-vue'
// import 'ant-design-vue/es/message/style/css' // vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

// createApp(App).use(router).mount('#main-app')

async function startApp() {
  try {
    // await store.dispatch('globalStore/updateSysAction');
  } catch (e) {
    console.log('获取系统信息失败')
  } finally {
    // 启动应用
    startQiankun()
    const app = createApp(App)

    // 设置全局属性
    app.config.globalProperties.$abc = 'global-abc'

    app.config.globalProperties.$message = message

    app.use(Antd).use(GlobalComponents).use(router).use(piniaStore).mount('#main-app')
  }
}

startApp()
