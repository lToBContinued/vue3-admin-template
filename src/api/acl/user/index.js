import request from '@/utils/request.js'
import USER_URL from './userUrl.js'

// 获取用户列表
export const getUserInfoApi = (params = {}) => {
  const { page, limit, keyword } = params
  return request({
    url: `${USER_URL.ALL_USER_LIST_URL}/${page}/${limit}/?username=${keyword}`
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

// 获取全部职位以及包含当前用户已有的职位
export const getAllRoleApi = (params = {}) => {
  const { userId } = params
  return request({
    url: `${USER_URL.ALL_ROLE_URL}/${userId}`
  })
}

// 分配职位
export const postSetUserRoleApi = (data = {}) => {
  return request({
    url: USER_URL.SET_ROLE_URL,
    method: 'POST',
    data
  })
}

// 删除某一个用户
export const deleteUserApi = (data = {}) => {
  const { id } = data
  return request({
    url: `${USER_URL.DELETE_USER_URL}/${id}`,
    method: 'DELETE'
  })
}

// 批量删除用户
export const deleteAllUserApi = (data = {}) => {
  return request({
    url: USER_URL.DELETE_ALL_USER_URL,
    method: 'DELETE',
    data
  })
}
