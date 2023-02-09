import { helperStore } from '../helper'

export const roleStore = defineStore('role', () => {
  const helper = helperStore()
  
  const { items,item,url } = storeToRefs(helper)
  url.value = '/api/configs/roles'

  const form = ref({
    name:'',
    permissions: []
  })

  const permissions = ref<Permission[]>([])


  const getPermissions = () => {
    let url = `/api/configs/permissions`
    helper.http(url, 'get').then((res: any) => {
      permissions.value = res.data.data
    })
  }
  const showModal = ref<boolean>(false)


  return {
    form,
    showModal,
    getPermissions,
    permissions
  }
})

interface Permission {
  id: number
  name: string
  created_at: any
}

interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

interface BankAccountType {
  id: number
  name: string
  description?: any
  created_at?: any
}

interface Country {
  id: number
  name: string
  abbreviation: string
  phone_code: string
  citizenship: string
  description?: any
  created_at?: any
}

interface Rechargeable {
  id: number
  bank: string
  swiftCode: string
  accountHolder: string
  accountNumber: string
  address: string
  iban: string
  reference?: any
  createdAt: Date
  paymentMethod: PaymentMethod
  currency: Currency
  bankAccountType: BankAccountType
  country: Country
}

interface Currency2 {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

interface AccountType {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}

interface OperationStatus {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}

interface Account {
  id: number
  accountNumber: string
  balance: string
  transferAccountantBalance: string
  rechargeAccountantBalance: string
  createdAt: Date
  currency: Currency2
  accountType: AccountType
}

interface Voucher {
  id: number
  imageable_type: string
  imageable_id: number
  url: string
  created_at: Date
  updated_at: Date
}

interface Deposit {
  id: number
  transactionNumber: string
  amount: string
  createdAt: Date
  rechargeable: Rechargeable
  account: Account
  voucher: Voucher
  operationStatus: OperationStatus
}

interface Link {
  url: string
  label: string
  active: boolean
}

interface RootObject {
  current_page: number
  data: Deposit[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url?: any
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}
