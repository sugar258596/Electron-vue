import { defineStore } from 'pinia'

import { store } from '@/store'
import { getVideo } from '@/api/home'

interface Params {
  // 分页
  page?: number
  // 每页条数
  pageSize?: number
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
      pageSize: 18,
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
      if (!this.canLoadMore && !reset) return
      this.show = true
      if (reset) {
        this.setParams(true)
      }
      const { data, total } = await getVideo(this.params)
      this.total = total
      this.setVideoList(data)
    },

    // 搜索数据
    async searchVideoList(key: string) {
      if (!this.canLoadMore) return
      if (this.VideoList.length > 0) this.setParams(true)
      this.show = true
      this.params.keyword = key
      const { data, total } = await getVideo(this.params)
      this.total = total
      this.setVideoList(data)
    },

    // 设置视频列表
    setVideoList(list: any[]) {
      this.VideoList = this.VideoList.concat(list)
      this.setParams()
      this.canLoadMore =
        Math.floor(this.total! / this.params.pageSize!) >= this.params.page! ? true : false
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
      this.VideoList = []
      this.first = true
      this.params = {
        page: 1,
        pageSize: 10,
        keyword: ''
      }
      this.canLoadMore = true
    }
  }
})

export function useLayoutStoreWithOut() {
  return useLayoutStore(store)
}
