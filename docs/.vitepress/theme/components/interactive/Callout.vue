<script setup>
/** A short aside — a caveat, a number worth keeping, a pointer elsewhere. */
defineProps({
  type: {
    type: String,
    default: 'note',
    validator: (v) => ['note', 'tip', 'warning', 'danger'].includes(v),
  },
  title: { type: String, default: '' },
})
</script>

<template>
  <aside class="n-callout" :class="`n-callout--${type}`">
    <p v-if="title" class="n-callout__title">{{ title }}</p>
    <div class="n-callout__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
/* A flat, lightly shaded block. No border and no coloured edge; the type only
   colours the title, so a warning still reads as one without shouting. */
.n-callout {
  margin: 24px 0;
  padding: 14px 18px;
  border-radius: var(--n-radius-sm);
  background: var(--n-aside-bg);
  font-size: var(--n-text-base);
}

.n-callout__title {
  margin: 0 0 4px;
  color: var(--n-text);
  font-size: var(--n-text-base);
  font-weight: 600;
}

.n-callout--tip .n-callout__title {
  color: var(--n-accent);
}

.n-callout--warning .n-callout__title {
  color: var(--n-warn);
}

.n-callout--danger .n-callout__title {
  color: var(--n-bad);
}

.n-callout__body :deep(> :first-child) {
  margin-top: 0;
}

.n-callout__body :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
