<template>
  <VBtn @click="modal = true">Create</VBtn>

  <VDialog v-model="modal" max-width="500px">
    <VCard>
      <VCardTitle>Create Business Network</VCardTitle>
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
          <VBtn variant="elevated" @click="create">Create</VBtn>
        </VCol>
      </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { Store } from '@/stores/businessEsStore';


// import UploadVoucher from './UploadVoucher.vue';

const store = Store()
const helper = helperStore()

const modal = ref(false)

const create = () => {
  helper.create(store.form).then(()=>{
    modal.value = false
    helper.index()
  })
}

store.getBusinessNetwork()
store.getCountries()
</script>

