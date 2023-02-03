import { helperStore } from '../helper'

export const Store = defineStore('payment-methods', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/payment-methods'


 
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
