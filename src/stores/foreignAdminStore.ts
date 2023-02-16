import { helperStore } from '../helper'

export const Store = defineStore('country', () => {
  const helper = helperStore()
  
  const { url, pagination } = storeToRefs(helper)
  url.value = '/api/configs/foreign-administrators'
  pagination.value.perPage = 5

 
  const index = () =>{
    helper.index()
  }
  const form = ref<ForeignAdmin>({
    business_id : "",
    email: "",
    name: "",
    password: "",
    password_confirmation: ""
  })

  
  interface ForeignAdmin {
      business_id : number | '',
      email: string,
      name: string,
      password: string,
      password_confirmation?: string,
  }
  return {
    form,
    index,
  }
})
