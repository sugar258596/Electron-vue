import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      UnoCSS('../uno.config.ts'),
      // mocks 数据模拟
      viteMockServe({
        mockPath: './mock', // 指向mock下的文件
        ignore: /^\_/, // 忽略下划线开头的文件
        watchFiles: true, // 监听文件内容变更
        logger: true, // 是否打印日志
        injectCode: `
          import { setupProdMockServer } from './mock/_mockProdServer';
          setupProdMockServer();
        `,
        injectFile: resolve('./src/renderer/src/main.ts')
      })
    ]
  }
})
