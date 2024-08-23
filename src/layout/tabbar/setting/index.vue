<template>
  <div class="settingLayout">
    <div class="tabbar-right">
      <el-button size="small" type="primary" circle icon="Refresh" @click="pageRefresh"></el-button>
      <el-button size="small" type="primary" circle icon="FullScreen" @click="changeFullScreen"></el-button>
      <el-button size="small" type="primary" circle icon="Setting"></el-button>
      <img class="tabbar-avatar" :src="userStore.avatar" alt="" />
      <!--下拉菜单-->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>权限管理</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="dialogVisible = true">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dialog v-model="dialogVisible" title="提示" width="500" :close-on-click-modal="false">
        <span>确定退出登录吗？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmLogout">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineExpose({
  name: 'Setting'
})
import useLayoutSettingStore from '@/stores/modules/setting.js'
import useUserStore from '@/stores/modules/user.js'
import { useRoute, useRouter } from 'vue-router'

const $router = useRouter()
const $route = useRoute()
const layoutSettingStore = useLayoutSettingStore() // layout相关配置仓库
const userStore = useUserStore() // 用户仓库
const dialogVisible = ref(false) // 对话框可见性

// 刷新页面
const pageRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

// 全屏
const changeFullScreen = () => {
  let full = document.fullscreenElement // dom对象的全屏状态（布尔值）
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录
const confirmLogout = async () => {
  await userStore.userLogout()
  dialogVisible.value = false
  // 跳转到登录页
  await $router.push({
    path: '/login',
    query: {
      redirect: $route.path
    }
  })
}
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
