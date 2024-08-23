import request from '@/utils/request.js'

// 用户相关的请求地址
const LOGIN_URL = '/admin/acl/index/login' // 登录
const USER_INFO_URL = '/admin/acl/index/info' // 获取用户信息
const LOGOUT_URL = '/admin/acl/index/logout' // 退出登录

// 用户登录
export const postUserLoginApi = (data) => {
  return request({
    url: LOGIN_URL,
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: USER_INFO_URL
  })
}

// 退出登录
export const postLogoutApi = (data = {}) => {
  return request({
    url: LOGOUT_URL,
    method: 'post',
    data
  })
}
