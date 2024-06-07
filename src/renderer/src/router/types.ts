import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  fullPath?: string
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  // 名称
  name: string

  //
  icon?: string

  // 图标
  img?: string

  // 路径
  path: string

  // path contains param, auto assignment.
  // 自动生成
  paramPath?: string

  //
  disabled?: boolean

  //
  children?: Menu[]

  // 权重
  orderNo?: number

  //
  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export type MenuModule = Menu

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw
