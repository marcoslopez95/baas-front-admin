import { helperStore } from '../helper'

export const Store = defineStore('permission', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/permissions'

  const form = ref({
    name:''
  })

  

  return {
    form,

  }
})
