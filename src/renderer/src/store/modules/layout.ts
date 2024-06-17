import { defineStore } from 'pinia'

import { store } from '@/store'
import { getVideo } from '@/api/home'

interface LayoutState {
  VideoList: any[]
}

export const useLayoutStore = defineStore({
  id: 'app-layout',
  state: (): LayoutState => ({
    VideoList: []
  }),
  getters: {
    getVideo(): any[] {
      return this.VideoList
    }
  },
  actions: {
    // 获取初始数据
    async getVideoList() {
      const data = await getVideo()
      this.setVideoList(data)
    },

    // 搜索数据
    searchVideoList() {},

    //重置数据
    async resetVideoList() {
      this.VideoList = []
      const data = await getVideo()
      this.setVideoList(data)
    },

    setVideoList(list: any[]) {
      this.VideoList = list
    }
  }
})

export function useLayoutStoreWithOut() {
  return useLayoutStore(store)
}
