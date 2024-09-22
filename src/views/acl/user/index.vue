<template>
  <div class="userLayout">
    <el-card>
      <el-form ref="form" v-model="formData" :inline="true">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <!--用户信息-->
      <el-table :data="userList" style="margin: 10px 0" border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="id" align="center"></el-table-column>
        <el-table-column label="用户名" align="center"></el-table-column>
        <el-table-column label="昵称" align="center"></el-table-column>
        <el-table-column label="用户角色" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center"></el-table-column>
        <el-table-column label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" width="260" align="center"></el-table-column>
      </el-table>
      <gn-pagination :current-page="pageNo" :page-size="pageSize" :total="0"></gn-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pageNo = 1
const pageSize =5
// 表单数据
const formData = ref({
  userName: ''
})
const form = ref(null) // 表单实例
const userList = ref([]) // 用户数据列表

// 搜索
const search = () => {}
// 重置
const reset = () => {}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
</style>
