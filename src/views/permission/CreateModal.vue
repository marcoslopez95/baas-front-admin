<template>
  <VBtn @click="modal = true">{{$t('commons.Create')}}</VBtn>

  <VDialog v-model="modal" max-width="300px">
    <VCard>
      <VCardTitle>{{$t('commons.Create')}} {{$t('views.permissions.singular')}}</VCardTitle>
      <VCardText>
       <VTextField 
        v-model="store.form.name" 
        :label="$t('commons.Name')" 
        />
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
import { roleStore } from '@/stores/roleStore';
// import UploadVoucher from './UploadVoucher.vue';

const store = roleStore()
const helper = helperStore()

const modal = ref(false)

const create = () => {
  helper.create({name: store.form.name}).then(()=>{
    modal.value = false
    helper.index()
  })
}
</script>

