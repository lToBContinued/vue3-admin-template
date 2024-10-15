import request from '@/utils/request.js'
import MENU_URL from './menuUrl.js'

// 获取菜单列表
export const getPermissionListApi = () => {
  return request({
    url: MENU_URL.GET_PERMISSION_LIST_URL
  })
}

// 添加与更新菜单
export const addOrUpdateMenuApi = (data = {}) => {
  if (data.id) {
    return request({
      url: MENU_URL.UPDATE_MENU_URL,
      method: 'PUT',
      data
    })
  } else {
    return request({
      url: MENU_URL.ADD_MENU_URL,
      method: 'POST',
      data
    })
  }
}

// 删除已有菜单
export const removeMenuApi = (id) => {
  return request({
    url: `/admin/acl/permission/remove/${id}`,
    method: 'DELETE'
  })
}
