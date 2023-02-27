<script lang="ts" setup>
import { helperStore } from '@/helper';
import { Store } from '@/stores/businessEsStore';
// import UploadVoucher from './UploadVoucher.vue';
import AssignPaymentMethods from './AssignPaymentMethods.vue';
const store = Store()
const helper = helperStore()
helper.url = '/api/configs/businesses'

const { form, form_assign, payment_methods_selected } = storeToRefs(store)

const { item: item_h } = storeToRefs(helper)

store.index()
const modal = ref(false)

const id = ref()
const openUpdate = (item: BaseInterface) => {
  form.value.name = item.name
  form.value.description = `${item.description}`
  form.value.code = item.code
  form.value.business_network_id = item.businessNetwork?.id
  form.value.country_id = item.country?.id

  id.value = item.id
  modal.value = true
}

const update = () => {
  helper.put(id.value, form.value).then(() => {
    modal.value = false
    store.index()
  })
}

const deleted = (id: number) => {
  helper.deleted(id).then(() => {
    modal.value = false
    store.index()
  })
}

const openAssin = (item: BaseInterface) => {
  form_assign.value.business_id = item.id
  store.showModal = true
  form_assign.value.account_type_id = ''
  form_assign.value.centralized_account_category_id = ''
  form_assign.value.currency_id = ''
}

const assignPermissionToRole = () => {
  let url = `/api/configs/businesses/assign-centralized-account`
  let data = {
    account_type_id: form_assign.value.account_type_id,
    business_id: form_assign.value.business_id,
    centralized_account_category_id: form_assign.value.centralized_account_category_id,
    currency_id: form_assign.value.currency_id,
  }
  helper.http(url, 'post', { data }).then((res: any) => {
    store.showModal = false
    form_assign.value.account_type_id = ''
    form_assign.value.business_id = ''
    form_assign.value.centralized_account_category_id = ''
    form_assign.value.currency_id = ''
    store.index()
  })
}

const modalPayment = ref(false)

const showModalPayment = (item: BaseInterface) => {
  item_h.value = item
  form_assign.value = {
    account_type_id: '',
    business_id: '',
    centralized_account_category_id: '',
    currency_id: '',
  }
  // payment_methods_selected.value = item.paymentMethods.map(e => ({
  //   id: e.id,
  //   name: e.name,
  //   isPrimary: e.isPrimary == 1,
  // }))
  payment_methods_selected.value = item.paymentMethods.map(e => e.id)
  id.value = item.id
  modalPayment.value = true
}

store.getItemsForAssignCentralizedAccount()

const form_payment = ref([])

interface Country {
  id: number
  name: string
  abbreviation?: any
  phone_code?: any
  citizenship?: any
  description?: any
  created_at?: any
}

interface BusinessNetwork {
  id: number
  name: string
  description: string
  created_at?: any
}

interface BaseInterface {
  id?: any
  code?: any
  description?: string
  name: string
  country: Country
  businessNetwork: BusinessNetwork
  business_network_id?: number
  country_id?: number
  paymentMethods: PaymentMethod[]
}

interface PaymentMethod {
  id: number
  name: string
  description: string
  currencies: Currency[]
}

interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt: string
  category: Category
}

interface Category {
  id: number
  name: string
  description: string
}
</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">Id</th>
        <th class="text-uppercase">{{$t('commons.Name')}}</th>
        <th class="text-uppercase">{{$t('commons.Code')}}</th>
        <th class="text-center text-uppercase">{{$t('views.countries.singular')}}</th>
        <th class="text-center text-uppercase">{{$t('views.bussiness-networks.singular')}}</th>
        <th class="text-center text-uppercase">{{$t('tables.headers.Actions')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in ((helper.items) as BaseInterface[])"
        :key="i"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.code }}</td>
        <td class="text-center">
          {{ item.country?.name }}
        </td>
        <td class="text-center">
          {{ item.businessNetwork?.name }}
        </td>
        <td class="text-center">
          <!-- Si y solo si en proceso, cargar comprobante -->
          <VBtn
            @click="openAssin(item)"
            size="small"
          >
            <VIcon icon="mdi-order-bool-ascending-variant" />
          </VBtn>
          <VBtn
            @click="showModalPayment(item)"
            size="small"
          >
            <VIcon icon="mdi-account-credit-card" />
          </VBtn>
          <!-- Si y solo si en proceso, cargar comprobante -->
          <VBtn
            @click="openUpdate(item)"
            size="small"
          >
            <VIcon icon="mdi-pencil" />
          </VBtn>

          <VBtn
            @click="deleted(item.id)"
            size="small"
          >
            <VIcon icon="mdi-delete" />
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
  <VRow class="mt-2 px-5 py-2">
    <VCol>
      <VRow>
        <VCol cols="4">
          <VSelect
            v-model="helper.pagination.perPage"
            :items="helper.perPage"
            label="Pagination"
            @update:modelValue="store.index()"
          >
          </VSelect>
        </VCol>
      </VRow>
    </VCol>
    <VCol>
      <VPagination
        v-model="helper.pagination.currentPage"
        :length="helper.pagination.total"
        @update:model-value="helper.index"
      ></VPagination>
    </VCol>
    <VCol></VCol>
  </VRow>

  <!-- 
  ********
  ************
  ************
  ***********
  *
  *
  *
  *
  *
  *
  *
  ***
  *
  *
  *
  **
 -->
  <VDialog
    v-if="modal"
    v-model="modal"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>{{$t('commons.Update')}}</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VSelect
              :items="store.countries"
              v-model="store.form.country_id"
              :label="$t('views.countries.singular')"

              item-title="name"
              item-value="id"
            >
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VSelect
              :items="store.businessNetwork"
              v-model="store.form.business_network_id"
              :label="$t('views.bussiness-networks.singular')"

              item-title="name"
              item-value="id"
            >
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.name" :label="$t('commons.Name')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.code" :label="$t('commons.Code')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.description" :label="$t('commons.Description')" />
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <VRow>
          <VCol>
            <VBtn @click="modal = false">{{$t('commons.Cancel')}}</VBtn>

          </VCol>
          <VCol></VCol>
          <VCol>
            <VBtn
              variant="elevated"
              @click="update"
              >{{$t('commons.Update')}}</VBtn
            >
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Assign Account centralized to business -->
  <VDialog
    v-if="store.showModal"
    v-model="store.showModal"
    max-width="600px"
  >
    <VCard>
      <VCardTitle>{{$t('views.bussinesses.assign-account-centralized')}}</VCardTitle>
      <VCardText>
        <!-- <v-select-c
          v-model="store.form.permissions"
          multiple
          :options="store.permissions"
          label="name"
          :reduce="(item: Permission ) => item.id"
        >
        </v-select-c> -->
        <VRow>
          <VCol>
            <VSelect
              :label="$t('views.account-types.singular')"
              v-model="form_assign.account_type_id"
              :items="store.account_types"
              item-title="name"
              item-value="id"
            >
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VSelect
              :label="$t('views.centralized-accounts.singular')"
              v-model="form_assign.centralized_account_category_id"
              :items="store.centralized_categories"
              item-title="name"
              item-value="id"
            >
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VSelect
            :label="$t('views.currencies.singular')"
              v-model="form_assign.currency_id"
              :items="store.currencies"
              item-title="name"
              item-value="id"
            >
            </VSelect>
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <VRow>
          <VCol>
            <VBtn @click="modal = false">{{$t('commons.Cancel')}}</VBtn>

          </VCol>
          <VCol></VCol>
          <VCol>
            <VBtn
              variant="elevated"
              @click="assignPermissionToRole"
              >{{$t('commons.Assign')}}</VBtn
            >
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Assign Payment Methods to business -->
  <VDialog
    v-if="modalPayment"
    v-model="modalPayment"
    max-width="600px"
  >
  <AssignPaymentMethods></AssignPaymentMethods>
  </VDialog>
</template>

<style>
.text-pending {
  color: #f37f0b;
}

.text-verified {
  color: #410bf3;
}

.text-success {
  color: #138104;
}
.text-blocked {
  color: #b60000;
}
</style>
