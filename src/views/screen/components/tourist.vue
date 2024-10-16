<template>
  <div class="touristLayout">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约的总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!--echarts展示图表区域-->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill' // 水球图拓展插件
import { touristLiquidFill } from '../chartsConfig.js'

const people = ref('216908人')
const charts = ref(null) // 获取图表dom节点

onMounted(() => {
  const myCharts = echarts.init(charts.value) // 获取charts类实例
  // 设置实例配置项
  myCharts.setOption(touristLiquidFill)
})
</script>

<style lang="scss" scoped>
.touristLayout {
  margin-top: 10px;
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;

  .top {
    margin-left: 20px;

    .title {
      color: #fff;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
    }

    .right {
      margin-right: 10px;
      float: right;
      color: #fff;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    display: flex;
    margin-top: 30px;
    padding: 10px;

    span {
      flex: 1;
      height: 50px;
      background: url('../images/total.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 50px;
      color: #19fffc;
    }
  }

  .charts {
    width: 100%;
    height: 240px;
    color: #fff;
  }
}
</style>
