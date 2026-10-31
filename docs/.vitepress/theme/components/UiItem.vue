<script setup>
/**
 * One row of a <UiList>. With `icon`, the row starts with the icon button as
 * the app draws it; without one (a text button such as Load), the name is
 * drawn as the button. `href` makes the row a link to the section about it.
 *
 * Inside a <ShotRow>, `area` ("x,y,w,h", percent of the screenshot) is where
 * the button is: hovering the row lights it up on the image, and clicking that
 * part of the image follows `href`, or brings the row into view.
 */
import { computed, inject, onBeforeUnmount, ref } from 'vue'
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
const row = ref(null)
const n = shot && box ? shot.register({ box, label: props.name, href: props.href, el: () => row.value }) : 0
if (n) onBeforeUnmount(() => shot.unregister(n))

const active = computed(() => n && shot.active.value === n)
const enter = () => n && shot.enter(n)
const leave = () => n && shot.leave(n)
</script>

<template>
  <li ref="row" class="n-uiitem" :class="{ 'is-active': active, 'has-area': !!n }">
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
        <span class="n-uiitem__name" :class="{ 'is-textbutton': !icon }">{{ name }}</span>
        <span class="n-uiitem__desc"><slot /></span>
      </span>
    </component>
  </li>
</template>

<style scoped>
.n-uiitem {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  margin: 0 !important;
  padding: 0;
}

/* The row's icon is its marker, so drop the doc's list bullet. */
.n-uiitem::before {
  content: none !important;
}

.n-uiitem__row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: baseline;
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
  align-self: start;
  justify-content: center;
}

/* The name and the description sit in the list's own columns. */
.n-uiitem__text {
  display: contents;
}

.n-uiitem__name {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Beside an icon the name is as tall as the icon button (0.95rem x 2), so the
   text sits level with the icon's middle. */
.n-uiitem__name:not(.is-textbutton) {
  min-height: 1.9rem;
}

/* A text button: drawn as the pill the app shows. A one-line name gets fully
   round ends, and a name that wraps becomes a box with rounded corners. */
.n-uiitem__name.is-textbutton {
  padding: 0 10px;
  border: 1px solid var(--n-border);
  border-radius: 0.8em;
  background: var(--n-surface-sunken);
  font-size: var(--n-text-sm);
  text-wrap: balance;
}

.n-uiitem__desc {
  min-width: 0;
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  /* A linked row is an <a>, and the doc's link weight would reach this. */
  font-weight: 400;
  line-height: 1.5;
}

/* In a narrow list the description takes the second column, under the name. */
@container uilist (max-width: 22rem) {
  .n-uiitem__desc {
    grid-column: 2;
  }
}

.n-uiitem__desc :deep(p) {
  margin: 0;
}
</style>
