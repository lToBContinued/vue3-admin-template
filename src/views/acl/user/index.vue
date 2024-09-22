<template>
  <div class="userLayout">
    <el-card class="search-form">
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

    <!--用户信息-->
    <el-card style="margin-top: 10px">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <!--用户信息-->
      <el-table :data="userList" style="margin: 10px 0" border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名" align="center" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="昵称" align="center" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row, $index }">
            <el-button type="primary" icon="User" size="small">分配角色</el-button>
            <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑 </el-button>
            <el-button type="primary" icon="Delete" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <gn-pagination
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></gn-pagination>
    </el-card>

    <!--添加新用户/更新已有的账号信息-->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>添加用户</h4>
      </template>

      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserInfoApi } from '@/api/acl/user/index.js'

const pageNo = ref(1)
const pageSize = ref(5)
const total = ref(0)
// 表单数据
const formData = ref({
  userName: ''
})
const form = ref(null) // 表单实例
const userList = ref([]) // 用户数据列表
const drawer = ref(false) // 抽屉的显示/隐藏

// 获取全部已有用户列表
const getHasUserList = async () => {
  const params = {
    page: pageNo.value,
    limit: pageSize.value
  }
  const res = await getUserInfoApi(params)
  if (res.code === 200) {
    total.value = res.data.total
    userList.value = res.data.records
  }
}
getHasUserList()
const handleSizeChange = async (e) => {
  pageSize.value = e
  await getHasUserList()
}
const handleCurrentChange = async (e) => {
  pageNo.value = e
  await getHasUserList()
}

// 添加用户
const addUser = () => {
  drawer.value = true
}

// 更新已有用户
const updateUser = (row) => {
  drawer.value = true
  console.log(row) // TODO:删除log
}

// 搜索
const search = () => {}
// 重置
const reset = () => {}
</script>

<style scoped lang="scss">
.search-form .el-form-item {
  margin-bottom: 0;
}
</style>
