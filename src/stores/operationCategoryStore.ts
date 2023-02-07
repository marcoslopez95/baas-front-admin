import { helperStore } from '../helper'

export const Store = defineStore('operation-category', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/operation-category'


 
  const index = () =>{
    helper.index()
  }

  const businessNetwork = ref()
  
  const getBusinessNetwork = () =>{
    let url =  '/api/configs/business-networks'
    helper.http(url,'get').then((res:any) => {
      businessNetwork.value = res.data.data
    })
  }

  const countries = ref()
  const getCountries = () =>{
    let url =  '/api/configs/countries'
    helper.http(url,'get').then((res:any) => {
      countries.value = res.data.data
    })
  }
  const form = ref({
    name:"",
    code:"",
    business_network_id: 0,
    country_id: 0,
    description:"",

  })

  

  return {
    form,
    index,
    businessNetwork,
    getBusinessNetwork,
    countries,
    getCountries,
  }
})
