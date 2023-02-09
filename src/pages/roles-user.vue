<script lang="ts" setup>
import CreateModal from '@/views/roles/CreateModal.vue';
import TableFixedHeader from '@/views/roles/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard title="Roles">
        <TableFixedHeader />
      </VCard>
    </VCol>
  </VRow>
</template>
