// 用户相关仓库
import { defineStore } from 'pinia'
import { postUserLogin } from '@/api/user/index.js'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: '', // 用户token
      menusRoutes: constantRoute // 仓库存储生成菜单需要数组（路由）
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
    }
  },
  getters: {},

  // 持久化配置
  persist: [
    {
      key: 'token',
      paths: ['token']
    }
  ]
})

export default useUserStore
