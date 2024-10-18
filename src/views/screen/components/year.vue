<template>
  <div class="yearLayout">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { yearOptions } from '@/views/screen/chartsConfig.js'

const charts = ref(null)

onMounted(() => {
  const myCharts = echarts.init(charts.value)
  myCharts.setOption(yearOptions)
})
</script>

<style scoped lang="scss">
.yearLayout {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    p {
      color: #fff;
      font-size: 16px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
