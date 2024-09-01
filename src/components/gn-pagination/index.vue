<template>
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="[5, 10, 20, 50]"
    background
    layout="prev, pager, next, jumper, ->, total, sizes"
    :total="total"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 5
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['size-change', 'current-change'])

const sizeChange = (e) => {
  emit('size-change', e)
}
const currentChange = (e) => {
  emit('current-change', e)
}
</script>

<style scoped lang="scss"></style>
