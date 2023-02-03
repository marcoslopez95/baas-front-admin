<script setup lang="ts">
import CreateModal from '@/views/businesses/CreateModal.vue';
import dataTable from '@/views/businesses/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Businesses">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
