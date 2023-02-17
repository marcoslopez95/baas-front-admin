<script lang="ts" setup>
import type { NavSectionTitle } from '@layouts/types';

const { item } = defineProps<{ item: NavSectionTitle }>()

const show = ref(true)
const showElements = () => {
  if (item.dropable) {
    show.value = !show.value
  }
}
</script>

<template>
  <li
    class="nav-section-title"
    :style="item.dropable ? 'cursor: pointer;' : ''"
    @click="showElements"
  >
    <div class="title-wrapper">
      <Transition
        name="vertical-nav-section-title"
        mode="out-in"
      >
        <!-- eslint-disable vue/no-v-text-v-html-on-component -->
        <span
          class="title-text"
        >
        {{ item.heading }} 
        <VIcon
        v-if="item.dropable"
          :icon="show ? 'mdi-minus':'mdi-plus'"
          class="nav-item-icon"
        />
        </span>
        <!-- eslint-enable vue/no-v-text-v-html-on-component -->
      </Transition>
    </div>
  </li>
  <div v-show="show">
    <slot> </slot>
  </div>
</template>
