import request from '@/utils/request.js'
import SPU_URL from './spuUrl.js'

// 获取SPU列表
export const getSpuListApi = (params = {}) => {
  return request({
    url: `${SPU_URL.GET_SPU_URL}/${params.page}/${params.limit}?category3Id=${params.category3Id}`
  })
}

// 获取SPU名称选项列表
export const getTrademarkListApi = () => {
  return request({
    url: SPU_URL.GET_TRADEMARK_URL
  })
}

// 获取整个项目的销售属性
export const getBaseSaleAttrListApi = () => {
  return request({
    url: SPU_URL.GET_BASE_SALE_ATTR_LIST
  })
}

// 获取SPU照片墙
export const getSpuImageListApi = (params = {}) => {
  const { spuId } = params
  return request({
    url: `${SPU_URL.GET_IMAGE_LIST_URL}/${spuId}`
  })
}

// 获取销售属性列表
export const getSaleAttrListApi = (params = {}) => {
  const { spuId } = params
  return request({
    url: `${SPU_URL.GET_SALE_ATTR_LIST_URL}/${spuId}`
  })
}
