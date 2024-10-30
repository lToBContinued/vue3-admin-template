<template>
  <div class="container">
    <div class="box">
      <img src="../../assets/images/error_images/404.png" alt="" />
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;

  .box {
    position: relative;
  }

  .img {
    width: 800px;
    height: 800px;
  }

  .el-button {
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);
  }
}
</style>
