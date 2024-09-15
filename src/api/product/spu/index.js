import request from '@/utils/request.js'
import SPU_URL from './spuUrl.js'

// 获取SPU列表
export const getSpuListApi = (params = {}) => {
  return request({
    url: `${SPU_URL.GET_SPU_URL}/${params.page}/${params.limit}?category3Id=${params.category3Id}`
  })
}
