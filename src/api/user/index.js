import request from '@/utils/request.js'

// 用户登录
export const postUserLogin = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info'
  })
}
