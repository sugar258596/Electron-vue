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
  canLoadMore: boolean // 是否可以加载更多
  total?: number // 总数据
}

export const useLayoutStore = defineStore({
  id: 'app-layout',
  state: (): LayoutState => ({
    VideoList: [],
    show: false,
    params: {
      page: 1,
      limit: 18,
      keyword: ''
    },
    first: true,
    canLoadMore: true,
    total: 0
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
    },
    getCanLoadMore(): boolean {
      return this.canLoadMore
    }
  },
  actions: {
    /**
     * @description 获取视频列表
     * @param {boolean}  reset
     */
    async apiVideoList(reset: boolean = false) {
      if (!this.canLoadMore) return
      this.show = true
      if (reset) {
        this.VideoList = []
        this.setParams(true)
        this.first = true
      }
      const { data, total } = await getVideo(this.params)
      this.total = total
      this.setVideoList(data)
    },

    // 搜索数据
    async searchVideoList(params: Params) {
      if (!this.canLoadMore) return
      this.show = true
      Object.assign(this.params, params)
      const { data, total } = await getVideo(this.params)
      this.total = total
      this.setVideoList(data)
    },

    // 设置视频列表
    setVideoList(list: any[]) {
      this.VideoList = this.VideoList.concat(list)
      this.setParams()
      this.canLoadMore =
        Math.floor(this.total! / this.params.limit!) >= this.params.page! ? true : false
      this.show = false
      this.first = false
    },

    /**
     * @description 设置分页参数
     * @param flge 是否重置
     */
    setParams(flge: boolean = false) {
      if (!flge) {
        this.params.page! += 1
        return
      }
      this.params = {
        page: 1,
        limit: 10,
        keyword: ''
      }
      this.canLoadMore = true
    }
  }
})

export function useLayoutStoreWithOut() {
  return useLayoutStore(store)
}
