<template>
  <div>
    <el-form ref="formRef" :rules="rules" :model="formData">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="formData.tmName" placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" style="margin-left: 10px"> </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  // 表格一行的数据
  rowData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// 验证规则
const rules = ref({
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }]
})
// 表单数据
const formData = ref({
  tmName: props.rowData.tmName,
  logoUrl: ''
})
</script>

<style scoped lang="scss"></style>
