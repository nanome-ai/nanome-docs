<script setup>
/**
 * One card of a <ScreenMap>: the app's icon, a name and one line, linking to
 * the page or section about it. `side` puts it on that side of the
 * screenshot, where the thing sits on screen; `area` ("x,y,w,h", percent of
 * the image) is the region it lights up. A card with no area (something not
 * in the screenshot) just links.
 */
import { computed, inject } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  href: { type: String, default: '' },
  side: { type: String, default: 'bottom' },
  area: { type: String, default: '' },
  /** Set by <ScreenMap>. */
  n: { type: Number, default: 0 },
})

const map = inject('n-screenmap', null)
const active = computed(() => map && props.area && map.active.value === props.n)

function enter() {
  if (map && props.area) map.enter(props.n)
}

function leave() {
  if (map && props.area) map.leave(props.n)
}
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="n-mapcard"
    :class="{ 'is-active': active, 'has-area': !!area }"
    :href="href || undefined"
    @mouseenter="enter"
    @mouseleave="leave"
    @focus="enter"
    @blur="leave"
  >
    <AppIcon :name="icon" button size="1rem" />
    <span class="n-mapcard__text">
      <span class="n-mapcard__title">{{ title }}</span>
      <span class="n-mapcard__desc"><slot /></span>
    </span>
  </component>
</template>

<style scoped>
.n-mapcard {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
  color: var(--n-text) !important;
  text-decoration: none !important;
  transition: border-color var(--n-transition), background var(--n-transition), box-shadow var(--n-transition);
}

a.n-mapcard:hover,
.n-mapcard.is-active {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}

.n-mapcard.is-active {
  box-shadow: 0 0 0 1px var(--n-accent);
}

a.n-mapcard:hover :deep(.n-appicon),
.n-mapcard.is-active :deep(.n-appicon) {
  border-color: var(--n-accent-border);
  color: var(--n-accent);
}

.n-mapcard__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.n-mapcard__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.35;
}

.n-mapcard__desc {
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  line-height: 1.45;
}

.n-mapcard__desc :deep(p) {
  margin: 0;
}
</style>
