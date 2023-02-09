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

  const account_types = ref<BaseInterface[]>([])
  const getAccountTypes = () =>{
    let url =  'api/configs/account-type'
    helper.http(url,'get').then((res:any) => {})
  }
  const showModal = ref(false)

  return {
    form,
    index,
    businessNetwork,
    getBusinessNetwork,
    countries,
    getCountries,
    showModal,
    account_types,
    getAccountTypes,
  }

  interface BaseInterface{
    id: any
    description: string
    name: string
    created_at: string
  }
})
