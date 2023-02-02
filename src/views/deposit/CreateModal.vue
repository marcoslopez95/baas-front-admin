<template>
  <VBtn @click="modal = true">Create</VBtn>

  <VDialog v-model="modal" max-width="300px">
    <VCard>
      <VCardTitle>Create Role</VCardTitle>
      <VCardText>
       <VTextField v-model="store.form.name" />
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

