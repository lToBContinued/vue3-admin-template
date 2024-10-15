<template>
  <div class="homeLayout">
    <el-card class="box">
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div>
          <h3 class="title">{{ getTimePeriod() }}&nbsp;{{ userStore.username }}</h3>
          <p class="subtitle">xxx后台管理系统</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" size="500"></svg-icon>
    </div>
  </div>
</template>

<script setup>
import useUserStore from '@/stores/modules/user.js'
import getTimePeriod from '@/utils/getTimePeriod.js'

const userStore = useUserStore() // 用户仓库
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 50%;
}

.title {
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}

.subtitle {
  font-style: italic;
  color: #ccc;
  line-height: 1;
}

.bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
