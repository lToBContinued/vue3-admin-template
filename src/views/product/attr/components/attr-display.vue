<template>
  <div class="attrCardLayout">
    <!--平台属性展示卡片-->
    <el-card v-if="scene === 0">
      <el-button type="primary" icon="Plus" @click="goAddAttr" :disabled="!categoryStore.category3Id">
        添加平台属性
      </el-button>
      <el-table :data="attrList" style="margin-top: 10px" border>
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="属性名称" width="120" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-tag
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
              style="margin: 4px"
              :type="index % 2 === 0 ? 'primary' : 'success'"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="goEdit('edit', row)" icon="Edit"> 编辑 </el-button>
            <el-popconfirm :title="`确定要删除吗?`" @confirm="removeAttr(row)" width="200" icon="Delete">
              <template #reference>
                <el-button plain type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--添加平台属性卡片-->
    <el-card v-else>
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="Plus" :disabled="!attrParams.attrName" @click="addAttr">
        添加属性
      </el-button>
      <el-table :data="attrParams.attrValueList" border style="margin: 10px 0">
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-input placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" plain size="small" icon="Edit" @click="edit(row)">修改 </el-button>
            <el-button type="danger" plain size="small" icon="Delete" @click="removeAddAttr(row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button-group">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import useCategoryStore from '@/stores/modules/category.js'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { postAddOrUpdateAttrApi } from '@/api/product/attr/index.js'

defineProps({
  // 属性列表
  attrList: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const emit = defineEmits(['get-attr-list'])
const scene = ref(0) // 卡片模式（0展示属性卡片，1添加与修改属性卡片）
const categoryStore = useCategoryStore() // 品牌分类仓库
// 收集新增属性的数据
const attrParams = ref({
  attrName: '', // 新增属性名字
  attrValueList: [], // 新增的属性值列表
  categoryId: categoryStore.paramsC3Id, // 三级分类的id
  categoryLevel: 3 // 必须为三级分类（固定值）
})

// 监听场景值，控制搜索卡片中下拉框的禁用状态
watch(scene, () => {
  emit('change-scene', scene.value)
})

// 添加
const goAddAttr = () => {
  scene.value = 1
  // 每一次切换到添加场景的时候，先清空数据
  Object.assign(attrParams.value, {
    attrName: '', // 新增属性名字
    attrValueList: [], // 新增的属性值列表
    categoryId: categoryStore.paramsC3Id, // 三级分类的id
    categoryLevel: 3 // 必须为三级分类（固定值）
  })
  // 收集当前三级分类id
  categoryStore.paramsC3Id = categoryStore.category3Id
}

// 去编辑表格中的属性
const goEdit = (mode, row) => {
  console.log(mode, row) // TODO:删除log
}

// 删除表格中的属性
const removeAttr = (row) => {
  console.log(row) // TODO:删除log
}

// 添加属性
const addAttr = async () => {
  // 向数组添加一个属性值对象
  attrParams.value.attrValueList.push({
    valueName: ''
  })
}

// 修改属性
const edit = (row) => {
  console.log(row) // TODO:删除log
}

// 删除属性
const removeAddAttr = (row) => {
  console.log(row) // TODO:删除log
}

// 保存添加
const save = async () => {
  const res = await postAddOrUpdateAttrApi(attrParams)
  if (res.code === 200) {
    // 添加成功
    ElMessage({
      message: attrParams.value.categoryId ? '修改成功' : '添加成功',
      type: 'success'
    })
    scene.value = 0
    emit('get-attr-list') // 重新获取属性列表
  } else {
    ElMessage({
      message: '保存失败，请重试',
      type: 'error'
    })
  }
  console.log('新增属性结果：', res) // TODO:删除log
}

// 取消添加
const cancel = () => {
  scene.value = 0
}
</script>

<style scoped lang="scss">
.attrCardLayout {
  margin-top: 10px;

  .button-group {
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
