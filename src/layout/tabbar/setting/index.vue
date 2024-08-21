<template>
  <div class="settingLayout">
    <div class="tabbar-right">
      <el-button size="small" type="primary" circle icon="Refresh"></el-button>
      <el-button size="small" type="primary" circle icon="FullScreen"></el-button>
      <el-button size="small" type="primary" circle icon="Setting"></el-button>
      <img class="tabbar-avatar" src="../../../../public/logo.jpg" alt="" />
      <!--下拉菜单-->
      <el-dropdown>
        <span class="el-dropdown-link">
          用户名
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>权限管理</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
defineExpose({
  name: 'Setting'
})
</script>

<style scoped lang="scss">
.settingLayout {
  .tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .tabbar-avatar {
      width: 24px;
      height: 24px;
      margin: 0 5px 0 10px;
      border-radius: 100px;
    }
  }
}
</style>
