import request from '@/utils/request.js'

// 获取品牌列表
export const getTradmarkListApi = () => {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList'
  })
}

// 根据页码和每页记录数获取品牌列表
export const getTradmarkListByPageAndLimitApi = (params = {}) => {
  const { page, limit } = params
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

// 删除品牌
export const deleteRemoveTrademarkApi = (data = {}) => {
  const { id } = data
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
