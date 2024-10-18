<template>
  <div class="tabbarLayout">
    <!--左侧布局-->
    <bread-crumb></bread-crumb>
    <!--右侧布局-->
    <setting></setting>
  </div>
</template>

<script setup>
import BreadCrumb from './breadCrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbarLayout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}
</style>
