import request from '@/utils/request.js'

// 用户登录
export const postUserLogin = () => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info'
  })
}
