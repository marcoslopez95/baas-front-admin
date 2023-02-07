<script setup lang="ts">
import CreateModal from '@/views/account-types/CreateModal.vue';
import dataTable from '@/views/account-types/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Account Types">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
