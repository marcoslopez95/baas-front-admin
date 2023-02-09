<script lang="ts" setup>
import { helperStore } from '@/helper';
import { Store } from '@/stores/paymentMethodStore';
// import UploadVoucher from './UploadVoucher.vue';

const store = Store()
const helper = helperStore()
helper.url = '/api/configs/payment-methods'

const {form} = storeToRefs(store)

store.getCurrencies()
store.index()

interface BaseInterface {
  id:number,
  name:string,
  description:string,
  currencies: Currency[]
}

const modal = ref(false)

const id = ref()
const openUpdate = (item: BaseInterface) =>{
  form.value.name = item.name
  form.value.description = item.description
  id.value = item.id
  modal.value = true
}

const update = () => {
  helper.put(id.value,form.value).then(() =>{
    modal.value = false
    store.index()
  })
}

const deleted = (id:number) => {
  helper.deleted(id).then(()=> {
    modal.value =false
    store.index()
  })
}

const openAssin = (item: BaseInterface) => {
  id.value = item.id
  store.showModal = true
  form.value.currencies = item.currencies.map(c => c.id)

}
const assignPermissionToRole = () =>{
  let url = `/api/configs/payment-methods/${id.value}/currencies`
  let data = {
    currencies: store.form.currencies
  }
helper.http(url,'post',{data})
  .then((res:any) => {
    store.showModal = false
    store.index()
  })
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
</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">Id</th>
        <th class="text-uppercase">Name</th>
        <th class="text-center text-uppercase">description</th>
        <th class="text-center text-uppercase">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in ((helper.items) as BaseInterface[])"
        :key="i"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
       
        <td class="text-center">
          {{ item.description}}
        </td>
        <td class="text-center">
          <VBtn 
            @click="openAssin(item)"
            >
            <VIcon icon="mdi-account-credit-card-outline" />
          </VBtn>
        <!-- Si y solo si en proceso, cargar comprobante -->
        <VBtn 
            @click="openUpdate(item)"
            >
            <VIcon icon="mdi-pencil" />
          </VBtn>

          <VBtn 
            @click="deleted(item.id)"
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

  
  <VDialog v-if="modal" v-model="modal" max-width="500px">
    <VCard>
      <VCardTitle>Update Country</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.name" label="Name" />
          </VCol>
        </VRow>
 
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.description" label="Description" />
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
      <VRow>
        <VCol>
          <VBtn @click="modal = false">Cancel</VBtn>
        </VCol>
        <VCol></VCol>
        <VCol>
          <VBtn variant="elevated" @click="update">Update</VBtn>
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
    <VCard min-height="500px">
      <VCardTitle>Assign curencies to payment method</VCardTitle>
      <VCardText>
        <v-select-c
          v-model="store.form.currencies"
          multiple
          :options="store.currencies"
          label="name"
          :reduce="(item: Currency ) => item.id"
        >
        </v-select-c>
        <!-- <VSelect
          :model-value="store.form.permissions"
          :items="store.permissions"
          item-title="name"
          item-value="id"
          multiple
        >
        </VSelect> -->
      </VCardText>

      <VCardActions>
        <VRow>
          <VCol>
            <VBtn @click="store.showModal = false">Cancel</VBtn>
          </VCol>
          <VCol></VCol>
          <VCol>
            <VBtn
              variant="elevated"
              @click="assignPermissionToRole"
              >Update</VBtn
            >
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style>
.text-pending {
  color: #f37f0b
}

.text-verified {
  color: #410bf3
}

.text-success {
  color: #138104

}
.text-blocked {
  color: #b60000
}
</style>
