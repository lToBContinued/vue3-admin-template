<template>
  <div class="layoutContainer">
    <!--左侧菜单-->
    <div class="layout-slider" :class="{ fold: layoutSettingStore.fold }">
      <Logo></Logo>
      <!--菜单-->
      <el-scrollbar>
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :collapse="layoutSettingStore.fold"
          active-text-color="#409EFF"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menusRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!--顶部导航-->
    <div class="layout-tabbar" :class="{ fold: layoutSettingStore.fold }">
      <tabbar></tabbar>
    </div>

    <!--内容展示区-->
    <div class="layout-main" :class="{ fold: layoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/stores/modules/user.js'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useLayoutSettingStore from '@/stores/modules/setting.js'

defineExpose({
  name: 'Layout'
})

const $route = useRoute()
const userStore = useUserStore() // 用户仓库
const layoutSettingStore = useLayoutSettingStore() // layout配置仓库
</script>

<style scoped lang="scss">
.layoutContainer {
  width: 100%;
  height: 100vh;

  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    overflow: hidden;

    .el-scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 40px);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    z-index: 999;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout-main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    background-color: #efefef;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
