<script lang="ts" setup>
import { helperStore } from '@/helper';
import { Store } from '@/stores/businessEsStore';
// import UploadVoucher from './UploadVoucher.vue';

const store = Store()
const helper = helperStore()
helper.url = '/api/configs/businesses'

const { form } = storeToRefs(store)

store.index()
const modal = ref(false)

const id = ref()
const openUpdate = (item: BaseInterface) => {
  form.value.name = item.name
  form.value.description = `${item.description}`
  form.value.code = item.code
  form.value.business_network_id = item.businessNetwork.id
  form.value.country_id = item.country.id

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

interface BaseInterface{
  id?: any
  code?: any
  description?: string
  name: string
  country: Country
  businessNetwork: BusinessNetwork
  business_network_id?: number
  country_id?: number
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
        <th class="text-uppercase">Code</th>
        <th class="text-center text-uppercase">Country</th>
        <th class="text-center text-uppercase">Network</th>
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
        <td>{{ item.code }}</td>
        <td class="text-center">
          {{ item.country.name }}
        </td>
        <td class="text-center">
          {{ item.businessNetwork.name }}
        </td>
        <td class="text-center">
          <!-- Si y solo si en proceso, cargar comprobante -->
          <VBtn @click="openUpdate(item)">
            <VIcon icon="mdi-pencil" />
          </VBtn>

          <VBtn @click="deleted(item.id)">
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

  <VDialog
    v-if="modal"
    v-model="modal"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>Update Business Network</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VSelect
              :items="store.countries"
              v-model="store.form.country_id"
              label="Country"
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

              label="Business Network"
              item-title="name"
              item-value="id"
            >
            </VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.name" label="Name" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.code" label="Code" />
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
            <VBtn
              variant="elevated"
              @click="update"
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
