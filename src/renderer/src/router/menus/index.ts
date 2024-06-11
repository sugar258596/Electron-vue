import { AppRouteModule, AppRouteRecordRaw } from '../types'

// 读取 modules 所有路由配置
const modeule = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: AppRouteModule[] = []

Object.keys(modeule).forEach((key) => {
  const mod = (modeule as any)[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [...routeModuleList]
// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/main',
  meta: {
    title: 'Root'
  }
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: '登录'
  }
}

export const basicRoutes = [LoginRoute, RootRoute, ...asyncRoutes]
