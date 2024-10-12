<!--suppress JSUnresolvedReference -->
<template>
  <div class="roleManageLayout">
    <!--搜索卡片-->
    <el-card class="search-form">
      <el-form :inline="true">
        <el-form-item label="职位搜索" prop="userName">
          <el-input ref="searchInputRef" v-model="keyword" placeholder="请输入职位关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword === ''">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--角色信息-->
    <el-card style="margin-top: 10px">
      <el-button type="primary" @click="addRole">添加新职位</el-button>
      <el-table :data="allRole" style="margin: 10px 0" border>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column label="角色名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="User" size="small">分配权限</el-button>
            <el-button type="primary" icon="Edit" size="small">编辑</el-button>
            <el-popconfirm title="确定要删除吗？">
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
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
  </div>
</template>

<script setup>
import { getAllRoleApi } from '@/api/acl/role/index.js'
import { ref, onMounted } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting.js'

const pageNo = ref(1)
const pageSize = ref(5)
const total = ref()
const allRole = ref([]) // 已有角色列表
const keyword = ref('') // 搜索关键字
const settingStore = useLayoutSettingStore() // 获取模板setting仓库

onMounted(() => {
  getHasRole() // 获取已有角色列表
})

// 获取已有角色列表
const getHasRole = async () => {
  const params = {
    page: pageNo.value,
    limit: pageSize.value,
    keyword: keyword.value
  }
  const res = await getAllRoleApi(params)
  if (res.code === 200) {
    allRole.value = res.data.records
    total.value = res.data.total
  }
}
const handleSizeChange = async (e) => {
  pageSize.value = e
  await getHasRole()
}
const handleCurrentChange = async (e) => {
  pageNo.value = e
  await getHasRole()
}
// 搜索
const search = () => {
  getHasRole()
  keyword.value = ''
}
// 重置
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
// 添加新职位
const addRole = () => {}
</script>

<style scoped lang="scss">
.search-form .el-form-item {
  margin-bottom: 0;
}
</style>
