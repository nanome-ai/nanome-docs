<script setup>
/** Lays <ToolLink>s out in two columns; one column on a phone. */
</script>

<template>
  <nav class="n-toolgrid" aria-label="Tools">
    <slot />
  </nav>
</template>

<style scoped>
.n-toolgrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 20px 0 28px;
}

@media (max-width: 639px) {
  .n-toolgrid {
    grid-template-columns: 1fr;
  }
}
</style>
