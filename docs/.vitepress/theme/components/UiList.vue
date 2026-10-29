<script setup>
/**
 * A legend for the buttons in one part of the app: each <UiItem> row shows the
 * button's icon the way the app draws it, its name, and one line on what it
 * does, so a reader can match the row to what's on screen.
 *
 *   <UiList>
 *   <UiItem icon="eye" name="Hide All">Hides every entry.</UiItem>
 *   <UiItem name="Load">Opens the selected workspace.</UiItem>
 *   </UiList>
 */
defineProps({
  /** Names the list for screen readers, e.g. "Components toolbar". */
  label: { type: String, default: '' },
})
</script>

<template>
  <ul class="n-uilist" :aria-label="label || undefined">
    <slot />
  </ul>
</template>

<style scoped>
.n-uilist {
  display: grid;
  gap: 2px;
  margin: 16px 0 24px;
  padding: 6px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
  list-style: none;
}
</style>
