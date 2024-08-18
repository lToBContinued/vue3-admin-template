<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { postUserLogin } from '@/api/user/index.js'

onMounted(() => {
  const res = postUserLogin({
    username: 'admin',
    password: '111111'
  })
  console.log(res)
})
</script>

<style scoped></style>
