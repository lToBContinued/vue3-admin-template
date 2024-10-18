<template>
  <div class="lineLayout">
    <div class="title">
      <p>未来七天游客数量趋势</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { touristLine } from '@/views/screen/chartsConfig.js'

const charts = ref(null)

onMounted(()=>{
  const myCharts = echarts.init(charts.value)
  myCharts.setOption(touristLine)
})
</script>

<style scoped lang="scss">
.lineLayout {
  width: 100%;
  height: 100%;
  margin: 0 20px;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 10px;

    p {
      color: #fff;
      font-size: 16px;
      line-height: 1;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
