<script setup>
/**
 * An app button named in running text, drawn as a small pill with its icon,
 * so a step like "choose <Btn icon="share">Share</Btn>" points at what's on
 * screen. It isn't clickable.
 */
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, default: '' },
})
</script>

<template>
  <span class="n-btn"><AppIcon v-if="icon" :name="icon" size="1em" /><slot /></span>
</template>

<style scoped>
.n-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.05em 0.6em;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  background: var(--n-surface-sunken);
  color: var(--n-text);
  font-size: 0.9em;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  max-width: 100%;
  vertical-align: 0.05em;
  /* Rows of pills wrap; this keeps the rows apart and off the next paragraph. */
  margin: 3px 0;
}

/* On a small phone a long label wraps inside its pill. */
@media (max-width: 420px) {
  .n-btn {
    white-space: normal;
  }
}

.n-btn :deep(.n-appicon) {
  vertical-align: 0;
}
</style>
