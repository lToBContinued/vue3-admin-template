<template>
  <div class="counterLayout">
    <div class="title">
      <p>数据统计</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { counterOptions } from '@/views/screen/chartsConfig.js'

const charts = ref(null)

onMounted(() => {
  const myCharts = echarts.init(charts.value)
  myCharts.setOption(counterOptions)
})
</script>

<style scoped lang="scss">
.counterLayout {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    p {
      color: #fff;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
