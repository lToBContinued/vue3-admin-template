// 常量路由配置
export const constantRoute = [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 登陆成功后展示数据的页面
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/index.vue')
  },
  // 404
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any'
  }
]
