<script setup lang="ts">
import CreateModal from '@/views/business-network/CreateModal.vue';
import dataTable from '@/views/business-network/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Business Networks">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
