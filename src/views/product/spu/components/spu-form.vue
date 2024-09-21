<template>
  <div class="spuLayout">
    <el-form :model="spuForm" label-width="100px">
      <el-form-item label="SPU名称" prop="name">
        <el-select style="max-width: 300px" placeholder="请选择品牌" v-model="spuForm.name">
          <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spuForm.desc" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="fileList"
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select style="max-width: 300px" placeholder="请选择品牌">
          <el-option v-for="item in saleAttrOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button icon="Plus" type="primary" style="margin-left: 10px" :disabled="true"> 添加销售属性 </el-button>
        <el-table :data="tableData" border style="margin: 14px 0">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名" width="200px"></el-table-column>
          <el-table-column label="属性值"></el-table-column>
          <el-table-column label="操作" width="100px">
            <template #default="{ row }">
              <el-popconfirm :title="`确定要删除吗?`" width="200" icon="Delete">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除SKU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getBaseSaleAttrListApi,
  getSaleAttrListApi,
  getSpuImageListApi,
  getTrademarkListApi
} from '@/api/product/spu/index.js'

const emit = defineEmits(['changeScene'])
const spuForm = ref({
  name: '', // SPU名称
  desc: '' // SPU描述
})
const nameOptions = ref([]) // SPU名称选项
const saleAttrOptions = ref([]) // 销售属性选项
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const allTradeMark = ref([]) // 全部品牌
const imageList = ref([]) // 该品牌的SPU照片墙
const saleAttr = ref([]) // 该品牌已有的销售属性列表
const allSaleAttr = ref([])

// 子组件中获取SPU信息
const initHasSpuData = async (spu) => {
  const trademarkRes = await getTrademarkList() // 获取全部品牌的数据
  // 生成SPU名称下拉框选项
  nameOptions.value = trademarkRes.data.map((item) => ({
    value: item.id,
    label: item.tmName
  }))
  const imageRes = await getImageList(spu.id) // 获取该品牌照片墙列表
  const saleAttrRes = await getSaleAttrList(spu.id) // 获取该品牌所有销售属性
  const allSaleAttrRes = await getAllSaleAttrList() // 获取整个项目全部SPU销售属性

  allTradeMark.value = trademarkRes.data
  imageList.value = imageRes.data
  saleAttr.value = saleAttrRes.data
  allSaleAttr.value = allSaleAttrRes.data
}

// 获取整个项目的销售属性
const getAllSaleAttrList = async () => {
  return await getBaseSaleAttrListApi()
}

// 获取全部品牌的数据
const getTrademarkList = async () => {
  return await getTrademarkListApi()
}

// 获取该品牌的SPU照片墙
const getImageList = async (id) => {
  const params = {
    spuId: id
  }
  return await getSpuImageListApi(params)
}

// 获取该品牌已有的销售属性列表
const getSaleAttrList = async (id) => {
  const params = {
    spuId: id || ''
  }
  return await getSaleAttrListApi(params)
}

// 保存
const save = () => {}

// 取消
const cancel = () => {
  emit('changeScene')
}

// 暴露组件中的方法
defineExpose({
  initHasSpuData
})
</script>
