import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd()) // 获取各种环境下对应的变量
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        // scss全局变量配置
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]:{
          target: env.VITE_SERVE, // 获取数据的服务器地址
          changeOrigin: true, // 是否代理跨域
          rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
        }
      }
    }
  }
})
