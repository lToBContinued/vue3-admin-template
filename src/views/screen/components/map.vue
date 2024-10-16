<template>
  <div class="mapLayout">
    <div class="map" ref="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { mapOption } from '@/views/screen/chartsConfig.js'
import chinaJson from '../china.json'

const map = ref(null)
echarts.registerMap('china', chinaJson)

onMounted(() => {
  const myCharts = echarts.init(map.value)
  myCharts.setOption(mapOption)
})
</script>

<style scoped lang="scss">
.mapLayout {
  width: 100%;
  height: 100%;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
