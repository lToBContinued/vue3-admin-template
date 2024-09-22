import request from '@/utils/request.js'
import USER_URL from './userUrl.js'

// 获取用户列表
export const getUserInfoApi = (params = {}) => {
  const { page, limit } = params
  return request({
    url: `${USER_URL.ALL_USER_LIST_URL}/${page}/${limit}`
  })
}

// 添加/更新用户
export const addOrUpdateUserApi = (data = {}) => {
  if (data.id) {
    return request({
      url: USER_URL.UPDATE_USER_URL,
      method: 'PUT',
      data
    })
  } else {
    return request({
      url: USER_URL.ADD_USER_URL,
      method: 'POST',
      data
    })
  }
}
