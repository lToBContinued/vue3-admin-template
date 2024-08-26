<template>
  <div class="infoLayout">
    <el-card>
      <el-button
        type="primary"
        icon="Plus"
        @click="addAttr('add')"
        :disabled="!categoryStore.category3Id"
      >
        添加平台属性
      </el-button>
      <el-table :data="categoryStore.attrList" style="margin-top: 10px" border>
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="属性名称" width="120" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="edit('edit', row)" icon="Edit"> 编辑 </el-button>
            <el-popconfirm :title="`确定要删除吗?`" @confirm="remove(row)" width="200" icon="Delete">
              <template #reference>
                <el-button plain type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import useCategoryStore from '@/stores/modules/category.js'

const categoryStore = useCategoryStore() // 品牌分类仓库

// 添加
const addAttr = (mode) => {
  console.log(mode) // TODO:删除log
}

// 编辑
const edit = (mode, row) => {
  console.log(mode, row) // TODO:删除log
}

// 删除
const remove = (row) => {
  console.log(row) // TODO:删除log
}
</script>

<style scoped lang="scss">
.infoLayout {
  margin-top: 10px;
}
</style>
