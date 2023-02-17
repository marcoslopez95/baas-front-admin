<template>
  <VCard>
    <VCardTitle>{{$t('views.bussinesses.assign-payment-methods')}}</VCardTitle>
    <VCardText>
      <VRow>
        <VCol>
          <VSelect
            v-model="payment_methods_selected"
            :items="store.payment_methods"
            multiple
            placeholder="Select payment methods"
            item-value="id"
            item-title="name"
            @update:modelValue="setSelectables"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip>
                <span>{{ item.title }}</span>
              </v-chip>
            </template>
          </VSelect>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <span class="font-weight-bold"> {{$t('menu.Payment-Methods')}}</span>
        </VCol>
        <VCol>
          <span class="font-weight-bold">  {{$t('views.bussinesses.is-primary')}} </span>
        </VCol>
      </VRow>
      <!-- <VRadioGroup v-model="store.is_primary_payment_methods_selected" > -->
      <VRow v-for="(item, i) in selectables  as PaymentMethodsSelected[]">
        <VCol>
          {{ getNamePaymentMethod(item.id) }}
        </VCol>
        <VCol>
          <VCheckbox
            name="isPrimary"
            v-model="item.isPrimary"
          >
          </VCheckbox>
        </VCol>
      </VRow>
      <!-- </VRadioGroup> -->
    </VCardText>

    <VCardActions>
      <VRow>
        <VCol>
          <VBtn @click="store.showModal = false">{{$t('commons.Cancel')}}</VBtn>
        </VCol>
        <VCol></VCol>
        <VCol>
          <VBtn
            variant="elevated"
            @click="assignPaymentMethod"
            >{{$t('commons.Assign')}}</VBtn
          >
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { Store } from '@/stores/businessEsStore';

const store = Store()
const helper = helperStore()

const { payment_methods_selected,modalPayment } = storeToRefs(store)
const { item: item_h } = storeToRefs(helper)

const assignPaymentMethod = () => {
  let url = `/api/configs/businesses/${item_h.value.id}/payment-methods`
  let data = {
    payment_methods: form_payment_method.value,
  }
  helper.http(url, 'post', { data }).then((res: any) => {
    modalPayment.value = false
    store.index()
  })
}

interface PaymentMethodsSelected {
  id: number
  isPrimary: boolean
}
const getNamePaymentMethod = (id:number):string => {
  return store.payment_methods.find(item => item.id === id)?.name ?? ''
}

const selectables = ref<{id:number,isPrimary:boolean}[]>([])

const setSelectables = () => {
  selectables.value = payment_methods_selected.value.map(item => {
    let bool = selectables.value.find(item2 => item2.id === item)?.isPrimary

    return {
      id: item,
      isPrimary: bool,
    }
  })
}

const setSelectables2 = () => {
  selectables.value = item_h.value.paymentMethods.map(item => {
    return {
      id: item.id,
      isPrimary: item.isPrimary == 1,
    }
  })
}


const form_payment_method = computed(() =>{
  let valets = selectables.value.map((item: PaymentMethodsSelected) => {
    return {
      payment_method_id: item.id,
      is_primary: item.isPrimary == true ? 1 : 0
    }
  })
  return valets
})

setSelectables2()
</script>

<style scoped></style>
