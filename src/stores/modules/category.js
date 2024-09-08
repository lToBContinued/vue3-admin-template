// 商品分类全局组件仓库
import { defineStore } from 'pinia'
import { getCategory1ListApi, getCategory2ListApi, getCategory3ListApi } from '@/api/product/attr/index.js'

const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      category1List: [], // 一级分类列表
      category1Id: '', // 一级分类id
      category2List: [], // 二级分类列表
      category2Id: '', // 二级分类id
      category3List: [], // 三级分类列表
      category3Id: '', // 三级分类id
      paramsC3Id: '' // 收集参数：添加属性时，三级分类的id
    }
  },
  actions: {
    // 获取一级分类列表
    async getCategory1List() {
      const res = await getCategory1ListApi()
      if (res.code === 200) {
        this.category1List = res.data
      }
    },
    // 获取二级分类列表
    async getCategory2List() {
      const res = await getCategory2ListApi(this.category1Id)
      if (res.code === 200) {
        this.category2List = res.data
      }
    },
    // 获取三级分类列表
    async getCategory3List() {
      const res = await getCategory3ListApi(this.category2Id)
      if (res.code === 200) {
        this.category3List = res.data
      }
    }
  },
  computed: {}
})

export default useCategoryStore
