<script setup lang="ts">
import CreateModal from '@/views/currency/CreateModal.vue';
import dataTable from '@/views/currency/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('views.currencies.plural')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
