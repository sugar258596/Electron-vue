import { defineStore } from 'pinia'

import { store } from '@/store'

import { router } from '@/router'
import { asyncRoutes } from '@/router/menus'

interface UserState {
  userInfo: string
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-use',
  state: (): UserState => ({
    userInfo: '',
    token: undefined
  }),
  getters: {
    getToken(): string {
      return this.token!
    }
  },
  actions: {
    setToken(info: string) {
      this.token = info ? info : ''
    },
    login(params: any) {
      const { username, password } = params
      if (password == '123456') {
        asyncRoutes.forEach(async (route: any) => {
          router.addRoute(route)
        })
        this.setToken(username)
        router.push({ path: '/main' })
      }
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
