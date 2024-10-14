import request from '@/utils/request.js'
import ROLE_URL from './roleUrl.js'

// 获取所有角色列表
export const getAllRoleApi = (params = {}) => {
  const { page, limit, keyword } = params
  return request({
    url: `${ROLE_URL.GET_ALL_ROLE_URL}/${page}/${limit}/?roleName=${keyword}`
  })
}

// 新增或修改职位
export const addOrUpdateRoleApi = (data = {}) => {
  if (data.id) {
    return request({
      url: `${ROLE_URL.UPDATE_ROLE_URL}`,
      method: 'PUT',
      data
    })
  } else {
    return request({
      url: ROLE_URL.ADD_ROLE_URL,
      method: 'POST',
      data
    })
  }
}

// 获取全部菜单与按钮的权限
export const getAllMenuListApi = (params = {}) => {
  const { roleId } = params
  return request({
    url: `${ROLE_URL.ALL_PERMISSION_UEL}/${roleId}`
  })
}

// 给相应的职位下发权限
export const setPermissionApi = (data = {}) => {
  const { roleId, permissionId } = data
  return request({
    url: `${ROLE_URL.SET_PERMISSION_URL}?roleId=${roleId}&permissionId=${permissionId}`,
    method: 'POST'
  })
}
