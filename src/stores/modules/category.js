// 商品分类全局组件仓库
import { defineStore } from 'pinia'
import {
  getAttrInfoListApi,
  getCategory1ListApi,
  getCategory2ListApi,
  getCategory3ListApi
} from '@/api/product/attr/index.js'

const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      category1List: [], // 一级分类列表
      category1Id: '', // 一级分类id
      category2List: [], // 二级分类列表
      category2Id: '', // 二级分类id
      category3List: [], // 三级分类列表
      category3Id: '', // 三级分类id
      attrList: [] // 属性列表
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
      console.log('一级分类id:', this.category1Id) // TODO:删除log
      const res = await getCategory2ListApi(this.category1Id)
      if (res.code === 200) {
        this.category2List = res.data
      }
    },
    // 获取三级分类列表
    async getCategory3List() {
      console.log('二级分类id:', this.category2Id) // TODO:删除log
      const res = await getCategory3ListApi(this.category2Id)
      if (res.code === 200) {
        this.category3List = res.data
      }
    },
    // 获取搜索属性列表
    async getAttrList() {
      console.log('获取属性列表') // TODO:删除log
      const params = {
        category1Id: this.category1Id,
        category2Id: this.category2Id,
        category3Id: this.category3Id
      }
      const res = await getAttrInfoListApi(params)
      this.attrList = res.data
      console.log('11', this.attrList) // TODO:删除log
    }
  },
  computed: {}
})

export default useCategoryStore
