<!--suppress JSUnresolvedReference -->
<template>
  <div class="screenLayout">
    <!--展示内容区域-->
    <div class="screen" ref="screen">
      <div class="top">
        <top></top>
      </div>
      <div class="bottom">
        <div class="left">
          <tourist class="tourist"></tourist>
          <sex class="sex"></sex>
          <age class="age"></age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <rank class="rank"></rank>
          <year class="year"></year>
          <counter class="counter"></counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Top from './components/top.vue'
import Tourist from './components/tourist.vue'
import Sex from './components/sex.vue'
import Age from './components/age.vue'
import Map from './components/map.vue'
import Line from './components/line.vue'
import Counter from './components/counter.vue'
import Rank from './components/rank.vue'
import Year from './components/year.vue'

const screen = ref(null) // 数据大屏内容的dom

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 获取缩放比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return Math.min(ww, wh)
}
// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<style scoped lang="scss">
.screenLayout {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
}

.screen {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
}

.top {
  width: 100%;
  height: 40px;
}

.bottom {
  display: flex;

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;

    .rank {
      flex: 1.5;
    }

    .year {
      flex: 1;
      margin: 20px 0;
    }

    .counter {
      flex: 1;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 1040px;

    .tourist {
      flex: 1.2;
    }

    .sex {
      flex: 1;
    }

    .age {
      flex: 1;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 0 20px;

    .map {
      flex: 4;
    }

    .line {
      flex: 1;
    }
  }
}
</style>
