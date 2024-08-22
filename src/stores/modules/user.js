// 用户相关仓库
import { defineStore } from 'pinia'
import { getUserInfo, postUserLogin } from '@/api/user/index.js'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: '', // 用户token
      menusRoutes: constantRoute, // 仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: ''
    }
  },
  actions: {
    // 用户登录
    async userLogin(data) {
      const res = await postUserLogin(data)
      // 登录成功
      if (res.code === 200) {
        this.token = res.data.token
        return 'ok'
      } else {
        // 登录失败
        return Promise.reject(new Error(res.data.message))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfo()
      console.log(res)
      if (res.code === 200){
        // 获取用户信息成功
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
      }
    }
  },
  getters: {},

  // 持久化配置
  persist: [
    {
      key: 'token',
      paths: ['token']
    },
    {
      key: 'username',
      paths: ['username']
    },
    {
      key: 'avatar',
      paths: ['avatar']
    }
  ]
})

export default useUserStore
