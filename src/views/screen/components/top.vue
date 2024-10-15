<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import moment from 'moment'

const $router = useRouter()
const time = ref(moment().format('YYYY-MM-DD hh:mm:ss')) // 当前时间
const timer = ref(null) // 定时器

onMounted(() => {
  // 更新时间
  setInterval(() => {
    time.value = moment().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  timer.value = null // 清除定时器
})

// 点击首页按钮回到首页
const goHome = () => {
  $router.push('/home')
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  width: 100%;
  height: 40px;
}

.left {
  flex: 1.5;
  background: url('../images/dataScreen-header-left-bg.png') no-repeat;
  background-size: cover;

  .lbtn {
    float: right;
    width: 150px;
    height: 40px;
    background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
    background-size: cover;
    text-align: center;
    line-height: 40px;
    color: #19fffc;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }
}

.center {
  flex: 2;

  .title {
    width: 100%;
    height: 74px;
    background: url('../images/dataScreen-header-center-bg.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 74px;
    color: #19fffc;
    font-size: 30px;
  }
}

.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1.5;
  background: url('../images/dataScreen-header-left-bg.png') no-repeat;
  background-size: cover;

  .rbtn {
    width: 150px;
    height: 40px;
    background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 40px;
    color: #19fffc;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }

  .time {
    margin-right: 40px;
    color: #19fffc;
    font-size: 20px;
  }
}
</style>
