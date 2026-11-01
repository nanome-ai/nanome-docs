<script setup>
/**
 * Lays <IconCard>s out as a grid: the "what's on this screen" map at the top
 * of a page. Two columns by default, three with `:cols="3"`, one on a phone.
 */
defineProps({
  cols: { type: Number, default: 2 },
  /** Names the grid for screen readers, e.g. "Main Panel tabs". */
  label: { type: String, default: 'On this page' },
})
</script>

<template>
  <nav class="n-icongrid" :class="`cols-${cols}`" :aria-label="label">
    <slot />
  </nav>
</template>

<style scoped>
.n-icongrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 20px 0 28px;
}

.n-icongrid.cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 899px) {
  .n-icongrid.cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* A grid of just 3 cards keeps them in one row on a tablet, instead of 2 and
   a lone card under them. */
@media (min-width: 640px) and (max-width: 899px) {
  .n-icongrid.cols-3:where(:not(:has(> :nth-child(4)))) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .n-icongrid,
  .n-icongrid.cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>
