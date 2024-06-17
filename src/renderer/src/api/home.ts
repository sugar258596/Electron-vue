import { request } from '@/utils/http'

enum Api {
  getVideo = '/api/video'
}

export const getVideo = (params?: any) => {
  return request.get({
    url: Api.getVideo,
    params
  })
}
