// 全局导航守卫
import router from '@/router'
import nprogress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css'

// 全局前置守卫
/*
* to：要访问的路由
* from：从哪个路由而来
* next：路由的放行函数
* */
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.end()
})
