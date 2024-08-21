<template>
  <div class="breadcrumbLayout">
    <!--左侧布局-->
    <div class="tabbar-left">
      <!--菜单栏收起/展开-->
      <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
      </el-icon>

      <!--面包屑导航-->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.path"
          v-show="item.meta.title"
          style="margin: 0 2px"
          :to="item.path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import useLayoutSettingStore from '@/stores/modules/setting.js'
import { useRoute } from 'vue-router'

defineExpose({
  name: 'Breadcrumb'
})
const $route = useRoute()
const layoutSettingStore = useLayoutSettingStore()

// 点击菜单栏收起/展开
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}

const handelBtn = () => {
  console.log($route.matched)
}
</script>

<style scoped lang="scss">
.breadcrumbLayout {
  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
}
</style>
