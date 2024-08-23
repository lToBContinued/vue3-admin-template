<template>
  <div>
    <h1>我是一级路由，展示登录以后的数据{{ userStore.username }}{{ userStore.avatar }}</h1>
  </div>
</template>

<script setup>
import useUserStore from '@/stores/modules/user.js'

const userStore = useUserStore() // 用户仓库
</script>

<style scoped></style>
