<!--suppress ALL -->
<template>
  <div class="permissionLayout">
    <el-table
      :data="permissionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :default-expand-all="false"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" icon="User" size="small" :disabled="row.level === 4" @click="addPermission(row)">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button type="primary" icon="Edit" size="small" :disabled="row.level === 1" @click="updatePermission(row)">
            编辑
          </el-button>
          <el-popconfirm title="确定要删除吗？" @confirm="deleteMenu(row)">
            <template #reference>
              <el-button type="primary" icon="Delete" size="small" :disabled="row.level === 1"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--对话框：添加/更新已有的数据结构-->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'" width="500">
      <el-form label-position="right" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="menuData.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="menuData.code" placeholder="请输入权限值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { addOrUpdateMenuApi, getPermissionListApi, removeMenuApi } from '@/api/acl/permission/index.js'
import { ElMessage } from 'element-plus'

const permissionArr = ref([]) // 菜单列表
const dialogVisible = ref(false) // 对话框是否隐藏
// 对话框表单数据
const menuData = ref({
  code: '',
  level: 0,
  name: '',
  pid: 0
})

onMounted(() => {
  getHasPermissionList()
})

// 获取菜单数据
const getHasPermissionList = async () => {
  const res = await getPermissionListApi()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}
// 添加菜单
const addPermission = (row) => {
  Object.assign(menuData.value, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0
  })
  dialogVisible.value = true
  menuData.value.level = row.level + 1 // 收集新增子菜单的level值
  menuData.value.pid = row.id // 给谁添加子菜单
}
// 编辑已有菜单
const updatePermission = (row) => {
  dialogVisible.value = true
  Object.assign(menuData.value, row)
}
// 确定按钮事件
const save = async () => {
  const res = await addOrUpdateMenuApi(menuData.value)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({
      message: menuData.id ? '更新成功' : '添加成功',
      type: 'success'
    })
    await getHasPermissionList()
  }
}
// 删除菜单
const deleteMenu = async (row) => {
  const res = await removeMenuApi(row.id)
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    await getHasPermissionList()
  }
}
</script>
