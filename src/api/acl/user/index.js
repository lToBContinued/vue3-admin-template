import request from '@/utils/request.js'
import USER_URL from './userUrl.js'

// 获取用户列表
export const getUserInfoApi = (params = {}) => {
  const { page, limit } = params
  return request({
    url: `${USER_URL.ALL_USER_LIST}/${page}/${limit}`
  })
}
