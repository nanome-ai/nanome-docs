<script setup>
/** Lays <Card>s out in even columns; drops to one column on a phone. */
defineProps({
  cols: { type: [Number, String], default: 2 },
})
</script>

<template>
  <div class="n-cardgrid" :style="{ '--n-cols': cols }">
    <slot />
  </div>
</template>

<style scoped>
.n-cardgrid {
  display: grid;
  grid-template-columns: repeat(var(--n-cols, 2), minmax(0, 1fr));
  gap: 12px;
  margin: 24px 0;
}

@media (max-width: 860px) {
  .n-cardgrid {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
}

@media (max-width: 520px) {
  .n-cardgrid {
    grid-template-columns: 1fr;
  }
}
</style>
