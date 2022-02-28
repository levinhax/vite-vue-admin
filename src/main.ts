import startQiankun from './micro'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'virtual:svg-icons-register'

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

    app.use(router).mount('#main-app')
  }
}

startApp()
