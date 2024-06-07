import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import App from './App.vue'

import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'

function bootstrap() {
  const app = createApp(App)

  //注册路由
  setupRouter(app)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
