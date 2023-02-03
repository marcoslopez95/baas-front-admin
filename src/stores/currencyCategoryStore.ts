import { helperStore } from '../helper'

export const Store = defineStore('currency-category', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/currency-category'


 
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
