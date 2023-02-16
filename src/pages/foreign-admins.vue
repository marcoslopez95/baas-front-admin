<script setup lang="ts">
import CreateModal from '@/views/foreign-admins/CreateModal.vue';
import dataTable from '@/views/foreign-admins/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Foreign Admins">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
