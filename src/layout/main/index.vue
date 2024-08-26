<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--渲染layout一级组件的子路由-->
      <component v-if="flag" :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

defineExpose({
  name: 'main'
})

import useLayoutSettingStore from '@/stores/modules/setting.js'

const layoutSettingStore = useLayoutSettingStore() // layout配置仓库
let flag = ref(true) // 控制当前组件是否销毁重建

// 监听仓库中的refresh值，如果发生棉花，则刷新页面
watch(
  () => layoutSettingStore.refresh,
  () => {
    // 点击刷新按钮，路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  }
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
