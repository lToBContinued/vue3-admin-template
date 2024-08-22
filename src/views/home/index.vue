<template>
  <div>
    <h1>我是一级路由，展示登录以后的数据{{ userStore.username }}{{ userStore.avatar }}</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useUserStore from '@/stores/modules/user.js'

const userStore = useUserStore() // 用户仓库

onMounted(() => {
  // 获取用户信息
  userStore.getUserInfo()
})
</script>

<style scoped></style>
