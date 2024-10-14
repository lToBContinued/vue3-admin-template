import request from '@/utils/request.js'
import MENU_URL from './menuUrl.js'

export const getPermissionListApi = () => {
  return request({
    url: MENU_URL.GET_PERMISSION_LIST_URL
  })
}
