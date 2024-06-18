import { MockMethod } from 'vite-plugin-mock'
import { videoList } from './_data'

export default [
  {
    url: '/api/video',
    timeout: 100,
    method: 'post',
    response: ({ query }) => {
      const { page = 1, pageSize = 10, keyword = '' } = query
      let filteredList: any[] = []
      if (keyword) {
        const pattern = new RegExp(keyword)
        filteredList = videoList.filter((video) => {
          return pattern.test(video.title)
        })
      } else {
        filteredList = videoList
      }
      const total = filteredList.length
      const start = (page - 1) * pageSize
      const end = page * pageSize
      const items = filteredList.slice(start, end)
      return {
        code: 0,
        message: 'success',
        total,
        data: items,
        page: {
          page,
          pageSize
        }
      }
    }
  }
] as MockMethod[]
