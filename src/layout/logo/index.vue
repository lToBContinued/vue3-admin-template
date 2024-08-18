<template>
  <div class="logo">
    <img v-if="setting.logoHidden" :src="setting.logo" alt="" />
    <h1>{{ setting.title }}</h1>
  </div>
</template>

<script setup>
import setting from '@/setting.js'
</script>

<style scoped lang="scss">
.logo {
  @include flex-center;
  width: 100%;
  padding: 20px 0;

  img {
    height: $base-menu-logo-height;
    margin-right: 10px;
    border-radius: 25px;
  }

  h1 {
    color: white;
    font-size: $base-logo-title-fontsize;
  }
}
</style>
