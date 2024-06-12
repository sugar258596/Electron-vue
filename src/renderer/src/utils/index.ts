import type { App, Component } from 'vue'

import { mergeWith, unionWith, intersectionWith, isEqual } from 'lodash'

import { isArray, isObject } from './is'

type MergeArrays = 'union' | 'intersection' | 'concat' | 'replace'
type Ta = object | null | undefined

/**
 * @description 数据合并
 * @param soure 合并数据的源数据
 * @param target 合并的目标数据
 * @param mergeArrays 合并数组的方式
 * 如何合并数组。默认为replace。
 * - "union": Union the arrays. 对数组执行并集操作。
 * - "intersection": Intersect the arrays. 对数组执行交集操作。
 * - "concat": Concatenate the arrays. 连接数组。
 * - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 */
export const deepMerge = <T extends Ta, U extends Ta>(
  soure: T,
  target: U,
  mergeArrays: MergeArrays = 'replace'
): T & U => {
  if (!soure) return target as T & U
  if (!target) return soure as T & U

  return mergeWith({}, soure, target, (objValue, srcValue) => {
    if (isArray(objValue) && isArray(srcValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(objValue, srcValue, isEqual)
        case 'intersection':
          return intersectionWith(objValue, srcValue, isEqual)
        case 'concat':
          return objValue.concat(srcValue)
        case 'replace':
          return srcValue
        default:
          throw new Error('mergeArrays 参数错误')
      }
    }
    if (isObject(objValue) && isObject(srcValue)) {
      return deepMerge(objValue, srcValue, mergeArrays)
    }
    return undefined
  })
}

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
export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
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
