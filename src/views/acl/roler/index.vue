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
            <el-button type="primary" icon="Edit" size="small" @click="updateRole(row)">编辑 </el-button>
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

    <!--添加职位与更新已有职位-->
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新职位' : '添加职位'" width="500">
      <el-form :model="roleParams" :rules="rules" ref="ruleFormRef">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="roleParams.roleName" placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save(ruleFormRef)">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { addOrUpdateRoleApi, getAllRoleApi } from '@/api/acl/role/index.js'
import { ref, onMounted, nextTick } from 'vue'
import useLayoutSettingStore from '@/stores/modules/setting.js'
import { ElMessage } from 'element-plus'

const pageNo = ref(1)
const pageSize = ref(5)
const total = ref()
const allRole = ref([]) // 已有角色列表
const keyword = ref('') // 搜索关键字
const settingStore = useLayoutSettingStore() // 获取模板setting仓库
const dialogVisible = ref(false)
const ruleFormRef = ref(null)
// 收集新增岗位的数据
const roleParams = ref({
  roleName: ''
})
// 添加职位表单校验规则
const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (value.trim().length >= 2) {
          callback()
        } else {
          callback(new Error('职位名称至少两位'))
        }
      }
    }
  ]
}

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
const addRole = () => {
  dialogVisible.value = true
  nextTick(() => {
    Object.assign(roleParams.value, { roleName: '', id: 0 })
    ruleFormRef.value.clearValidate('roleName')
  })
}
// 更新已有职位
const updateRole = (row) => {
  dialogVisible.value = true
  Object.assign(roleParams.value, row) // 获取当前行数据
  nextTick(() => {
    ruleFormRef.value.clearValidate('roleName')
  })
}
// 确定按钮的事件
const save = (formRef) => {
  formRef.validate(async (valid, fields) => {
    if (valid) {
      if (!roleParams.value.id) {
        pageNo.value = 1
      }
      const res = await addOrUpdateRoleApi(roleParams.value)
      if (res.code === 200) {
        ElMessage({
          message: roleParams.value.id ? '更新成功' : '添加成功',
          type: 'success'
        })
        dialogVisible.value = false
        await getHasRole()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.search-form .el-form-item {
  margin-bottom: 0;
}
</style>
