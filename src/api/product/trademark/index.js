import request from '@/utils/request.js'
import TRADEMARK_URL from './trademarkUrl.js'
// 获取品牌列表
export const getTradmarkListApi = () => {
  return request({
    url: `${TRADEMARK_URL.BASE_TRADEMARK_URL}/getTrademarkList`
  })
}

// 根据页码和每页记录数获取品牌列表
export const getTrademarkListByPageAndLimitApi = (params = {}) => {
  const { page, limit } = params
  return request({
    url: `${TRADEMARK_URL.BASE_TRADEMARK_URL}/${page}/${limit}`,
    method: 'get'
  })
}

// 删除品牌
export const deleteRemoveTrademarkApi = (data = {}) => {
  const { id } = data
  return request({
    url: `${TRADEMARK_URL.BASE_TRADEMARK_URL}/remove/${id}`,
    method: 'delete'
  })
}

// 新增/修改品牌
export const postAddOrUpdateTrademarkApi = (mode, data = {}) => {
  return request({
    url: `${TRADEMARK_URL.BASE_TRADEMARK_URL}${mode === 'add'? '/save' : '/update'}`,
    method: `${mode === 'add'? 'post' : 'put'}`,
    data
  })
}
