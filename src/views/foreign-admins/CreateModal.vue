<template>
  <VBtn @click="modal = true">{{ $t('buttons.create') }}</VBtn>

  <VDialog v-model="modal" max-width="500px">
    <VCard>
      <VCardTitle>{{ $t('commons.Create') }} {{ $t('views.foreign-admins.singular') }}</VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VSelect 
              v-model="store.form.business_id" 
              :label="$t('views.bussinesses.singular')" 
              :items="store.bussiness"
              item-title="name"
              item-value="id"
              />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.email" :label="$t('commons.Email')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.name" :label="$t('commons.Name')" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.password" :label="$t('views.foreign-admins.password')" :type="viewPassword ? 'text' : 'password'"
                :append-inner-icon="viewPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="viewPassword = !viewPassword" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="store.form.password_confirmation" :label="$t('views.foreign-admins.password-confirm')" :type="viewPasswordConfirmation ? 'text' : 'password'"
                :append-inner-icon="viewPasswordConfirmation ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="viewPasswordConfirmation = !viewPasswordConfirmation" />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
      <VRow>
        <VCol>
          <VBtn @click="modal = false">{{ $t('commons.Cancel') }}</VBtn>
        </VCol>
        <VCol></VCol>
        <VCol>
          <VBtn variant="elevated" @click="create">{{ $t('commons.Create') }}</VBtn>
        </VCol>
      </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { Store } from '@/stores/foreignAdminStore';
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


const viewPassword = ref(false)
const viewPasswordConfirmation = ref(false)

interface BaseInterface {
  id?:number,
  business_id: number | '',
  email: string,
  name: string,
  password?: string,
  password_confirmation?: string,
  code?: any;
  createdAt: Date;
  business: Business;
}

interface Country {
        id: number;
        name: string;
        abbreviation: string;
        phone_code: string;
        citizenship: string;
        description?: any;
        created_at: Date;
        deleted_at?: any;
    }

    interface BusinessNetwork {
        id: number;
        name: string;
        description?: any;
        created_at: Date;
    }
    interface Business {
        id: number;
        code: string;
        name: string;
        description?: any;
        createdAt: Date;
        country: Country;
        businessNetwork: BusinessNetwork;
    }
</script>

