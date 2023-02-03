<script setup lang="ts">
import CreateModal from '@/views/countries/CreateModal.vue';
import dataTable from '@/views/countries/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Countries">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
