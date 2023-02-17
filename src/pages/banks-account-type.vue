<script setup lang="ts">
import CreateModal from '@/views/bank-account-type/CreateModal.vue';
import dataTable from '@/views/bank-account-type/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('menu.Bank-Account-Types')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
