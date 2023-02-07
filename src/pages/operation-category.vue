<script setup lang="ts">
import CreateModal from '@/views/operation-category/CreateModal.vue';
import dataTable from '@/views/operation-category/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Operation Category">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
