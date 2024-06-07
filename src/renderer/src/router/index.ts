import type { RouteRecord } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'

import { basicRoutes } from './menus' //

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecord[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
