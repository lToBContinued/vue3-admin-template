// 用户相关仓库
import { defineStore } from 'pinia'
import { getUserInfoApi, postUserLoginApi } from '@/api/user/index.js'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes.js'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(), // 用户token
      menusRoutes: constantRoute, // 仓库存储生成菜单需要数组（路由）
      username: '', // 用户名
      avatar: '' // 用户头像
    }
  },
  actions: {
    // 用户登录
    async userLogin(data) {
      const res = await postUserLoginApi(data)
      // 登录成功
      if (res.code === 200) {
        this.token = res.data.token
        SET_TOKEN(res.data.token) // 本地存储token
        return 'ok'
      } else {
        // 登录失败
        return Promise.reject(new Error(res.data.message))
      }
    },

    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfoApi()
      if (res.code === 200) {
        // 获取用户信息成功
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },

    // 退出登录
    userLogout() {
      this.username = ''
      this.avatar = ''
      this.token = REMOVE_TOKEN()
    }
  },
  getters: {}
})

export default useUserStore
