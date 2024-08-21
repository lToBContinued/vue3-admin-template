<template>
  <div class="logo">
    <img v-if="setting.logoHidden" :src="setting.logo" alt="" :class="{ fold: layoutSettingStore.fold }" />
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
  width: 100%;
  height: 50px;
  padding: 20px 0;
  overflow: hidden;

  img {
    height: $base-menu-logo-height;
    margin: 0 10px 0 10px;
    border-radius: 25px;
    transition: all 0.3s;

    &.fold {
      margin-left: 0;
    }
  }

  h1 {
    color: white;
    font-size: $base-logo-title-fontsize;
  }
}
</style>
