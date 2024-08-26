import request from '@/utils/request.js'
import ATTR_URL from '@/api/product/attr/attrUrl.js'

// 获取一级分类选项
export const getCategory1ListApi = () => {
  return request({
    url: ATTR_URL.C1_URL
  })
}

// 获取二级分类选项
export const getCategory2ListApi = (category1Id) => {
  return request({
    url: `${ATTR_URL.C2_URL}/${category1Id}`
  })
}

// 获取三级分类选项
export const getCategory3ListApi = (category2Id) => {
  return request({
    url: `${ATTR_URL.C3_URL}/${category2Id}`
  })
}

// 获取搜索属性列表
export const getAttrInfoListApi = (id = {}) => {
  const { category1Id, category2Id, category3Id } = id
  return request({
    url: `${ATTR_URL.ATTR_INFO_URL}/${category1Id}/${category2Id}/${category3Id}`
  })
}
