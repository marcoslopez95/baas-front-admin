import { helperStore } from '../helper'

export const Store = defineStore('country', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/countries'


 
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
