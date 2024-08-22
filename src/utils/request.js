import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/stores/modules/user.js'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
  timeout: 60000 // 超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['token'] = userStore.token
    }
    return config
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 成功回调
    return res.data
  },
  (err) => {
    // 失败回调
    let message
    let status = err.res.status
    if (status === 401) {
      message = 'token过期'
    } else if (status === 403) {
      message = '没有权限访问'
    } else if (status === 404) {
      message = '请求地址错误'
    } else if (status === 500) {
      message = '服务器故障'
    } else {
      message = '网络错误'
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(err)
  }
)

export default request
