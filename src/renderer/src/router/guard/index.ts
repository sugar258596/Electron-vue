import { Router } from 'vue-router'

// 路由守卫配置
export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(to, from)
    next()
  })
}
