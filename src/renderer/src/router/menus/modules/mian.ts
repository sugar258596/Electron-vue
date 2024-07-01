import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const Main: AppRouteModule = {
  path: '/main',
  name: 'Main',
  component: LAYOUT,
  redirect: '/home',
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/hot',
      name: 'Hot',
      component: () => import('@/views/home/Hot/index.vue'),
      meta: {
        title: '热门'
      }
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/views/my/index.vue'),
      meta: {
        title: '我的'
      }
    }
  ]
}

export default Main
