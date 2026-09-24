<script setup>
/** One panel inside <Tabs>. Registers with the parent to learn its position. */
import { computed, inject, ref } from 'vue'

const tabs = inject('n-tabs', null)

// Registration order is slot order, which is what the tab list is built from.
// Standing alone, a Tab just shows its content.
const { isActive } = tabs?.register() ?? { isActive: computed(() => true) }
</script>

<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>
