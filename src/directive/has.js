import pinia from '@/stores/index.js'
import useUserStore from '@/stores/modules/user.js'

const userStore = useUserStore(pinia)
export const isHasButton = (app) => {
  app.directive('has', {
    mounted(el, options) {
      // 如果用户信息buttons数组中没有该按钮，则将当前元素从DOM树上删除
      if (userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
