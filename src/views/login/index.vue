<template>
  <div class="loginLayout">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="userFrom" :rules="rules" class="login-form" :model="loginForm" label-position="right">
          <h1>Hello</h1>
          <h2>欢迎使用xxx后台管理系统</h2>
          <el-form-item prop="username">
            <el-input
              type="text"
              :prefix-icon="User"
              v-model="loginForm.username"
              size="large"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
              placeholder="请输入密码"
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="display: flex; justify-content: space-between; width: 100%">
              <el-checkbox style="color: #fff" v-model="rememberPassword" @change="changeRememberStatus">
                记住密码
              </el-checkbox>
              <el-link style="color: #fff">找回密码</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="login-btn" size="large" @click="login">
              登&nbsp;&nbsp;&nbsp;录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user.js'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import getTimePeriod from '@/utils/getTimePeriod.js'

const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore() // 用户仓库
const loading = ref(false) // 按钮加载效果
// 用户登录账号和密码
const loginForm = ref({
  username: '',
  password: ''
})
const rememberPassword = ref() // 是否记住密码
// 读取记住密码后的账号和密码
loginForm.value = {
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || ''
}
const userFrom = ref(null) // 获取表单DOM
// 表单验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

// 点击登录
const login = () => {
  loading.value = true // 加载效果
  userFrom.value.validate(async (valid, fields) => {
    if (valid) {
      try {
        // 登陆成功
        await userStore.userLogin(loginForm.value)
        changeRememberStatus() // 是否记住账号密码
        $router.push({
          path: $route.query?.redirect || '/'
        })
        ElNotification({
          type: 'success',
          title: `HI，${getTimePeriod()}`,
          message: '欢迎回来',
          duration: 2000
        })
        loading.value = false
      } catch (err) {
        // 登录失败
        ElNotification({
          type: 'error',
          title: '登录失败',
          message: err.message,
          duration: 2000
        })
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        loading.value = false
        console.dir(err)
      }
    } else {
      loading.value = false
      console.error('表单错误，检查表单', fields)
    }
  })
}

// 是否记住账号密码
const changeRememberStatus = () => {
  if (rememberPassword.value) {
    // 记住密码
    localStorage.setItem('username', loginForm.value.username)
    localStorage.setItem('password', loginForm.value.password)
  } else {
    // 不记住密码
    localStorage.removeItem('username')
    localStorage.removeItem('password')
  }
}
</script>

<style scoped lang="scss">
.loginLayout {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    top: 25vh;
    width: 60%;
    padding: 40px;
    margin: 0 auto;
    background-color: rgba(146, 181, 255, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 30px;

    h1 {
      font-size: 40px;
      color: #fff;
    }

    h2 {
      margin: 20px 0;
      font-size: 20px;
      color: #fff;
    }

    .login-btn {
      width: 100%;
      font-size: 16px;
    }
  }
}
</style>
