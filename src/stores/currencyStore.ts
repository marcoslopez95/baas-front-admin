import { helperStore } from '../helper'

export const Store = defineStore('currency', () => {
  const helper = helperStore()
  
  const { url } = storeToRefs(helper)
  url.value = '/api/configs/currency'

  const index = () =>{
    helper.index()
  }
  const form = ref({
    // id:'',
    name:'',
    description:'',
    abbreviation:'',
    currency_category_id:'',
    symbol:'',

  })

  const currencyCategories  = ref<categoryInterface[]>([])

  const getCurrencyCategories = () => {
    let url = '/api/configs/currency-category?perPage=5&currentPage=1'

    helper.http(url,'get').then((res: any) => {
      currencyCategories.value = res.data.data
    })
  }

  return {
    form,
    index,
    currencyCategories,
    getCurrencyCategories,
  }

  
  interface categoryInterface {
    id:number,
    name:string,
    description:string,
  }
})
