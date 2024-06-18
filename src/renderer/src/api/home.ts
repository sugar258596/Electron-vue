import { request } from '@/utils/http'

interface Params {
  page?: number
  pageSize?: number
  keyword?: string
}

enum Api {
  getVideo = '/api/video',
  searchVideo = '/api/searchVideo'
}

export const getVideo = (params?: Params) => {
  return request.post({
    url: Api.getVideo,
    params
  })
}
