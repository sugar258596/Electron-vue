import { Router } from 'vue-router'

// 路由守卫配置
export function setupRouterGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    // 如果路由不存在，跳转到 404 页面，并且清除浏览器地址栏

    if (!to.name) {
      next({ name: 'Root' })
      // window.history.replaceState(null, '', '/')
      return
    }
    next()
  })
}
