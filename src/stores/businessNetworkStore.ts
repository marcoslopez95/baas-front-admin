import { helperStore } from '../helper'

export const Store = defineStore('business-network', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/business-networks'


 
  const index = () =>{
    helper.index()
  }
  const form = ref({
    name:"",
    abbreviation:"",
    citizenship:"",
    phone_code:"",
    description:"",

  })

  

  return {
    form,
    index,
  }
})
