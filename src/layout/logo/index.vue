<template>
  <div
    class="logo"
    :class="{ fold: layoutSettingStore.fold }"
    :style="{ height: !setting.logoHidden ? '50px' : 'fit-content' }"
  >
    <img v-if="!setting.logoHidden" :src="setting.logo" alt="" :class="{ fold: layoutSettingStore.fold }" />
    <h1>{{ setting.title }}</h1>
  </div>
</template>

<script setup>
import setting from '@/setting.js'
import useLayoutSettingStore from '@/stores/modules/setting.js'

const layoutSettingStore = useLayoutSettingStore()

defineExpose({
  name: 'Logo'
})
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin: 20px 0;
  overflow: hidden;

  &.fold {
    justify-content: flex-start;
  }

  img {
    height: $base-menu-logo-height;
    margin-right: 10px;
    border-radius: 999px;
  }

  h1 {
    color: white;
    font-size: $base-logo-title-fontsize;
  }
}
</style>
