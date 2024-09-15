// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Search from './Search/CategorySearch.vue'
import GnPagination from './gn-pagination/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入element的所有图标

const allGlobalComponent = {
  SvgIcon,
  Search,
  GnPagination
}

// 对外暴露插件对象
export default {
  install(app) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 注册element图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
