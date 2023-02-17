<script setup lang="ts">
import CreateModal from '@/views/centralized-category/CreateModal.vue';
import dataTable from '@/views/centralized-category/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('menu.Centralized-Accounts')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
