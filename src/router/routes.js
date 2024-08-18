// 常量路由配置
export const constantRoute = [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录', // 菜单标题
      hidden: true // 路由标题在菜单中是否隐藏
    },
    component: () => import('@/views/login/index.vue')
  },
  // 登陆成功后展示数据的页面
  {
    path: '/',
    name: 'layout',
    meta: {
      title: 'layout',
      hidden: false
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          hidden: false
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/ceshi',
        meta: {
          title: '测试',
          hidden: true
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  // 404
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: true
    },
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true
    }
  }
]
