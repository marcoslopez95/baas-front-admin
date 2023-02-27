<script setup lang="ts">
import CreateModal from '@/views/permission/CreateModal.vue';
import dataTable from '@/views/permission/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('views.permissions.plural')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
