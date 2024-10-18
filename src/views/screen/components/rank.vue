<template>
  <div class="rankLayout">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { rankOption } from '@/views/screen/chartsConfig.js'

const charts = ref(null)

onMounted(() => {
  // 一个容器可以展示多种类型的图表
  const myCharts = echarts.init(charts.value)
  myCharts.setOption(rankOption)
})
</script>

<style scoped lang="scss">
.rankLayout {
  margin-top: 10px;
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    p {
      color: #fff;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 50px);
  }
}
</style>
