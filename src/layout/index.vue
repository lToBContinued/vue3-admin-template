<template>
  <div class="layoutContainer">
    <!--左侧菜单-->
    <div class="layout-slider">
      <Logo></Logo>
      <!--菜单-->
      <el-scrollbar>
        <el-menu background-color="#001529" text-color="#fff">
          <Menu :menuList="userStore.menusRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div class="layout-tabbar"></div>
    <!--内容展示区-->
    <div class="layout-main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/stores/modules/user.js'
import Main from './main/index.vue'
const userStore = useUserStore() // 用户仓库
</script>

<style scoped lang="scss">
.layoutContainer {
  width: 100%;
  height: 100vh;
  background-color: #ccc;

  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;

    .el-scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 40px);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    //background-color: lightblue;
    z-index: 999;
  }

  .layout-main {
    $padding: 20px;
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width - $padding * 2);
    height: calc(100vh - $base-tabbar-height - $padding * 2);
    padding: $padding;
    background-color: lightgoldenrodyellow;
    overflow: auto;
  }
}
</style>
