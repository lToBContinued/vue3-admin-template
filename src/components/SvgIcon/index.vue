<template>
  <div>
    <svg :style="{ width: size + 'px', height: size + 'px' }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  // 图标名称
  name: {
    type: String,
    required: true
  },
  // 颜色
  color: {
    type: String,
    default: '#000'
  },
  // 大小
  size: {
    type: Number,
    default: 30
  },
  // 前缀
  // 默认值：#icon-
  prefix: {
    type: String,
    default: '#icon-'
  }
})
</script>

<style scoped></style>
