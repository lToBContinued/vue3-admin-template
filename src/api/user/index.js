import request from '@/utils/request.js'
import USER_URL from './userUrl.js'
// 用户登录
export const postUserLoginApi = (data) => {
  return request({
    url: USER_URL.LOGIN_URL,
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: USER_URL.USER_INFO_URL
  })
}

// 退出登录
export const postLogoutApi = (data = {}) => {
  return request({
    url: USER_URL.LOGOUT_URL,
    method: 'post',
    data
  })
}

// 获取菜单列表
export const getMenuListApi = () => {
  return request({
    url: USER_URL.MENU_URL
  })
}
