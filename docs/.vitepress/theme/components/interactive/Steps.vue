<script setup>
/**
 * Numbers the ordered list inside it and runs a rule down the left, so a
 * sequence reads as a sequence rather than as bullets.
 *
 *   <Steps>
 *
 *   1. Open the console.
 *   2. Add the device.
 *
 *   </Steps>
 */
</script>

<template>
  <div class="n-steps">
    <slot />
  </div>
</template>

<style scoped>
.n-steps {
  margin: 24px 0;
}

.n-steps :deep(ol) {
  counter-reset: n-step;
  margin: 0;
  padding: 0;
  list-style: none;
}

.n-steps :deep(ol > li) {
  position: relative;
  margin: 0;
  padding: 0 0 22px 38px;
}

.n-steps :deep(ol > li::before) {
  counter-increment: n-step;
  content: counter(n-step);
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--n-border);
  border-radius: 50%;
  background: var(--n-surface);
  color: var(--n-text);
  font-size: var(--n-text-xs);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* The rule joins one marker to the next, and stops at the last. */
.n-steps :deep(ol > li::after) {
  content: '';
  position: absolute;
  top: 28px;
  left: 11.5px;
  bottom: 4px;
  width: 1px;
  background: var(--n-border);
}

.n-steps :deep(ol > li:last-child) {
  padding-bottom: 0;
}

.n-steps :deep(ol > li:last-child::after) {
  display: none;
}

.n-steps :deep(ol > li > :first-child) {
  margin-top: 0;
}

.n-steps :deep(ol > li > :last-child) {
  margin-bottom: 0;
}
</style>
