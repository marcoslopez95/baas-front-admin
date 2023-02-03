<script setup lang="ts">
import CreateModal from '@/views/currency-category/CreateModal.vue';
import dataTable from '@/views/currency-category/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Currency Categories">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
