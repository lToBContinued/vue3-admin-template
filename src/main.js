import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// element插件安装
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@js-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register' // 导入svg图标
import globalComponent from './components/index' // 全局组件
import './styles/index.scss' // 引入模板的全局样式
import pinia from '@/stores/index.js' // 引入pinia仓库

app.use(createPinia())
app.use(router)
// 注册element插件
app.use(ElementPlus, {
  locale: zhCn
})
app.use(globalComponent) // 注册全局组件
app.use(pinia) // 安装仓库

app.mount('#app')
