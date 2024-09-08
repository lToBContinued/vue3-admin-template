<template>
  <div class="attrLayout">
    <!--分类搜索组件-->
    <category-search :isDisabled="scene"></category-search>
    <!--展示属性卡片和修改/添加属性卡片-->
    <attr-display :attrList="attrList" @get-attr-list="getAttrList" @change-scene="changeScene"></attr-display>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import CategorySearch from '@/components/Search/CategorySearch.vue'
import useCategoryStore from '@/stores/modules/category.js'
import { getAttrInfoListApi } from '@/api/product/attr/index.js'
import AttrDisplay from '@/views/product/attr/components/attr-display.vue'

const categoryStore = useCategoryStore()
const attrList = ref([]) // 属性列表
const scene = ref(0)

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

// 接收当前场景值，控制搜索卡片中下拉框的禁用状态
const changeScene = (mode) => {
  scene.value = mode
}
</script>
