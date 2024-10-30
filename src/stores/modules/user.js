// 用户相关仓库
import { defineStore } from 'pinia'
import { getUserInfoApi, postLogoutApi, postUserLoginApi } from '@/api/user/index.js'
// 引入路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes.js'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.js'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash/lang.js' // 深拷贝方法
import router from '@/router/index.js'

// 过滤当前用户需要展示的异步路由
const filterAsyncRoutes = (asyncRoute, routes) => {
  return asyncRoute.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(), // 用户token
      menusRoutes: [...constantRoute, ...asyncRoute, ...anyRoute], // 仓库存储生成菜单需要数组（路由）
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
        this.token = res.data
        SET_TOKEN(res.data) // 本地存储token
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
        this.username = res.data.name
        this.avatar = res.data.avatar
        const userAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoute), res.data.routes)
        // 菜单的数据
        this.menusRoutes = [...constantRoute, ...userAsyncRoutes, ...anyRoute]
        ;[...userAsyncRoutes, ...anyRoute].forEach((item) => {
          router.addRoute(item)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },

    // 退出登录
    async userLogout() {
      const res = await postLogoutApi()
      if (res.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = REMOVE_TOKEN()
        return 'ok'
      } else {
        ElMessage({
          message: '退出登录失败，请重试',
          type: 'error'
        })
        return Promise.reject(new Error(res.message))
      }
    }
  },
  getters: {}
})

export default useUserStore
