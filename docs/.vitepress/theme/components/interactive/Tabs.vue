<script setup>
/**
 * Tabbed panels, for content that splits by vendor or platform rather than by
 * a sequence of questions.
 *
 *   <Tabs :labels="['ArborXR', 'ManageXR', 'Meta HMS']">
 *     <Tab>…</Tab><Tab>…</Tab><Tab>…</Tab>
 *   </Tabs>
 */
import { computed, provide, ref, useId } from 'vue'

const props = defineProps({
  labels: { type: Array, required: true },
  /** Small note under each label, same order as `labels`. */
  notes: { type: Array, default: () => [] },
})

const active = ref(0)

// Panels register in slot order; each gets its index and a flag it can watch.
let nextIndex = 0
provide('n-tabs', {
  register() {
    const index = nextIndex++
    return { index, isActive: computed(() => active.value === index) }
  },
})

// Unique per instance: a long guide page can hold more than one tab set.
const uid = useId()
const tabId = (i) => `${uid}-tab-${i}`
const panelId = (i) => `${uid}-panel-${i}`

const count = computed(() => props.labels.length)

/** Arrow keys move between tabs, as the tab pattern expects. */
function onKey(event) {
  const map = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' }
  const move = map[event.key]
  if (move === undefined) return

  event.preventDefault()
  if (move === 'first') active.value = 0
  else if (move === 'last') active.value = count.value - 1
  else active.value = (active.value + move + count.value) % count.value

  document.getElementById(tabId(active.value))?.focus()
}
</script>

<template>
  <div class="n-tabs">
    <div class="n-tabs__list" role="tablist" @keydown="onKey">
      <button
        v-for="(label, i) in labels"
        :id="tabId(i)"
        :key="label"
        type="button"
        role="tab"
        class="n-tabs__tab"
        :class="{ 'is-active': active === i }"
        :aria-selected="active === i ? 'true' : 'false'"
        :aria-controls="active === i ? panelId(i) : undefined"
        :tabindex="active === i ? 0 : -1"
        @click="active = i"
      >
        <span class="n-tabs__label">{{ label }}</span>
        <span v-if="notes[i]" class="n-tabs__note">{{ notes[i] }}</span>
      </button>
    </div>

    <div
      :id="panelId(active)"
      class="n-tabs__panel"
      role="tabpanel"
      :aria-labelledby="tabId(active)"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.n-tabs {
  margin: 28px 0;
}

.n-tabs__list {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  border-bottom: 1px solid var(--n-border);
  scrollbar-width: none;
}

.n-tabs__list::-webkit-scrollbar {
  display: none;
}

.n-tabs__tab {
  padding: 10px 14px;
  border: 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  background: none;
  color: var(--n-text-faint);
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: color var(--n-transition), border-color var(--n-transition);
}

/* On a phone the tabs share one row and their labels wrap. A tab only
   moves to a second row when a single word won't fit, so none hides past
   the edge. */
@media (max-width: 639px) {
  .n-tabs__list {
    flex-wrap: wrap;
  }

  /* A column, so labels of one and two lines all start at the top. */
  .n-tabs__tab {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    padding: 10px 8px;
    white-space: normal;
  }
}

.n-tabs__tab:hover {
  color: var(--n-text);
}

/* Inset, so the strip's scroll box doesn't clip the ring. */
.n-tabs__tab:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: -2px;
  border-radius: var(--n-radius-sm);
}

.n-tabs__tab.is-active {
  border-bottom-color: var(--n-accent);
  color: var(--n-text);
}

.n-tabs__label {
  display: block;
  font-size: var(--n-text-base);
  font-weight: 600;
}

.n-tabs__note {
  display: block;
  margin-top: 1px;
  font-size: var(--n-text-xs);
  font-weight: 400;
}

.n-tabs__panel {
  padding-top: 20px;
  font-size: var(--n-text-base);
}

.n-tabs__panel :deep(> :first-child) {
  margin-top: 0;
}

.n-tabs__panel :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
