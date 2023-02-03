import { helperStore } from '../helper'

export const Store = defineStore('businesses', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/businesses'


 
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
    let url =  '/api/configs/countries?perPage=15&currentPage=1'
    helper.http(url,'get').then((res:any) => {
      countries.value = res.data.data
    })
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
    businessNetwork,
    getBusinessNetwork,
    countries,
    getCountries,
  }
})
