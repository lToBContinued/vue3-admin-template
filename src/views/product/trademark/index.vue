<template>
  <div>
    <el-card>
      <!--添加品牌按钮-->
      <el-button type="primary" @click="addBrand">
        <el-icon style="margin-right: 4px">
          <Plus />
        </el-icon>
        添加品牌
      </el-button>

      <!--表格展示-->
      <el-table style="margin: 10px 0" :data="trademarkList" highlight-current-row>
        <el-table-column width="100" type="index" label="序号"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="" style="width: 100px; height: auto" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="edit(row)">编辑</el-button>
            <el-popconfirm title="确定要删除吗" @confirm="remove(row)">
              <template #reference>
                <el-button plain type="danger" size="small">删除</el-button>
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
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!--添加品牌-->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600">
      <trademark-form :rowData="rowData"></trademark-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { deleteRemoveTrademarkApi, getTradmarkListApi, getTradmarkListByPageAndLimitApi } from '@/api/product/index.js'
import { ElMessage } from 'element-plus'
import TrademarkForm from './components/trademarkForm/index.vue'

const trademarkList = ref([]) // 品牌列表
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页记录数
const total = ref(0) // 品牌总数
const dialogVisible = ref(false) // 对话框可见性
const dialogTitle = ref('') // 对话框标题
const rowData = ref({}) // 当前行数据

// 添加品牌
const addBrand = () => {
  console.log('添加品牌')
}

// 获取所有品牌列表
const getTrademarkList = async () => {
  const res = await getTradmarkListApi()
  total.value = res.data.length
}
getTrademarkList()

// 根据页码和每页记录数获取品牌列表
const getTrademarkListByPageAndLimit = async () => {
  const res = await getTradmarkListByPageAndLimitApi({
    page: currentPage.value,
    limit: pageSize.value
  })
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

// 编辑品牌
const edit = (data) => {
  dialogTitle.value = '编辑'
  rowData.value = data
  dialogVisible.value = true
}

// 删除品牌
const remove = async (value) => {
  const data = {
    id: value.id
  }
  const res = await deleteRemoveTrademarkApi(data)
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    await getTrademarkList()
    await getTrademarkListByPageAndLimit()
  } else {
    ElMessage({
      message: res.data,
      type: 'error'
    })
  }
}
</script>

<style scoped lang="scss"></style>
