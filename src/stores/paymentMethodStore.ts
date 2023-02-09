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
    currencies: []
  })

  
  const currencies = ref<Currency[]>([])
  const showModal = ref(false)

  const getCurrencies = () => {
    let url = '/api/configs/currency'

    helper.http(url,'get')
      .then((res:any) => {
        currencies.value = res.data.data
      })
  }
  return {
    form,
    index,
    showModal,
    currencies,
    getCurrencies
  }

  interface Currency {
    id: number,
    name: string,
    abbreviation: string,
    symbol: string,
    description: string,
    createdAt: string,
    category: Category

  }

  interface Category {
    id: number
    name: string
    description: string
  }
})
