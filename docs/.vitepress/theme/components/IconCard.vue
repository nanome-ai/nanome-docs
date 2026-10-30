<script setup>
/**
 * One item in an <IconGrid>: the app's icon, the item's name and a short line
 * about it, all one link to the section (or page) that covers it.
 *
 * Inside a <ShotRow>, `area` ("x,y,w,h", percent of the screenshot) is where
 * the item is: hovering the card lights it up on the image.
 */
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { parseBox } from './image.js'

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  href: { type: String, required: true },
  area: { type: String, default: '' },
})

const shot = inject('n-hotspots', null)
const box = parseBox(props.area)
const card = ref(null)
const n = shot && box ? shot.register({ box, label: props.title, href: props.href, el: () => card.value }) : 0
if (n) onBeforeUnmount(() => shot.unregister(n))

const active = computed(() => n && shot.active.value === n)
const enter = () => n && shot.enter(n)
const leave = () => n && shot.leave(n)
</script>

<template>
  <a
    ref="card"
    class="n-iconcard"
    :class="{ 'is-active': active }"
    :href="href"
    @mouseenter="enter"
    @mouseleave="leave"
    @focus="enter"
    @blur="leave"
  >
    <AppIcon :name="icon" button size="1.05rem" />
    <span class="n-iconcard__text">
      <span class="n-iconcard__title">{{ title }}</span>
      <span class="n-iconcard__desc"><slot /></span>
    </span>
  </a>
</template>

<style scoped>
.n-iconcard {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
  color: var(--n-text) !important;
  text-decoration: none !important;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-iconcard:hover,
.n-iconcard.is-active {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}

.n-iconcard.is-active {
  box-shadow: 0 0 0 1px var(--n-accent);
}

.n-iconcard:hover :deep(.n-appicon),
.n-iconcard.is-active :deep(.n-appicon) {
  border-color: var(--n-accent-border);
  color: var(--n-accent);
}

.n-iconcard__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.n-iconcard__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.4;
}

.n-iconcard__desc {
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  line-height: 1.5;
}

/* A one-line description is enough here; drop paragraph margins from markdown. */
.n-iconcard__desc :deep(p) {
  margin: 0;
}
</style>
