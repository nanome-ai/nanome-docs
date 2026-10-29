<script setup>
/**
 * One row of a <UiList>. With `icon`, the row starts with the icon button as
 * the app draws it; without one (a text button such as Load), the name is
 * drawn as the button. `href` makes the row a link to the section about it.
 */
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, default: '' },
  name: { type: String, required: true },
  href: { type: String, default: '' },
})
</script>

<template>
  <li class="n-uiitem">
    <component :is="href ? 'a' : 'div'" class="n-uiitem__row" :href="href || undefined">
      <span class="n-uiitem__mark">
        <AppIcon v-if="icon" :name="icon" button size="0.95rem" />
      </span>
      <span class="n-uiitem__text">
        <span class="n-uiitem__name" :class="{ 'is-textbutton': !icon }">{{ name }}</span>
        <span class="n-uiitem__desc"><slot /></span>
      </span>
    </component>
  </li>
</template>

<style scoped>
.n-uiitem {
  margin: 0 !important;
  padding: 0;
}

/* The row's icon is its marker, so drop the doc's list bullet. */
.n-uiitem::before {
  content: none !important;
}

.n-uiitem__row {
  display: grid;
  grid-template-columns: 2.1rem minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  padding: 8px 10px;
  border-radius: var(--n-radius);
  color: var(--n-text) !important;
  text-decoration: none !important;
}

a.n-uiitem__row:hover {
  background: var(--n-surface-hover);
}

a.n-uiitem__row:hover :deep(.n-appicon) {
  border-color: var(--n-accent-border);
  color: var(--n-accent);
}

.n-uiitem__mark {
  display: flex;
  justify-content: center;
  padding-top: 1px;
}

.n-uiitem__text {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 10px;
  row-gap: 2px;
  min-height: 1.9rem;
  padding-top: 0.3rem;
  line-height: 1.5;
}

.n-uiitem__name {
  font-size: 0.95rem;
  font-weight: 600;
}

/* Keep a name on one line where there's room; on a phone a long one wraps
   instead of pushing the page sideways. */
@media (min-width: 640px) {
  .n-uiitem__name {
    white-space: nowrap;
  }
}

/* A text button: drawn as the pill the app shows. */
.n-uiitem__name.is-textbutton {
  padding: 0 10px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  background: var(--n-surface-sunken);
  font-size: var(--n-text-sm);
}

.n-uiitem__desc {
  flex: 1 1 16rem;
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
}

.n-uiitem__desc :deep(p) {
  margin: 0;
}
</style>
