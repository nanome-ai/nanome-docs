<script setup>
/**
 * A legend for the buttons in one part of the app: each <UiItem> row shows the
 * button's icon the way the app draws it, its name, and one line on what it
 * does, so a reader can match the row to what's on screen. Names and
 * descriptions line up in two columns across the whole list; in a narrow
 * column the description goes under its name instead.
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
  <div class="n-uilist-hold">
    <ul class="n-uilist" :aria-label="label || undefined">
      <slot />
    </ul>
  </div>
</template>

<style>
.n-uilist-hold {
  container: uilist / inline-size;
  margin: 16px 0 24px;
}

.vp-doc .n-uilist,
.n-uilist {
  /* Icon, name, description. A long name wraps rather than squeeze the
     descriptions. */
  --uil-mark: 2.1rem;
  --uil-name: 38%;
  display: grid;
  grid-template-columns: var(--uil-mark) fit-content(var(--uil-name)) minmax(0, 1fr);
  column-gap: 12px;
  row-gap: 2px;
  margin: 0;
  padding: 6px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
  list-style: none;
}

/* Narrow: the description goes under its name. */
@container uilist (max-width: 22rem) {
  .vp-doc .n-uilist,
  .n-uilist {
    grid-template-columns: var(--uil-mark) minmax(0, 1fr);
  }
}
</style>
