// 常量路由配置
export const constantRoute = [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 路由标题在菜单中是否隐藏
      icon: 'Promotion' // 菜单左侧图表，支持element-plus全部图标
    },
    component: () => import('@/views/login/index.vue')
  },
  // 登陆成功后展示数据的页面
  {
    path: '/',
    name: 'layout',
    meta: {
      title: 'layout',
      icon: 'Avatar'
    },
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      // 首页
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: 'HomeFilled'
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  // 数据大屏
  {
    path: '/screen',
    name: 'screen',
    meta: {
      title: '数据大屏',
      icon: 'DataBoard'
    },
    component: () => import('@/views/screen/index.vue')
  },
  // 权限管理
  {
    path: '/acl',
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    redirect: '/acl/user',
    component: () => import('@/layout/index.vue'),
    children: [
      // 用户管理
      {
        path: '/acl/user',
        name: 'Acl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        },
        component: () => import('@/views/acl/user/index.vue')
      },
      // 角色管理
      {
        path: '/acl/roler',
        name: 'Roler',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        },
        component: () => import('@/views/acl/roler/index.vue')
      },
      // 菜单管理
      {
        path: '/acl/permission',
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'List'
        },
        component: () => import('@/views/acl/permission/index.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods'
    },
    component: () => import('@/layout/index.vue'),
    redirect: '/product/trademark',
    children: [
      // 品牌管理
      {
        path: '/product/trademark',
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull'
        },
        component: () => import('@/views/product/trademark/index.vue')
      },
      // 属性管理
      {
        path: '/product/attr',
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled'
        },
        component: () => import('@/views/product/attr/index.vue')
      },
      // spu管理
      {
        path: '/product/spu',
        name: 'Spu',
        meta: {
          title: 'spu管理',
          icon: 'Calendar'
        },
        component: () => import('@/views/product/spu/index.vue')
      },
      // sku管理
      {
        path: '/product/sku',
        name: 'Sku',
        meta: {
          title: 'sku管理',
          icon: 'Orange'
        },
        component: () => import('@/views/product/sku/index.vue')
      }
    ]
  },
  // 404
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete'
    },
    component: () => import('@/views/404/index.vue')
  },
  // 任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine'
    }
  }
]
