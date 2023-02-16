import { helperStore } from '../helper'

export const Store = defineStore('permission', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/permissions'

  const form = ref({
    name:''
  })

  const index = () => {
    helper.index()
  }


  return {
    form,
    index
  }
})
