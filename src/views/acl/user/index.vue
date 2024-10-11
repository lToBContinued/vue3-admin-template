<!--suppress JSUnresolvedReference -->
<template>
  <div class="userLayout">
    <el-card class="search-form">
      <el-form :inline="true">
        <el-form-item label="用户名" prop="userName">
          <el-input ref="searchInputRef" v-model="keyword" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword === ''">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--用户信息-->
    <el-card style="margin-top: 10px">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="danger" :disabled="selectIdArr.length === 0" @click="deleteSelectUser"> 批量删除 </el-button>
      <!--用户信息-->
      <el-table :data="userList" style="margin: 10px 0" border @selection-change="selectChange">
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
            <el-button type="primary" icon="User" size="small" @click="setRole(row)">分配角色 </el-button>
            <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑 </el-button>
            <el-popconfirm title="确定要删除吗？" @confirm="deleteUser(row.id)">
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

    <!--抽屉：添加新用户/更新已有的账号信息-->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ drawerForm.id ? '更新用户' : '添加用户' }}</h4>
      </template>

      <template #default>
        <el-form ref="drawerFormRef" :model="drawerForm" :rules="drawerFormRules">
          <el-form-item label="用户姓名" prop="username">
            <el-input placeholder="请输入用户姓名" v-model="drawerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input placeholder="请输入用户昵称" v-model="drawerForm.name"></el-input>
          </el-form-item>
          <el-form-item v-if="!drawerForm.id" label="用户密码" prop="password">
            <el-input placeholder="请输入密码" v-model="drawerForm.password"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!--抽屉：用于给某一个已有的账号进行角色分配-->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>

      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="drawerForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <div style="display: flex; flex-direction: column">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handelCheckAllChange"
                >全选
              </el-checkbox>
              <el-checkbox-group v-model="userRole" @change="handelCheckedRoleChange">
                <el-checkbox v-for="role in allRole" :key="role.id" :label="role">
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirmSetRole">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import {
  addOrUpdateUserApi,
  deleteAllUserApi,
  deleteUserApi,
  getAllRoleApi,
  getUserInfoApi,
  postSetUserRoleApi
} from '@/api/acl/user/index.js'
import { ElMessage } from 'element-plus'
import { formRules } from './formRules.js'
import useLayoutSettingStore from '@/stores/modules/setting.js'

const pageNo = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchInputRef = ref(null) // 人名搜索实例
const userList = ref([]) // 用户数据列表
const drawer = ref(false) // 添加/更新用户的抽屉的显示/隐藏
const drawer1 = ref(false) // 分配角色的抽屉的显示/隐藏
const drawerFormRef = ref(null) // 抽屉表单dom
const drawerFormRules = formRules // 表单校验规则
const allRole = ref([]) // 全部职位
const userRole = ref([]) // 当前用户职位
const checkAll = ref(false) // 复选框全选
const isIndeterminate = ref(true) //控制全选/复选框的不确定样式
const selectIdArr = ref([]) // 批量删除选中的id数组
const keyword = ref('') // 手机搜索栏关键字
const settingStore = useLayoutSettingStore() // 获取模板setting仓库
// 用户筛选表单数据
// 抽屉收集用户信息
const drawerForm = ref({
  username: '', // 用户名
  name: '', // 昵称
  password: '' // 密码
})

// 获取全部已有用户列表
const getHasUserList = async () => {
  const params = {
    page: pageNo.value,
    limit: pageSize.value,
    keyword: keyword.value
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
  Object.assign(drawerForm.value, { id: '', username: '', name: '', password: '' })
  nextTick(() => {
    drawerFormRef.value.clearValidate('username')
    drawerFormRef.value.clearValidate('name')
    drawerFormRef.value.clearValidate('password')
  })
}

// 更新已有用户
const updateUser = (row) => {
  drawer.value = true
  Object.assign(drawerForm.value, row) // 存储收集已有的账号信息
  nextTick(() => {
    drawerFormRef.value.clearValidate('username')
    drawerFormRef.value.clearValidate('name')
  })
}

// 搜索
const search = async () => {
  await getHasUserList() // 根据关键字获取用户的数据
  keyword.value = ''
}

// 重置
const reset = async () => {
  settingStore.refresh = !settingStore.refresh
}

// 添加/更新用户信息
const save = async () => {
  try {
    await drawerFormRef.value.validate()
    const res = await addOrUpdateUserApi(drawerForm.value)
    if (res.code === 200) {
      drawer.value = false
      ElMessage({
        message: drawerForm.value.id ? '更新成功' : '添加成功',
        type: 'success'
      })
      await getHasUserList()
      // 更新或添加成功后浏览器自动刷新一次
      window.location.reload()
    } else {
      ElMessage({
        message: drawerForm.value.id ? '更新失败' : '添加失败',
        type: 'error'
      })
    }
  } catch (err) {
    console.log(err)
  }
}

// 分配角色
const setRole = async (row) => {
  Object.assign(drawerForm.value, row)
  const params = { userId: drawerForm.value.id }
  const res = await getAllRoleApi(params) // 获取所有角色列表和当前员工的职位
  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
    drawer1.value = true
  }
}

// 全选复选框的change事件
const handelCheckAllChange = (val) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

// 复选框组的change事件
const handelCheckedRoleChange = (val) => {
  const checkedCount = val.length // 已经勾选的这些项目的长度
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length // 不确定样式
}

// 提交分配职位
const confirmSetRole = async () => {
  const data = {
    userId: drawerForm.value.id,
    roleIdList: userRole.value.map((item) => item.id)
  }
  const res = await postSetUserRoleApi(data)
  if (res.code === 200) {
    ElMessage({
      message: '分配职位成功',
      type: 'success'
    })
    drawer1.value = false
    await getHasUserList()
  }
}

// 删除某一个用户
const deleteUser = async (id) => {
  const params = { id }
  const res = await deleteUserApi(params)
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    await getHasUserList()
  } else {
    ElMessage({
      message: '删除失败，请重试',
      type: 'error'
    })
  }
}

// table复选框勾选的时候触发的事件
const selectChange = (val) => {
  selectIdArr.value = val
}

// 批量删除用户
const deleteSelectUser = async () => {
  const data = {
    idList: selectIdArr.value.map((item) => item.id)
  }
  const res = await deleteAllUserApi(data)
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    await getHasUserList()
  } else {
    ElMessage({
      message: '删除失败，请重试',
      type: 'error'
    })
  }
}

// 取消
const cancel = () => {
  drawer.value = false
  drawer1.value = false
}
</script>

<style scoped lang="scss">
.search-form .el-form-item {
  margin-bottom: 0;
}
</style>
