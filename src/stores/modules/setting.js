// layout组件相关配置的仓库
import { defineStore } from 'pinia'

export const useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false // 菜单是否折叠
    }
  }
})

export default useLayoutSettingStore
