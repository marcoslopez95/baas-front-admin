<template>
  <VBtn @click="modal = true">{{$t('commons.Create')}}</VBtn>

  <VDialog v-model="modal" max-width="500px">
    <VCard>
      <VCardTitle>{{$t('commons.Create')}} {{$t('views.currencies.singular')}}</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.name" :label="$t('commons.Name')" />
          </VCol>
        </VRow>
        
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.description" :label="$t('commons.Description')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.abbreviation" :label="$t('commons.Abbreviation')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.symbol" :label="$t('commons.Symbol')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VSelect
              v-model="store.form.currency_category_id"
              :label="$t('views.currency-categories.singular')"
              :items="store.currencyCategories"
              item-title="name"
              item-value="id"
            ></VSelect>
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
          <VBtn variant="elevated" @click="create">{{$t('commons.Create')}}</VBtn>
        </VCol>
      </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { Store } from '@/stores/currencyStore';
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

store.getCurrencyCategories()
</script>

