<script setup lang="ts">
import CreateModal from '@/views/paymentMethods/CreateModal.vue';
import dataTable from '@/views/paymentMethods/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('views.payment-methods.plural')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
