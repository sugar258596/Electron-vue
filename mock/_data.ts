import Mock from 'mockjs'
import { VideoType } from './_type'
import { formatNumber, formatTime } from './_utils'

const list: VideoType[] = Mock.mock({
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

export const videoList: VideoType[] = list.map((video) => ({
  ...video,
  duration: formatTime(video.duration),
  playCount: formatNumber(video.playCount),
  commentCount: formatNumber(video.commentCount)
}))
