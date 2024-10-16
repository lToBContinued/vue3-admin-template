<template>
  <div class="ageLayout">
    <div class="title">
      <p>年龄比例</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { ageRate } from '@/views/screen/chartsConfig.js'

const charts = ref(null)

onMounted(()=>{
  const myCharts = echarts.init(charts.value)
  myCharts.setOption(ageRate)
})
</script>

<style scoped lang="scss">
.ageLayout {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: #fff;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
  }
}
</style>
