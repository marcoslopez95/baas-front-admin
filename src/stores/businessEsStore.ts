import { helperStore } from '../helper'

export const Store = defineStore('businesses', () => {
  const helper = helperStore()

  const { url } = storeToRefs(helper)
  url.value = '/api/configs/businesses'

  const index = () => {
    helper.index()
  }

  const businessNetwork = ref()
  const getBusinessNetwork = () => {
    let url = '/api/configs/business-networks'
    helper.http(url, 'get').then((res: any) => {
      businessNetwork.value = res.data.data
    })
  }

  const countries = ref()
  const getCountries = () => {
    let url = '/api/configs/countries'
    helper.http(url, 'get').then((res: any) => {
      countries.value = res.data.data
    })
  }
  const form = ref({
    name: '',
    code: '',
    business_network_id: 0,
    country_id: 0,
    description: '',
  })

  const account_types = ref<BaseInterface[]>([])
  const getAccountTypes = () => {
    let url = 'api/configs/account-type'
    helper.http(url, 'get').then((res: any) => {
      account_types.value = res.data.data
    })
  }
  const showModal = ref(false)

  const centralized_categories = ref<BaseInterface[]>([])
  const getCentralizedCategories = () => {
    let url = 'api/configs/centralized-category'
    helper.http(url, 'get').then((res: any) => {
      centralized_categories.value = res.data.data
    })
  }

  const currencies = ref<Currency[]>([])
  const getCurrencies = () => {
    let url = 'api/configs/currency'
    helper.http(url, 'get').then((res: any) => {
      currencies.value = res.data.data
    })
  }

  const getItemsForAssignCentralizedAccount = () => {
    getAccountTypes()
    getCurrencies()
    getCentralizedCategories()
    getPaymentMethods()
  }

  const form_assign = ref({
    account_type_id: '',
    business_id: '',
    centralized_account_category_id: '',
    currency_id: '',
  })

  const payment_methods = ref<PaymentMethod[]>([])
  const getPaymentMethods = () => {
    let url = 'api/configs/payment-methods'
    helper.http(url, 'get').then((res: any) => {
      payment_methods.value = res.data.data
    })
  }

  
const payment_methods_selected = ref([])
const is_primary_payment_methods_selected = ref()

const form_payment_method = computed(() =>{
  let valets = payment_methods_selected.value.map((item) => {
    let is_primary = item === is_primary_payment_methods_selected.value
    return {
      payment_method_id: item,
      is_primary
    }
  })
  return valets
})

  return {
    payment_methods_selected,
    is_primary_payment_methods_selected,
    form_payment_method,
    form,
    index,
    businessNetwork,
    getBusinessNetwork,
    countries,
    getCountries,
    showModal,
    account_types,
    getAccountTypes,

    centralized_categories,
    getCentralizedCategories,
    currencies,
    getCurrencies,
    getItemsForAssignCentralizedAccount,
    form_assign,
    payment_methods
  }

  interface BaseInterface {
    id: any
    description: string
    name: string
    created_at: string
  }
  interface PaymentMethod {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    currencies: Currency[]
  }

  interface Currency {
    id: number
    name: string
    description: string
    abbreviation: string
    symbol: string
    category: categoryInterface
  }

  interface categoryInterface {
    id: number
    name: string
    description: string
  }
})
