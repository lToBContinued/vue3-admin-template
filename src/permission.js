// 全局导航守卫
// noinspection JSUnresolvedReference

import router from '@/router'
import nprogress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css'
import useUserStore from '@/stores/modules/user.js'
import setting from './setting.js'
nprogress.configure({ showSpinner: false }) // 关闭旋转进度条

// 全局前置守卫
/*
 * to：要访问的路由
 * from：从哪个路由而来
 * next：路由的放行函数
 * */
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title}` // 修改页面标题
  const userStore = useUserStore() // 用户仓库
  const token = userStore.token // 用户token
  const username = userStore.username // 用户名
  nprogress.start()
  // 根据用户仓库的token判断是否登录
  if (token) {
    // 如果存在token，则用户已经登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        // 如果有用户信息，则放行
        next()
      } else {
        // 如果没有用户信息，则获取用户信息，获取到了再放行
        try {
          // 成功获取用户信息
          await userStore.getUserInfo()
          next({ ...to })
        } catch (err) {
          // token过期，获取不到用户信息 -> 退出登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 如果不存在token，则用户未登录
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
