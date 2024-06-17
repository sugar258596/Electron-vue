import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

interface VideoType {
  // id
  id: number
  // 视频地址
  url: string
  // 视频封面
  cover: string
  // 视频标题
  title: string
  // 发布的up主
  up: string
  // 发布时间
  creTime: string
  // 视频时长
  duration: string
  // 播放量
  playCount: string
  // 评论数
  commentCount: string
}

const videoList: VideoType[] = Mock.mock({
  'list|100': [
    // 生成100条数据用于分页演示
    {
      'id|+1': 1,
      url: '@url()',
      cover: '@image("200x100")',
      title: '@ctitle(5, 20)',
      up: '@cname()',
      creTime: '@datetime(MM-dd)',
      duration: '@integer(10, 100)',
      playCount: '@integer(1, 10000)',
      commentCount: '@integer(1, 10000)'
    }
  ]
}).list

videoList.forEach((video) => {
  video.duration = formatTime(video.duration)
  video.playCount = formatNumber(video.playCount)
  video.commentCount = formatNumber(video.commentCount)
})

// 将秒转为分秒
function formatTime(time: string) {
  const timeNum = Number(time)
  const min = Math.floor(timeNum / 60)
  const sec = timeNum % 60
  return `${min}:${sec > 9 ? sec : '0' + sec}`
}

// 将数字按照千分位或者万分位格式化
function formatNumber(n: string) {
  const num = Number(n)
  if (num < 10000 && num > 1000) {
    const formattedNumber = Math.floor(num / 100) / 10
    return formattedNumber.toFixed(1) + 'k'
  }
  if (num >= 10000) {
    const formattedNumber = Math.floor(num / 1000) / 100
    return formattedNumber.toFixed(1) + 'k'
  }
  return n
}

export default [
  {
    url: '/api/video',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const page = parseInt(query.page) || 1
      const pageSize = parseInt(query.pageSize) || 10
      const total = videoList.length
      const start = (page - 1) * pageSize
      const end = page * pageSize
      const items = videoList.slice(start, end)
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
