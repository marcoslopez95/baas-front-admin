<script setup lang="ts">
import CreateModal from '@/views/cripto-currency-network/CreateModal.vue';
import dataTable from '@/views/cripto-currency-network/dataTable.vue';
</script>

<template>
  <VRow>

    <VCol cols="12" class="text-end">
      <CreateModal></CreateModal>
    </VCol>
    <!-- fixed header -->
    <VCol cols="12">
      <VCard :title="$t('views.criptocurrency-networks.plural')">
        <dataTable></dataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
