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
            <el-button plain type="primary" size="small" @click="updateAttr(row)" icon="Edit"> 编辑 </el-button>
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
          <template #default="{ row, $index }">
            <el-input
              :ref="
                (vc) => {
                  inputArr[$index] = vc
                }
              "
              v-if="row.flag"
              @blur="toLook(row, $index)"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ $index }">
            <el-button type="danger" plain size="small" icon="Delete" @click="removeAddAttr($index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button-group">
        <el-button type="primary" @click="save" :disabled="attrParams.attrValueList.length === 0"> 保存 </el-button>
        <el-button plain @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import useCategoryStore from '@/stores/modules/category.js'
import { nextTick, ref, watch, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { deleteAttrApi, postAddOrUpdateAttrApi } from '@/api/product/attr/index.js'

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
const inputArr = ref([]) // 存储输入框实例的数组

// 路由销毁的时候，将仓库中相关数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
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
const updateAttr = (row) => {
  scene.value = 1
  Object.assign(attrParams.value, JSON.parse(JSON.stringify(row))) // 使用JSON进行深拷贝
}

// 删除表格中的属性
const removeAttr = async (row) => {
  const res = await deleteAttrApi(row.id)
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    emit('get-attr-list')
  } else {
    ElMessage({
      message: '删除失败，请重试',
      type: 'error'
    })
  }
}

// 添加属性
const addAttr = () => {
  // 向数组添加一个属性值对象
  attrParams.value.attrValueList.push({
    valueName: '', // 属性值名称
    flag: true // 控制每一个属性值的编辑模式与查看模式的切换
  })
  // 获取最后的input组件，获取焦点
  nextTick(() => {
    inputArr.value[attrParams.value.attrValueList.length - 1].focus()
  })
}

// 删除属性
const removeAddAttr = ($index) => {
  attrParams.value.attrValueList.splice($index, 1)
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
}

// 取消添加
const cancel = () => {
  scene.value = 0
}

// 属性值表单元素失去焦点事件
const toLook = (row, $index) => {
  // 添加属性不能为空
  if (row.valueName.trim() === '') {
    attrParams.value.attrValueList.splice($index, 1)
    ElMessage({
      message: '请输入属性值名称',
      type: 'warning'
    })
    return
  }

  // 添加属性不能重复
  let repeat = attrParams.value.attrValueList.find((item) => {
    // 把当前失去焦点的属性值对象从当前数组中排除，再进行判断
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 将重复的属性值删除
    attrParams.value.attrValueList.splice($index, 1)
    ElMessage({
      message: '属性值重复，请重新输入',
      type: 'warning'
    })
    return
  }
  row.flag = false
}
const toEdit = (row, $index) => {
  row.flag = true
  // 输入框自动聚焦
  nextTick(() => {
    inputArr.value[$index].focus()
  })
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
