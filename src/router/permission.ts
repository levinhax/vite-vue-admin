import { router } from '.'
// import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { getToken } from '../utils/auth'

const whiteList = ['/login']

router.beforeEach(async (to: RouteLocationNormalized, _, next) => {
  // 页面跳转取消请求
  //   if (window.__axiosPromiseArr.length > 0) {
  //     window.__axiosPromiseArr.forEach(e => {
  //       e && e.func()
  //     })
  //     window.__axiosPromiseArr = []
  //   }

  // 页面权限控制
  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 是否获取过用户信息
      const isGetUserInfo = true
      if (isGetUserInfo) {
        // if (to.path === '/') {
        //   next({ path: '/home' })
        // }
        next()
      } else {
        // 没有获取，请求数据
        // await fetchAuths()
        // 过滤权限路由
        // const routes = await getAsyncRouter()
        // 404 路由放在权限路由后面
        // routes.forEach((route: RouteRecordRaw) => {
        //   router.addRoute(route)
        // })
        // hack 方法
        // 不使用 next() 是因为，在执行完 router.addRoute 后，原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
        next({ ...to, replace: true })
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
