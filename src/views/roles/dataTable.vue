<script lang="ts" setup>
import { helperStore } from '@/helper';
import { roleStore } from '@/stores/roleStore';
import 'vue-select/dist/vue-select.css';

const store = roleStore()
const helper = helperStore()
helper.url = '/api/configs/roles'

const { form } = storeToRefs(store)

store.getPermissions()
helper.index()

interface RoleInterface {
  id: number
  name: string
  createdAt: string
}

const modal = ref(false)

const id = ref()
const openUpdate = (item: RoleInterface) => {
  form.value.name = item.name
  id.value = item.id
  modal.value = true
}

const update = () => {
  helper.put(id.value, form.value).then(() => {
    modal.value = false
    helper.index()
  })
}

const deleted = (id: number) => {
  helper.deleted(id).then(() => {
    modal.value = false
    helper.index()
  })
}

const assignPermissionToRole = () => {
  let url = `api/configs/roles/${id.value}/permissions`
  let data = {
    permissions: store.form.permissions,
    name: store.permissions.find((item) => item.id === id.value).name
  }
  helper.http(url, 'post', { data }).then((res: any) => {
    store.showModal = false
    helper.index()
  })
}

const openAssigPermissionsModal = (id_se:number) => {
  store.showModal = true
  id.value = id_se
}

interface Permission {
  id: number
  name: string
  created_at: any
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
        <td class="text-center">/</td>
        <td class="text-center">
          <VRow
            justify="center"
            class="px-4"
          >
            <VCol></VCol>
            <VCol>
              <VBtn @click="openUpdate(item)">
                <VIcon icon="mdi-pencil" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="deleted(item.id)">
                <VIcon icon="mdi-delete" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openAssigPermissionsModal(item.id)">
                <VIcon icon="mdi-order-bool-ascending-variant" />
              </VBtn>
            </VCol>
            <VCol></VCol>
          </VRow>
        </td>
      </tr>
    </tbody>
  </VTable>

  <!-- Edit Modal -->
  <VDialog
    v-if="modal"
    v-model="modal"
    max-width="300px"
  >
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
            <VBtn
              variant="elevated"
              @click="update"
              >Update</VBtn
            >
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Assign Permission To Role Modal -->
  <VDialog
    v-if="store.showModal"
    v-model="store.showModal"
    max-width="600px"
  >
    <VCard min-height="500px">
      <VCardTitle>Assign permissions to Role</VCardTitle>
      <VCardText>
        <v-select-c
          v-model="store.form.permissions"
          multiple
          :options="store.permissions"
          label="name"
          :reduce="(item: Permission ) => item.id"
        >
        </v-select-c>
        <!-- <VSelect
          :model-value="store.form.permissions"
          :items="store.permissions"
          item-title="name"
          item-value="id"
          multiple
        >
        </VSelect> -->
      </VCardText>

      <VCardActions>
        <VRow>
          <VCol>
            <VBtn @click="store.showModal = false">Cancel</VBtn>
          </VCol>
          <VCol></VCol>
          <VCol>
            <VBtn
              variant="elevated"
              @click="assignPermissionToRole"
              >Update</VBtn
            >
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style>
.text-pending {
  color: #f37f0b;
}

.text-verified {
  color: #410bf3;
}

.text-success {
  color: #138104;
}
.text-blocked {
  color: #b60000;
}
</style>
