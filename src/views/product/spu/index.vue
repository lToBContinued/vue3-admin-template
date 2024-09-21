<template>
  <div class="spuLayout">
    <!--分类选项-->
    <category-search :isDisabled="scene"></category-search>
    <el-card>
      <!--展示spu-->
      <div v-show="scene === 0" class="spuInfo">
        <!--添加spu-->
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.category3Id" @click="addSPU">
          添加SPU
        </el-button>

        <!--spu信息展示表格-->
        <el-table :data="SPUList" style="margin: 10px 0" border>
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" fixed="right" width="300">
            <template #default="{row, $index}">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button type="warning" size="small" icon="Edit" title="修改SKU" @click="updateSPU(row)"></el-button>
              <el-button type="info" size="small" icon="View" title="查看SKU"></el-button>
              <el-popconfirm :title="`确定要删除吗?`" width="200" icon="Delete">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除SKU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <gn-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @size-change="handelSizeChange"
          @current-change="getSPUList"
        ></gn-pagination>
      </div>

      <!--修改spu表单-->
      <spu-form ref="spu" v-show="scene === 1" @change-scene="scene = 0"></spu-form>

      <!--修改sku表单-->
      <sku-form v-show="scene === 2"></sku-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import CategorySearch from '@/components/Search/CategorySearch.vue'
import SpuForm from '@/views/product/spu/components/spu-form.vue'
import useCategoryStore from '@/stores/modules/category.js'
import SkuForm from '@/views/product/spu/components/sku-form.vue'
import { getSpuListApi } from '@/api/product/spu/index.js'

const categoryStore = useCategoryStore()
const scene = ref(0) // 场景切换（0-显示已有spu 1-添加或修改已有SPU 2-添加sku的结构）
const SPUList = ref([]) // spu列表
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页显示条数
const total = ref() // 数据总数
const spu = ref(null)

onBeforeUnmount(() => {
  categoryStore.$reset()
})

watch(
  () => categoryStore.category3Id,
  () => {
    if (!categoryStore.category3Id) {
      return
    }
    getSPUList()
  }
)

// 添加SPU
const addSPU = () => {
  scene.value = 1
}

// 修改SPU
const updateSPU = (row) => {
  scene.value = 1
  // 调用子组件实例中的方法，获取已有的SPU的数据
  spu.value.initHasSpuData(row)
}

// 获取三级分类下全部的spu
const getSPUList = async (pageNum = 1) => {
  const params = {
    page: pageNum,
    limit: pageSize.value,
    category3Id: categoryStore.category3Id
  }
  currentPage.value = pageNum
  const res = await getSpuListApi(params)
  if (res.code === 200) {
    SPUList.value = res.data.records
    total.value = res.data.total
  }
}

// 分页条数改变
const handelSizeChange = (e) => {
  pageSize.value = e
  getSPUList()
}
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 10px;
}
</style>
