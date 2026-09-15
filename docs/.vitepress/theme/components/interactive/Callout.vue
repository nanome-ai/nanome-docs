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
.n-callout {
  margin: 24px 0;
  padding: 14px 18px;
  border: 1px solid var(--n-border);
  border-left-width: 3px;
  border-radius: var(--n-radius);
  background: var(--n-surface);
  font-size: var(--n-text-base);
}

.n-callout--note {
  border-left-color: var(--n-border-strong);
}

.n-callout--tip {
  border-left-color: var(--n-accent);
  background: var(--n-accent-soft);
}

.n-callout--warning {
  border-left-color: var(--n-warn);
  background: var(--n-warn-soft);
}

.n-callout--danger {
  border-left-color: var(--n-bad);
  background: var(--n-bad-soft);
}

.n-callout__title {
  margin: 0 0 4px;
  color: var(--n-text);
  font-size: var(--n-text-sm);
  font-weight: 700;
}

.n-callout__body :deep(> :first-child) {
  margin-top: 0;
}

.n-callout__body :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
