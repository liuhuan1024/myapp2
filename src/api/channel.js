/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
