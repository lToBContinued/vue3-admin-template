<template>
  <div class="attrLayout">
    <category-search></category-search>
    <info :attrList="attrList"></info>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Info from '@/views/product/attr/components/info.vue'
import CategorySearch from '@/components/Search/CategorySearch.vue'
import useCategoryStore from '@/stores/modules/category.js'
import { getAttrInfoListApi } from '@/api/product/attr/index.js'

const categoryStore = useCategoryStore()
const attrList = ref([]) // 属性列表

// 监听仓库三级分类id的变化
watch(
  () => categoryStore.category3Id,
  async () => {
    attrList.value = []
    await getAttrList() // 获取搜索属性列表
  }
)

// 获取搜索属性列表
const getAttrList = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore
  const params = { category1Id, category2Id, category3Id }
  if (categoryStore.category3Id) {
    const res = await getAttrInfoListApi(params)
    attrList.value = res.data
  }
}
</script>

<style scoped lang="scss"></style>
