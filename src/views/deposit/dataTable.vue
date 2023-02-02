<script lang="ts" setup>
import { helperStore } from '@/helper';
import { roleStore } from '@/stores/roleStore';
// import UploadVoucher from './UploadVoucher.vue';

const store = roleStore()
const helper = helperStore()

const {form} = storeToRefs(store)

helper.index()

interface RoleInterface {
  id: number;
  name: string;
  createdAt: string;
}

const modal = ref(false)

const id = ref()
const openUpdate = (item: RoleInterface) =>{
  form.value.name = item.name
  id.value = item.id
  modal.value = true
}

const update = () => {
  helper.put(id.value,form.value).then(() =>{
    modal.value = false
    helper.index()
  })
}
</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">Id</th>
        <th class="text-uppercase">Name</th>
        <th class="text-center text-uppercase">Status</th>
        <th class="text-center text-uppercase">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in ((helper.items) as RoleInterface[])"
        :key="i"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td class="text-center">
          /
        </td>
        <td class="text-center">
        <!-- Si y solo si en proceso, cargar comprobante -->
        <VBtn 
            @click="openUpdate(item)"
            >
            <VIcon icon="mdi-pencil" />
          </VBtn>

          <VBtn 
            @click="helper.deleted(item.id)"
            >
            <VIcon icon="mdi-delete" />
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>

  
  <VDialog v-if="modal" v-model="modal" max-width="300px">
    <VCard>
      <VCardTitle>Update Role</VCardTitle>
      <VCardText>
       <VTextField v-model="store.form.name" />
      </VCardText>

      <VCardActions>
      <VRow>
        <VCol>
          <VBtn @click="modal = false">Cancel</VBtn>
        </VCol>
        <VCol></VCol>
        <VCol>
          <VBtn variant="elevated" @click="update">Update</VBtn>
        </VCol>
      </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style>
.text-pending {
  color: #f37f0b
}

.text-verified {
  color: #410bf3
}

.text-success {
  color: #138104

}
.text-blocked {
  color: #b60000
}
</style>
