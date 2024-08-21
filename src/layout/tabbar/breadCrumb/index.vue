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
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import useLayoutSettingStore from '@/stores/modules/setting.js'

defineExpose({
  name: 'Breadcrumb'
})

const layoutSettingStore = useLayoutSettingStore()
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
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
