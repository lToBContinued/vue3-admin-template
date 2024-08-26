<template>
  <div>
    <el-card>
      <!--添加品牌按钮-->
      <el-button type="primary" @click="addBrand('add')" icon="Plus">添加品牌</el-button>

      <!--表格展示-->
      <el-table style="margin: 10px 0" :data="trademarkList" highlight-current-row border>
        <el-table-column width="80" type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="品牌名称">
          <template #default="{ row }">
            <span>{{ row.tmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="" style="width: 100px; height: auto" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="edit('edit', row)" icon="Edit"> 编辑 </el-button>
            <el-popconfirm :title="`确定要删除${row.tmName}吗?`" @confirm="remove(row)" width="200" icon="Delete">
              <template #reference>
                <el-button plain type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        background
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <gn-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @
      ></gn-pagination>
    </el-card>

    <!--添加/修改品牌对话框-->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%" :close-on-click-modal="false">
      <el-form ref="ruleFormRef" :rules="rules" :model="trademarkParams" style="width: 80%">
        <el-form-item label="品牌名称" prop="tmName" label-width="100">
          <el-input v-model="trademarkParams.tmName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl" label-width="100">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeImgUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  deleteRemoveTrademarkApi,
  getTradmarkListApi,
  getTrademarkListByPageAndLimitApi,
  postAddOrUpdateTrademarkApi
} from '@/api/product/trademark/index.js'
import { ElMessage } from 'element-plus'

const trademarkList = ref([]) // 品牌列表
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页记录数
const total = ref(0) // 数据总数
const dialogVisible = ref(false) // 对话框可见性
const dialogTitle = ref('') // 对话框标题
const dialogMode = ref('') // 对话框模式(新增/修改)
const ruleFormRef = ref(null) // 表单dom
// 收集品牌数据
const trademarkParams = ref({
  tmName: '',
  logoUrl: '',
  id: ''
})

// 自定义校验规则品牌名
const validatorTmName = (rule, value, callback) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称至少为2个字符'))
  }
}
// 自定义校验规则品牌logo
const validatorLogoUrl = (rule, value, callback) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌logo'))
  }
}

// 验证规则
const rules = ref({
  tmName: [{ required: true, validator: validatorTmName, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validatorLogoUrl, trigger: 'blur' }]
})

// 获取所有品牌列表
const getTrademarkList = async () => {
  const res = await getTradmarkListApi()
  total.value = res.data.length
}
getTrademarkList()

// 根据页码和每页记录数获取品牌列表
const getTrademarkListByPageAndLimit = async () => {
  const params = {
    page: currentPage.value,
    limit: pageSize.value
  }
  const res = await getTrademarkListByPageAndLimitApi(params)
  trademarkList.value = res.data.records
}
getTrademarkListByPageAndLimit() // 进入页面初次获取列表
// 页面条数改变后获取列表
const handleSizeChange = async (e) => {
  pageSize.value = e
  await getTrademarkListByPageAndLimit()
}
// 页码改变后获取列表
const handleCurrentChange = async (e) => {
  currentPage.value = e
  await getTrademarkListByPageAndLimit()
}

// 上传图片之前触发的钩子函数
const beforeImgUpload = (rawFile) => {
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      ElMessage({
        message: '正在上传图片……',
        type: 'info'
      })
      return true
    } else {
      ElMessage({
        message: '上传文件大小不能超过4M',
        type: 'error'
      })
      return false
    }
  } else {
    ElMessage({
      message: '上传文件格式必须是jpeg或png或gif格式',
      type: 'error'
    })
    return false
  }
}
// 图片上传成功的钩子
const handleAvatarSuccess = (response) => {
  if (response.code === 200) {
    ElMessage({
      message: '上传图片成功',
      type: 'success'
    })
    trademarkParams.value.logoUrl = response.data
    ruleFormRef.value.clearValidate('logoUrl') // 清除校验结果
  } else {
    ElMessage({
      message: '上传图片失败',
      type: 'error'
    })
  }
}

// 添加品牌
const addBrand = (mode) => {
  trademarkParams.value['tmName'] = ''
  trademarkParams.value['logoUrl'] = ''
  dialogMode.value = mode
  dialogTitle.value = '添加品牌'
  dialogVisible.value = true
  ruleFormRef.value?.clearValidate(['tmName', 'logoUrl']) // 清除校验结果
}

// 编辑品牌
const edit = (mode, row) => {
  trademarkParams.value['tmName'] = ''
  trademarkParams.value['logoUrl'] = ''
  dialogMode.value = mode
  dialogTitle.value = '修改品牌'
  Object.assign(trademarkParams.value, row)
  dialogVisible.value = true
  ruleFormRef.value?.clearValidate(['tmName', 'logoUrl']) // 清除校验结果
}

// 对话框确定按钮点击
const confirm = async (formEl) => {
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await postAddOrUpdateTrademarkApi(dialogMode.value, trademarkParams.value)
      if (res.code === 200) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
        await getTrademarkList()
        await getTrademarkListByPageAndLimit()
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 删除品牌
const remove = async (row) => {
  const data = {
    id: row.id
  }
  const res = await deleteRemoveTrademarkApi(data)
  if (res.code === 200) {
    ElMessage({
      message: res.message,
      type: 'success'
    })
    await getTrademarkList()
    await getTrademarkListByPageAndLimit()
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
