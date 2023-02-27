<script setup lang="ts">
import CreateModal from '@/views/operation-status/CreateModal.vue';
import dataTable from '@/views/operation-status/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('views.operation-status.plural')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
