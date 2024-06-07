import type { App, Component } from 'vue'

type EventShim = {
  new (...args: any[]): {
    // 定义构造函数签名
    $props: {
      // 定义 props ，里面可能有onClick事件
      onClick?: (...args: any[]) => void
    }
  }
}

export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export type CustomComponent = Component & { displayName?: string }

// 组件注册
export const winthInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const compName = component.displayName || component.name
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.component(alias, component)
    }
  }
  return component as WithInstall<T>
}
