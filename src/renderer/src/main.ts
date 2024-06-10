import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from '@/store'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupGlobDirectives } from '@/directives'

function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  //注册路由
  setupRouter(app)

  // 注册路由守卫
  setupRouterGuard(router)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
