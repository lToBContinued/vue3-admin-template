<template>
  <div class="sexLayout">
    <div class="title">
      <p>男女比例</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { sexRate } from '@/views/screen/chartsConfig.js'

const charts = ref(null)

onMounted(()=>{
  const myCharts = echarts.init(charts.value)
  myCharts.setOption(sexRate)
})

</script>

<style lang="scss" scoped>
.sexLayout {
  width: 100%;
  height: 100%;
  margin: 20px 0;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: #fff;
      font-size: 20px;
    }
  }

  .sex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .man {
    margin: 20px;
    background: url('../images/man-bg.png') no-repeat;
    background-size: 100% 100%;
  }

  .woman {
    margin: 20px;
    background: url('../images/woman-bg.png') no-repeat;
    background-size: 100% 100%;
  }

  .rate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    color: #fff;
  }

  .charts {
    height: 100px;
    margin: 0 40px;
  }
}
</style>
