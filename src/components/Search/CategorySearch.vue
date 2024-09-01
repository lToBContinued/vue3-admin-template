<template>
  <div class="searchLayout">
    <el-card>
      <el-form inline>
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.category1Id"
            placeholder="请选择"
            style="width: 240px"
            clearable
            @change="selectChange(1)"
          >
            <el-option v-for="item in categoryStore.category1List" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.category2Id"
            placeholder="请选择"
            style="width: 240px"
            clearable
            @change="selectChange(2)"
          >
            <el-option v-for="item in categoryStore.category2List" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.category3Id" placeholder="请选择" style="width: 240px" clearable>
            <el-option v-for="item in categoryStore.category3List" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import useCategoryStore from '@/stores/modules/category.js'

const categoryStore = useCategoryStore() // 品牌分类仓库
// 获取一级分类列表
const reqCategory1List = async () => {
  await categoryStore.getCategory1List()
}
reqCategory1List()

// 下拉框值改变
const selectChange = async (mode) => {
  if (mode === 1) {
    categoryStore.category2List = []
    categoryStore.category2Id = ''
    categoryStore.category3List = []
    categoryStore.category3Id = ''
    await categoryStore.getCategory2List()
  }
  if (mode === 2) {
    categoryStore.category3Id = ''
    await categoryStore.getCategory3List()
  }
}
</script>

<style scoped lang="scss"></style>
