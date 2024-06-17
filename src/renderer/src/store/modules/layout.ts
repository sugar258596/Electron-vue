import { defineStore } from 'pinia'

import { store } from '@/store'
import { getVideo } from '@/api/home'

interface Params {
  // 分页
  page?: number
  // 每页条数
  limit?: number
  // 搜索关键字
  keyword?: string
}

interface LayoutState {
  VideoList: any[]
  show: boolean // 是否正在加载数据
  params: Params
  first: boolean // 是否为第一次加载数据
}

export const useLayoutStore = defineStore({
  id: 'app-layout',
  state: (): LayoutState => ({
    VideoList: [],
    show: false,
    params: {
      page: 1,
      limit: 10,
      keyword: ''
    },
    first: true
  }),
  getters: {
    getVideo(): any[] {
      return this.VideoList
    },
    getShow(): boolean {
      return this.show
    },
    getFirst(): boolean {
      return this.first
    }
  },
  actions: {
    /**
     * @description 获取视频列表
     * @param {boolean}  reset
     */
    async apiVideoList(reset: boolean = false) {
      this.setShow(true)
      if (reset) {
        this.VideoList = []
        this.setParams(true)
        this.first = true
      }
      const { data } = await getVideo(this.params)
      this.setVideoList(data)
      this.setShow(false)
      this.setParams()
      this.first = false
    },

    // 搜索数据
    async searchVideoList(params: Params) {
      Object.assign(this.params, params)
      const { data } = await getVideo(this.params)
      this.setVideoList(data)
      this.setShow(false)
      this.setParams()
    },

    setVideoList(list: any[]) {
      this.VideoList = this.VideoList.concat(list)
    },
    setShow(show: boolean) {
      this.show = show
    },
    /**
     * @description 设置分页参数
     * @param flge 是否重置
     */
    setParams(flge: boolean = false) {
      if (flge) {
        this.params = {
          page: 1,
          limit: 10,
          keyword: ''
        }
      } else {
        this.params.page! += 1
      }
    }
  }
})

export function useLayoutStoreWithOut() {
  return useLayoutStore(store)
}
