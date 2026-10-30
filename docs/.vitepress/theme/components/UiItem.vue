<script setup>
/**
 * One row of a <UiList>. With `icon`, the row starts with the icon button as
 * the app draws it; without one (a text button such as Load), the name is
 * drawn as the button. `href` makes the row a link to the section about it.
 *
 * Inside a <ShotRow>, `area` ("x,y,w,h", percent of the screenshot) is where
 * the button is: hovering the row lights it up on the image.
 */
import { computed, inject, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'
import { parseBox } from './image.js'

const props = defineProps({
  icon: { type: String, default: '' },
  name: { type: String, required: true },
  href: { type: String, default: '' },
  area: { type: String, default: '' },
})

const shot = inject('n-hotspots', null)
const box = parseBox(props.area)
const n = shot && box ? shot.register({ box, label: props.name, href: props.href }) : 0
if (n) onBeforeUnmount(() => shot.unregister(n))

const active = computed(() => n && shot.active.value === n)
const enter = () => n && shot.enter(n)
const leave = () => n && shot.leave(n)
</script>

<template>
  <li class="n-uiitem" :class="{ 'is-active': active, 'has-area': !!n }">
    <component
      :is="href ? 'a' : 'div'"
      class="n-uiitem__row"
      :href="href || undefined"
      @mouseenter="enter"
      @mouseleave="leave"
      @focusin="enter"
      @focusout="leave"
    >
      <span class="n-uiitem__mark">
        <AppIcon v-if="icon" :name="icon" button size="0.95rem" />
      </span>
      <span class="n-uiitem__text">
        <span class="n-uiitem__name" :class="{ 'is-textbutton': !icon }"><span v-if="n" class="n-uiitem__num">{{ n }}</span>{{ name }}</span>
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
  transition: background var(--n-transition), box-shadow var(--n-transition);
}

a.n-uiitem__row:hover,
.n-uiitem.has-area .n-uiitem__row:hover,
.n-uiitem.is-active .n-uiitem__row {
  background: var(--n-surface-hover);
}

.n-uiitem.is-active .n-uiitem__row {
  box-shadow: inset 0 0 0 1px var(--n-accent-border);
}

a.n-uiitem__row:hover :deep(.n-appicon),
.n-uiitem.is-active :deep(.n-appicon) {
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

/* The pin number, shown by <ShotRow> only where the image sits under the list. */
.n-uiitem__num {
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  background: var(--n-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
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
